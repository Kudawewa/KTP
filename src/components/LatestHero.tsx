"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import heroBg1 from "../../public/hero_section_1.webp";
import heroBg2 from "../../public/hero_section_2.webp";
import heroBg3 from "../../public/hero_section_3.webp";
import heroBg4 from "../../public/hero_section_4.webp";
import heroBg5 from "../../public/hero_section_5.webp";
import heroBg6 from "../../public/hero_section_6.webp";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function LatestHero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showReviews] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextImageIndex, setNextImageIndex] = useState<number | null>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5, heroBg6];

  useEffect(() => {
    let mounted = true;
    const loadPromises = heroImages.map(
      (img) =>
        new Promise((resolve) => {
          const el = new window.Image();
          el.src = img.src;
          el.onload = () => resolve(true);
          el.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            resolve(false);
          };
        }),
    );
    Promise.all(loadPromises).then(() => {
      if (mounted) setImagesLoaded(true);
    });
    return () => {
      mounted = false;
    };
  }, [heroImages]);

  const changeSlide = useCallback(
    (newDirection: number, targetIndex?: number) => {
      if (isAnimating) return;
      const newIndex =
        targetIndex !== undefined
          ? targetIndex
          : (currentImageIndex + newDirection + heroImages.length) %
            heroImages.length;
      if (newIndex === currentImageIndex) return;
      setDirection(newDirection);
      setNextImageIndex(newIndex);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex(newIndex);
        setNextImageIndex(null);
        setIsAnimating(false);
      }, 2000);
    },
    [currentImageIndex, heroImages.length, isAnimating],
  );

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => changeSlide(1), 10000);
    return () => clearInterval(interval);
  }, [imagesLoaded, changeSlide]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = useCallback((targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80; // Added offset for header ok
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      else if (e.key === "ArrowRight") changeSlide(1);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [changeSlide]);

  const navLinks = [
    { href: "service", label: "Services" },
    { href: "testimonials", label: "Reviews" },
    { href: "offer", label: "Offer" },
    { href: "faq", label: "FAQs" },
    { href: "abouthUs", label: "Contact" },
    { href: "guarantee", label: "Guarantee" },
    { href: "problems", label: "Problem" },
    { href: "solution", label: "Solutions" },
  ];

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1C3A]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      {/* Main Container */}
      <div className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        {/* Left Red Accent */}
        <div
          className="absolute hidden md:block"
          style={{
            left: 0,
            top: "12%",
            bottom: "12%",
            width: "4px",
            background: "var(--red)",
            borderRadius: "0 2px 2px 0",
            zIndex: 20,
          }}
        />

        {/* Scroll Indicator */}
        <div
          className={`fixed z-30 flex-col items-center hidden md:flex cursor-pointer transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            right: "clamp(20px, 3vw, 48px)",
            bottom: "150px",
            gap: "8px",
          }}
          onClick={() => smoothScrollTo("proof")}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "0.6rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--white)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
        </div>

        {/* Background Image Layer — CSS keyframe slide */}
        <div className="hero-slider-container">
          <div
            className={`hero-slide${isAnimating ? (direction > 0 ? " slide-exit-left" : " slide-exit-right") : " slide-active"}`}
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {nextImageIndex !== null && (
            <div
              className={`hero-slide${direction > 0 ? " slide-enter-right" : " slide-enter-left"}`}
              style={{
                backgroundImage: `url(${heroImages[nextImageIndex].src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => changeSlide(-1)}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 hover:bg-black/50 hover:scale-110 focus:outline-none disabled:opacity-40"
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => changeSlide(1)}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 hover:bg-black/50 hover:scale-110 focus:outline-none disabled:opacity-40"
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Slide Indicators */}
        {/* <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                changeSlide(index > currentImageIndex ? 1 : -1, index)
              }
              disabled={isAnimating || index === currentImageIndex}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              } disabled:cursor-default`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}

        {/* Dark Gradient Overlay - Heavier on Left (text area), Lighter on Right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,28,58,0.92) 0%, rgba(11,28,58,0.75) 40%, rgba(11,28,58,0.4) 70%, rgba(11,28,58,0.2) 100%)",
            zIndex: 1,
          }}
        />

        {/* Additional subtle gradient from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,28,58,0.6) 0%, transparent 50%)",
            zIndex: 1,
          }}
        />

        <div>
          {/* Top Section */}
          <div className="relative z-10">
            {/* Header */}
            <div
              className="transform w-full"
              style={{
                padding: "4px 24px",
                paddingTop: "clamp(4px, 3vw, 10px)",
                paddingBottom: "clamp(4px, 3vw, 10px)",
                paddingRight: "clamp(24px, 6vw, 60px)",
                paddingLeft: "clamp(24px, 6vw, 60px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(11,28,58,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <Image
                      src={logo}
                      alt="Tyrepower Logo"
                      width={180}
                      height={45}
                      className="fit-content"
                      priority
                    />
                  </div>

                  {/* Desktop Menu - Hidden on mobile */}
                  <div
                    className="hidden lg:flex items-center"
                    style={{ gap: "20px" }}
                  >
                    {navLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                        style={{
                          gap: "6px",
                          color: "var(--white)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.5px",
                          fontFamily: "var(--font-inter)",
                          transition: "opacity 0.2s ease",
                        }}
                        onClick={() => smoothScrollTo(link.href)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.7")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        role="button"
                        tabIndex={0}
                        aria-label={`Navigate to ${link.label}`}
                      >
                        {link.label}
                      </div>
                    ))}

                    {/* Same-day service — ghost button */}
                    <div
                      onClick={() => {
                        smoothScrollTo("urgency");
                      }}
                      className="flex items-center cursor-pointer"
                      style={{
                        gap: "6px",
                        color: "var(--white)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.4px",
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "6px",
                        padding: "7px 14px",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(4px)",
                        whiteSpace: "nowrap",
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Same day service"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Same day service
                    </div>

                    {/* Phone — solid red button */}
                    <a
                      href="tel:0893591444"
                      className="flex items-center"
                      style={{
                        gap: "6px",
                        color: "#fff",
                        fontSize: "0.72rem",
                        letterSpacing: "0.4px",
                        fontFamily: "var(--font-geist-mono)",
                        fontWeight: 700,
                        border: "none",
                        borderRadius: "6px",
                        padding: "7px 14px",
                        background: "var(--red, #d4000f)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.88")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      aria-label="Call Tyrepower at 08 9359 1444"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
                      </svg>
                      (08) 9359 1444
                    </a>
                  </div>

                  {/* Tablet Menu */}
                  <div
                    className="hidden md:flex lg:hidden items-center"
                    style={{ gap: "16px" }}
                  >
                    {/* Same-day service — ghost button (tablet) */}
                    <div
                      className="flex items-center"
                      style={{
                        gap: "6px",
                        color: "var(--white)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.4px",
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        background: "rgba(255,255,255,0.06)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Same day
                    </div>

                    {/* Phone — solid red button (tablet) */}
                    <a
                      href="tel:0893591444"
                      className="flex items-center"
                      style={{
                        gap: "6px",
                        color: "#fff",
                        fontSize: "0.7rem",
                        letterSpacing: "0.4px",
                        fontFamily: "var(--font-geist-mono)",
                        fontWeight: 700,
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        background: "var(--red, #d4000f)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.88")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
                      </svg>
                      Call
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                      className="md:flex text-white"
                      onClick={() => {
                        const mobileMenu =
                          document.getElementById("mobile-menu");
                        if (mobileMenu) {
                          mobileMenu.classList.toggle("hidden");
                        }
                      }}
                      aria-label="Menu"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    className="md:hidden text-white"
                    onClick={() => {
                      const mobileMenu = document.getElementById("mobile-menu");
                      if (mobileMenu) {
                        mobileMenu.classList.toggle("hidden");
                      }
                    }}
                    aria-label="Menu"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              className="hidden fixed top-0 left-0 w-full h-screen z-50 bg-[#0B1C3A]"
              style={{
                padding: "20px",
                background: "rgba(11,28,58,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="p-6">
                <button
                  className="absolute top-4 right-6 text-white text-3xl cursor-pointer hover:text-red-500"
                  onClick={() => {
                    document
                      .getElementById("mobile-menu")
                      ?.classList.add("hidden");
                  }}
                  aria-label="Close menu"
                >
                  ×
                </button>

                <div
                  className="flex flex-col gap-6"
                  style={{ marginTop: "45px" }}
                >
                  {navLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center cursor-pointer"
                      style={{
                        gap: "6px",
                        color: "var(--white)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.5px",
                        fontFamily: "var(--font-inter)",
                        transition: "opacity 0.2s ease",
                      }}
                      onClick={() => {
                        smoothScrollTo(link.href);
                        document
                          .getElementById("mobile-menu")
                          ?.classList.add("hidden");
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {link.label}
                    </div>
                  ))}
                  <div
                    className="border-t border-white/10"
                    style={{ paddingTop: "35px" }}
                  >
                    <div
                      className="flex items-center gap-3 text-white text-sm mb-4 cursor-pointer"
                      onClick={() => {
                        smoothScrollTo("urgency");
                        document
                          .getElementById("mobile-menu")
                          ?.classList.add("hidden");
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Same day service available
                    </div>

                    <a
                      href="tel:0893591444"
                      className="flex items-center gap-3 text-white text-sm mb-6"
                      style={{ marginTop: "30px", textDecoration: "none" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
                      </svg>
                      (08) 9359 1444
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div
              style={{
                maxWidth: "1500px",
                margin: "0 auto",
              }}
            >
              <div className="min-h-[calc(100vh-200px)] flex">
                <div
                  className="w-full mx-auto"
                  style={{
                    paddingLeft: "clamp(24px, 6vw, 60px)",
                    paddingRight: "clamp(24px, 6vw, 60px)",
                    paddingTop: "clamp(30px, 5vh, 50px)",
                    paddingBottom: "clamp(30px, 5vh, 50px)",
                  }}
                >
                  <div>
                    <div>
                      <div className="md:w-[70%]">
                        {/* Trust Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="inline-flex items-center"
                          style={{
                            gap: "8px",
                            background: "rgba(255, 255, 255, 0.12)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            borderRadius: "40px",
                            padding:
                              "clamp(10px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                            marginBottom: "clamp(20px, 3vh, 28px)",
                            fontFamily: "var(--font-bebas)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <div
                            style={{
                              width: "clamp(6px, 1vw, 8px)",
                              height: "clamp(6px, 1vw, 8px)",
                              borderRadius: "50%",
                              background: "white",
                              animation:
                                "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "clamp(0.6rem, 2.5vw, 0.7rem)",
                              letterSpacing: "clamp(2px, 1vw, 3px)",
                              color: "white",
                            }}
                          >
                            {/* Perth&apos;s Trusted Tyre Specialists Since 1998 */}
                            Tyrepower WA’s Dealer of the Year 2025    
                          </span>
                        </motion.div>

                        <div>
                          {/* Main Heading */}
                          <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{
                              fontFamily: "var(--font-geist-sans)",
                              fontSize: "clamp(3rem, 7vw, 5rem)",
                              lineHeight: "1",
                              color: "var(--white)",
                              letterSpacing: "-0.02em",
                              marginBottom: "clamp(16px, 2.5vh, 24px)",
                              fontWeight: 700,
                              position: "relative",
                              zIndex: 20,
                              width: "fit-content",
                              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            }}
                          >
                            Back on the road
                            <em
                              style={{
                                fontStyle: "normal",
                                color: "var(--red)",
                                display: "block",
                                marginTop: "clamp(8px, 1.5vh, 12px)",
                                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                              }}
                            >
                              WITHIN 90 MINS<br/>
                            </em>
                            <span
                              style={{
                                display: "block",
                                position:"relative",
                                top: "-4px",
                                fontFamily: "var(--font-inter)",
                                fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                                color: "var(--white)",
                                fontWeight: 400,
                                fontStyle: "italic",
                                lineHeight: "1.4",
                                marginTop: "clamp(4px, 0.8vh, 8px)",
                                letterSpacing: "0.02em",
                                textAlign:"right",
                              }}
                            >
                              (Subject to availability)
                            </span>
                          </motion.h1>
                        </div>
                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                            color: "var(--white)",
                            fontWeight: 300,
                            lineHeight: "1.5",
                            marginBottom: "clamp(15px, 2.5vw, 20px)",
                            maxWidth: "80%",
                            textAlign: "justify",
                            paddingRight: "clamp(0px, 2vw, 20px)",
                            textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                          }}
                        >
                          Perth professionals don&rsquo;t have time to waste.{" "}
                          <strong
                            style={{ color: "var(--white)", fontWeight: 500 }}
                          >
                            Fast, transparent, done right first time
                          </strong>{" "}
                          tyre service with upfront pricing and zero upsells.
                          Serving Kewdale, Belmont,Forrestfield, Welshpool, High Wycombe, Maida Vale, Kalamunda and Lesmurdie &amp; surrounding suburbs.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="flex flex-col sm:flex-row gap-4 sm:gap-5"
                          style={{ marginBottom: "clamp(32px, 5vh, 40px)" }}
                        >
                          {/* Call Now — solid sectionColor */}
                          <motion.a
                            href="tel:0893591444"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              minWidth: "300px",
                              padding: "15px 32px",
                              background: "var(--red)",
                              border: "1px solid rgba(0,0,0,0.15)",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                              transition:
                                "opacity 0.2s ease, transform 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.opacity = "0.88")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.opacity = "1")
                            }
                          >
                            <motion.svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2"
                              style={{ flexShrink: 0 }}
                              animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                              }}
                            >
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
                            </motion.svg>
                            <span
                              style={{
                                fontFamily: "var(--font-geist-mono)",
                                fontSize: "clamp(0.85rem, 2vw, 0.98rem)",
                                letterSpacing: "0.5px",
                                fontWeight: 700,
                                color: "#fff",
                              }}
                            >
                              Call Now
                            </span>
                          </motion.a>

                          {/* Book Now — frosted glass */}
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => smoothScrollTo("service")}
                            style={{
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              minWidth: "300px",
                              padding: "15px 32px",
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.22)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              transition:
                                "background 0.2s ease, border-color 0.2s ease",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.15)";
                              e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.08)";
                              e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.22)";
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="Book appointment"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2.5"
                              style={{ flexShrink: 0 }}
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                              <circle cx="12" cy="15" r="1" />
                              <circle cx="16" cy="15" r="1" />
                              <circle cx="8" cy="15" r="1" />
                            </svg>
                            <span
                              style={{
                                fontFamily: "var(--font-geist-mono)",
                                fontSize: "clamp(0.85rem, 2vw, 0.98rem)",
                                letterSpacing: "0.5px",
                                fontWeight: 700,
                                color: "#fff",
                              }}
                            >
                              Book Now
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>
                      {/* Reviews Section */}
                      {(showReviews || scrollY > 50) && (
                        <div ref={reviewsRef}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
                            style={{
                              paddingTop: "clamp(24px, 4vh, 28px)",
                              borderTop: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-center text-center sm:text-left">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    viewBox="0 0 24 24"
                                    fill="#FBBC05"
                                    style={{
                                      width: "clamp(12px, 1.8vw, 16px)",
                                      height: "clamp(12px, 1.8vw, 16px)",
                                    }}
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                              <div
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                                  color: "var(--white)",
                                  lineHeight: "1.4",
                                }}
                              >
                                <strong
                                  style={{
                                    color: "var(--white)",
                                    fontWeight: 500,
                                    fontFamily: "var(--font-geist-sans)",
                                  }}
                                >
                                  4.7 / 5 &nbsp; 300+ Google Reviews
                                </strong>
                                <span className="hidden sm:inline text-xs">
                                  &nbsp;&ldquo;Fixed in under an 90 Mins&rdquo;
                                </span>
                                <p className="text-xs" style={{textAlign:"right"}}>(Subject to availability)</p>
                              </div>
                            </div>

                            <div
                              className="hidden md:block"
                              style={{
                                width: "1px",
                                height: "30px",
                                background: "rgba(255,255,255,0.15)",
                              }}
                            />

                            <div className="w-full sm:w-auto text-center sm:text-left">
                              <div
                                style={{
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                                  color: "var(--white)",
                                  lineHeight: "1.4",
                                }}
                              >
                                <strong
                                  style={{
                                    color: "var(--white)",
                                    fontWeight: 500,
                                    fontFamily: "var(--font-geist-sans)",
                                  }}
                                >
                                  200+ Perth professionals served
                                </strong>
                                <span className="hidden sm:inline">
                                  &nbsp;Kewdale&apos;s highest rated
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Stats Bar */}
        <div
          className="w-full relative z-10"
          style={{
            padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 32px)",
            background: "rgba(11,28,58,0.6)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: "1500px", margin: "0 auto" }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { number: "90", unit: "min", label: "AVERAGE SERVICE TIME" },
                { number: "300", unit: "+", label: "5 STAR GOOGLE REVIEWS" },
                { number: "25", unit: "+", label: "YEARS SERVING PERTH" },
                { number: "0", unit: "%", label: "HIDDEN FEES, EVER" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left
                   ${i % 2 === 0 && i !== 3 ? "sm:border-r sm:border-white/10" : ""}
                  lg:border-b-0
                  ${i < 3 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"}
                  `}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(1.3rem, 4vw, 2rem)",
                      letterSpacing: "1px",
                      color: "var(--white)",
                      lineHeight: 1,
                      marginBottom: "2px",
                    }}
                  >
                    {stat.number}
                    <span style={{ color: "var(--red)" }}>{stat.unit} {(stat.number==="90") && <span style={{fontSize: "clamp(0.44rem, 2.2vw, 0.7rem)",color:"white"}}>(Subject to availability)</span>}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                      letterSpacing: "1px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "var(--white)",
                      lineHeight: "1.2",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Slider */
        .hero-slider-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .hero-slide.slide-active {
          z-index: 1;
        }
        .hero-slide.slide-exit-left {
          z-index: 2;
          animation: slideOutLeft 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }
        .hero-slide.slide-exit-right {
          z-index: 2;
          animation: slideOutRight 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }
        .hero-slide.slide-enter-right {
          z-index: 3;
          animation: slideInRight 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }
        .hero-slide.slide-enter-left {
          z-index: 3;
          animation: slideInLeft 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
