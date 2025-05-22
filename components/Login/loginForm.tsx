import TextBox from "@/components/ui/TextBox";
import { loginSchema, registerSchema, resetPasswordSchema } from "@/constants/login";
import type { TLoginSchema, TRegisterSchema, TResetPasswordSchema } from "@/services/auth";
import { forgot_password, registerUser, reset_password } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Alert from "../ui/Alert";
import { Button } from "../ui/button";
import {
	Form,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";


export const LoginForm = () => {
  const [formType, setFormType] = useState<
    "login" | "register" | "forgot" | "reset"
  >("login");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordConfirmRegister, setShowPasswordConfirmRegister] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false); 
  const { toast } = useToast();
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const queryClient = new QueryClient();
  const loginForm = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      photo: "",
     },
  });

  const resetForm = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema), 
    defaultValues: {
      otp: "",
      email: "",
      newPassword: "",
    },
  });

  const handleSignIn = async (formData: TLoginSchema) => {
    setLoading(true);
    setError(undefined);
    const response = await signIn("credentials", {
      ...formData,
      callbackUrl: "/auth/signin",
      redirect: false,
    });
    if (response?.error) {
      setError(response.error);
    }
    setLoading(false);
  };

      const handleRegister = useMutation({
          mutationFn: (data: FormData) => registerUser(data),
          onSuccess: () => {
              toast({
                  title: "You created account successfully",
                  variant: "primary",
              });
              queryClient.invalidateQueries({ queryKey: ["USER"] });
              setFormLoading(false);
              setFormType("login"); 
              router.push("/auth/signin");
          },
          onError: () => {
              toast({
                  title: "Failed to created account ",
                  variant: "destructive",
              });
              setFormLoading(false);
          },
      });
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    formData,
    ) => {
    setFormLoading(true);
    setError(undefined);
    if (formData.password !== formData.confirmPassword) {
      registerForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      setFormLoading(true);
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    if (formData.photo && formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }
    handleRegister.mutate(formDataToSend);
  };

  const handleForgotPassword = async ({ email }: { email: string }) => {
    setLoading(true);
    setError(undefined);
    try {
      await forgot_password({ email });
      setFormType("reset");
    } catch (err) {
      setError("Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: TResetPasswordSchema) => {
    setLoading(true);
    setError(undefined);
    try {
      await reset_password(data);
      setFormType("login"); 
    } catch (err) {
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5  justify-center">
      <div>
      <h2 className='my-6 text-2xl font-bold text-center tracking-tight text-gray-900'>
        {formType === "login"
          ? "Login"
          : formType === "forgot"
          ? "Forgot Password"
          : formType === "register"
          ? "Create Account"
          : "Reset Password"}
      </h2>
      <p className='mt-2 text-sm text-center text-gray-400 max-w'>
        {formType === "register" ? (
          <>
            Enter your details below to create an account
            <span> or <button className="text-gray-700 hover:underline inline" onClick={() => setFormType("login")}>login</button></span>
          </>
        ) : formType === "forgot" ? (
          <>
            Enter your email address to request a password reset
            <span> or <button className="text-gray-700 hover:underline inline" onClick={() => setFormType("login")}>login</button></span>
          </>
        ) : formType === "reset" ? (
          <>
            Enter your OTP, email, and new password to reset your password
            <span> or <button className="text-gray-700 hover:underline inline" onClick={() => setFormType("login")}>login</button></span>
          </>
        ) : (
          <>
            Enter your email address and password below to login
            {/* <span> or <button className="text-gray-700 hover:underline inline" onClick={() => setFormType("register")}>create an account</button></span> */}
          </>
        )}
      </p>
          </div>
      {formType === "login" && (
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleSignIn)}
            className="space-y-2 w-full"
          >
            {error && <Alert>{error}</Alert>}
            <TextBox
              label="Email"
              type="text"
              name="email"
              placeholder="Email"
              control={loginForm.control}
            />
            <div className="relative">
              <TextBox
                label="Password"
                type={showPasswordLogin ? "text" : "password"}
                name="password"
                placeholder="Password"
                control={loginForm.control}
              />
              <button
                type="button"
                onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-10"
              >
                {showPasswordLogin ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                disabled={
                  !!(
                    loginForm.formState.errors.email ||
                    loginForm.formState.errors.password
                  ) || loading
                }
                type="submit"
              >
                {!loading ? "Login" : "Loading ..."}
              </Button>
              <button
                type="button"
                className="text-sm text-gray-400 hover:underline"
                onClick={() => setFormType("forgot")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </Form>
      )}

      {formType === "register" && (
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            {error && <Alert>{error}</Alert>}
            <TextBox
              label="FirstName"
              type="text"
              name="firstName"
              placeholder="John"
              control={registerForm.control}
            />
            <TextBox
              label="LastName"
              type="text"
              name="lastName"
              placeholder="Peter"
              control={registerForm.control}
            />
            <TextBox
              label="Email"
              type="text"
              name="email"
              placeholder="example@gmail.com"
              control={registerForm.control}
            />
            <div className="relative">
              <TextBox
                label="Password"
                type={showPasswordRegister ? "text" : "password"}
                name="password"
                placeholder="**********"
                control={registerForm.control}
              />
              <button
                type="button"
                onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-10"
              >
                {showPasswordRegister ? <FaEye /> : <FaEyeSlash />}
              </button>
              </div>
              <div className="relative">
              <TextBox
                label="Confirm Password"
                type={showPasswordConfirmRegister ? "text" : "password"}
                name="confirmPassword"
                placeholder="***********"
                control={registerForm.control}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmRegister(!showPasswordConfirmRegister)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-10"
              >
                {showPasswordConfirmRegister ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
              <TextBox
              label="Upload Profile image"
              type="file"
              name="photo"
              placeholder="example@gmail.com"
              control={registerForm.control}
            />
            <div className="flex justify-between mt-4">
              <Button
                disabled={
                  !!(
                    registerForm.formState.errors.email ||
                    registerForm.formState.errors.password
                  ) || formLoading
                }
                type="submit"
              >
                {!formLoading? "Register" : "Creating account ..."}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {formType === "forgot" && (
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(({ email }) =>
              handleForgotPassword({ email })
            )}
            className="space-y-2 w-full"
          >
            {error && <Alert>{error}</Alert>}
            <TextBox
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
              control={loginForm.control}
            />
            <div className="flex justify-between mt-4">
              <Button
                disabled={!!loginForm.formState.errors.email || loading}
                type="submit"
              >
                {!loading ? "Request Reset" : "Loading ..."}
              </Button>
              <div className="mt-4 text-end">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:underline"
                  onClick={() => setFormType("login")}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </form>
        </Form>
      )}

      {formType === "reset" && (
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(handleResetPassword)}
            className="space-y-2 w-full"
          >
            {error && <Alert>{error}</Alert>}
            <TextBox
              label="OTP"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              control={resetForm.control}
            />
            <TextBox
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email"
              control={resetForm.control}
            />
            <div className="relative">
              <TextBox
                label="New Password"
                type={showPasswordReset ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                control={resetForm.control}
              />
              <button
                type="button"
                onClick={() => setShowPasswordReset(!showPasswordReset)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-10"
              >
                {showPasswordReset ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                disabled={
                  !!(
                    resetForm.formState.errors.otp ||
                    resetForm.formState.errors.email ||
                    resetForm.formState.errors.newPassword
                  ) || loading
                }
                type="submit"
              >
                {!loading ? "Reset Password" : "Loading ..."}
              </Button>
              <div className="mt-4 text-end">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:underline"
                  onClick={() => setFormType("login")}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
