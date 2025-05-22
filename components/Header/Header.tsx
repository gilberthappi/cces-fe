import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LuHouse, LuLogOut } from "react-icons/lu";
import { IoIosMail } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { MdApartment, MdOutlineContactSupport } from "react-icons/md";
import { FaBlog, FaUserTie } from "react-icons/fa6";
import { BsInfoSquareFill, BsUiChecksGrid } from "react-icons/bs";
import "@/styles/components.scss";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
    setMenuModal(!menuModal);
  };

  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setProfileDropdown(false);
      signOut({ callbackUrl: "/" });
  };

  const navItems = [
    { path: "/", label: "home", icon: <IoHome /> },
    { path: "/listing/properties", label: "properties", icon: <MdApartment /> },
    { path: "/agents", label: "agent", icon: <FaUserTie /> },
    { path: "/about-us", label: "about us", icon: <BsInfoSquareFill /> },
    { path: "/updates", label: "updates", icon: <FaBlog /> },
    { path: "/contact-us", label: "contact us", icon: <IoIosMail /> },
  ];

  return (
    <header className="header">
      <div className="top">
        <div className="container">
          <div className="content">
            <p>
              <span className="p">
                🥇 No 1, Real Estate company to Buy/Sell properties in Rwanda
              </span>
              <button 
                className="span" 
                onClick={() => router.push("/contact-us")}
                aria-label="Become our agent - free!"
              >
                Become our agent is free!
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <div className={`main ${isFixed ? "fixed" : ""}`} id="main-content">
        <div className="container">
          <div className="content">
            <div className="menu">
              <button
                className={`menu-btn ${isActive ? "active" : ""}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuModal}
                aria-controls="mobile-menu"
              >
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
              </button>
            </div>
            
            <div className="logo">
              <Link href="/" aria-label="Home">
                <Image 
                  alt="Company Logo" 
                  src="/cceslogo.png" 
                  width={150}
                  height={50}
                  priority
                />
              </Link>
            </div>
            
            <nav className="navlinks" aria-label="Main navigation">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`nav-link ${pathname === item.path ? "active" : ""}`}
                      aria-current={pathname === item.path ? "page" : undefined}
                    >
                      <span className="icon" aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="action">
              {data ? (
                <div className="profile-container">
                  <button 
                    className="profile" 
                    onClick={toggleProfileDropdown}
                    aria-label="User profile"
                    aria-expanded={profileDropdown}
                    aria-controls="profile-dropdown"
                  >
                    <span>{data?.user?.name?.charAt(0).toUpperCase()}</span>
                  </button>
                  
                  {profileDropdown && (
                    <ul className="profile-dropdown" id="profile-dropdown">
                      <li>
                        <Link 
                          href="/listing/properties" 
                          className="dropdown-link"
                          aria-current={pathname === "/listing/properties" ? "page" : undefined}
                        >
                          <LuHouse aria-hidden="true" /> Properties
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/contact-us" 
                          className="dropdown-link"
                          aria-current={pathname === "/contact-us" ? "page" : undefined}
                        >
                          <MdOutlineContactSupport aria-hidden="true" /> Contact
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/welcome" 
                          className="dropdown-link"
                          aria-current={pathname === "/welcome" ? "page" : undefined}
                        >
                          <BsUiChecksGrid aria-hidden="true" /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button 
                          onClick={handleLogout} 
                          className="dropdown-link"
                          aria-label="Logout"
                        >
                          <LuLogOut aria-hidden="true" /> Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth/signin" className="button a" aria-label="Sign up">
                    Sign Up
                  </Link>
                  <Link href="/auth/signin" className="btn a" aria-label="Sign in">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuModal && (
        <div className="menu-modal" id="mobile-menu">
          <div className="content">
            <nav className="nav" aria-label="Mobile navigation">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      href={item.path} 
                      className="modal-link" 
                      onClick={() => setMenuModal(false)}
                      aria-current={pathname === item.path ? "page" : undefined}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
