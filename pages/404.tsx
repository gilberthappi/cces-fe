"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Add a cool effect to the document title
    const timer = setInterval(() => {
      document.title = document.title === "404 | Lost in Space" 
        ? "404 | Page Not Found" 
        : "404 | Lost in Space";
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-auto flex flex-col items-center justify-center p-4 text-center">
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full bg-gray-900/70 backdrop-blur-md rounded-xl p-8 md:p-12 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
      >
        {/* Animated 404 text */}
        <motion.div 
          className="mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            404
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Houston, we have a problem!
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          The page you re looking for seems to have drifted off into the cosmic void.
          Maybe its on a coffee break somewhere in the universe?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            ← Go Back
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Beam Me Home
          </motion.button>
        </div>

        {/* Fun little alien animation */}
        <motion.div
          className="mt-12"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400 mx-auto"
          >
            <path d="M12 3a5 5 0 1 0 5 5"></path>
            <path d="M12 8a3 3 0 1 0-3-3"></path>
            <path d="M5 9a5 5 0 0 0 5 5"></path>
            <path d="M14 9a5 5 0 0 1-5 5"></path>
            <path d="M12 19v-3"></path>
          </svg>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="mt-8 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Need help? Contact our <span className="text-purple-300 cursor-pointer hover:underline">support team</span>
      </motion.div>
    </div>
  );
};

export default ErrorPage;