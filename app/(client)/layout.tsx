"use client";

import React, { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/footer/Footer";
// import Message from "@/components/Message";

const LandingPage = ({ children }: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHomeInView, setIsHomeInView] = useState(false);
  // const pathname = usePathname();

  useEffect(() => {
    const homeSection = document.getElementById("home");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHomeInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      isHomeInView ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isHomeInView]);

  return (
    <div className="relative w-full h-screen font-sans">
      {/* Header */}
      {/* <Header /> */}

      {/* Dynamic Content */}
      <section>{children}</section>
      {/* <Message /> */}
      {/* Footer (Only show on specific pages if needed) */}
      {/* {pathname !== "/contact-us" && (
        <section id="contact">
          <Footer />
        </section>
      )} */}
    </div>
  );
};

export default LandingPage;
