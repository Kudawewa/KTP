"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import tyre_track_new from "../../public/tyer_track_new.svg";
const MotionImage = motion(Image);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function HVCO() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const pathname = usePathname();
  const sourcePage =
    !pathname || pathname === "/"
      ? "home"
      : pathname.split("/").pop() || "home";

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    if (submitting) return;

    setError(false);
    setSubmitting(true);
    try {
      // Saves the guide-download lead to the backend `leads` table.
      const res = await fetch(`${API_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_page: sourcePage,
          first_name: formData.name,
          email: formData.email,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setIsSubmitted(true);
      setFormData({ name: "", email: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .hvco {
          background: var(--navy);
          padding: 100px 60px;
          position: relative;
          overflow: hidden;
        }
        
        .hvco__inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .hvco .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 2px;
          padding: 6px 14px;
          font-size: 0.68rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 22px;
        }
        .hvco .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 1.8s infinite;
        }
        .hvco__headline {
          font-size: clamp(2.4rem, 3.8vw, 3.4rem);
          line-height: 1;
          color: var(--white);
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          font-weight: 700;
        }
        .hvco__headline em {
          font-style: normal;
          color: var(--gold);
        }
        .hvco__subhead {
          font-size: 0.98rem;
          color: rgba(249,247,244,0.6);
          font-weight: 400;
          line-height: 1.75;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .hvco__subhead strong {
          color: var(--white);
          font-weight: 600;
        }
        .hvco__inside {
          margin-bottom: 36px;
        }
        .inside__label {
          font-size: 0.65rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(249,247,244,0.35);
          margin-bottom: 14px;
          font-weight: 500;
        }
        .inside__items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .inside-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
          color: rgba(249,247,244,0.75);
          line-height: 1.5;
          font-weight: 400;
        }
        .inside-item svg {
          stroke: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .inside-item strong {
          color: var(--white);
          font-weight: 600;
        }
        .hvco__form {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 28px;
        }
        .form__title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 16px;
        }
        .form__row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
        }
        .form__input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          padding: 13px 16px;
          font-size: 0.88rem;
          color: var(--white);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .form__input::placeholder {
          color: white;
        }
        .form__input:focus {
          border-color: rgba(201,168,76,0.5);
          background: rgba(255,255,255,0.08);
        }
        .hvco .btn-download {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          background: var(--gold);
          color: var(--navy);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 15px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .hvco .btn-download:hover {
          background: #c9a84c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201,168,76,0.3);
        }
        .form__privacy {
          font-size: 0.68rem;
          color: rgba(249,247,244,0.25);
          text-align: center;
          margin-top: 10px;
          line-height: 1.5;
        }
        .hvco__right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .guide-mockup {
          width: 280px;
          position: relative;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
        }
        .guide-cover {
          background: linear-gradient(135deg, #0f2548, #0B1C3A);
          border-radius: 4px 12px 12px 4px;
          padding: 36px 28px;
          border-left: 6px solid var(--red);
          position: relative;
          overflow: hidden;
        }
        .cover__tag {
          display: inline-block;
          background: var(--red);
          color: white;
          font-size: 0.58rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 2px;
          margin-bottom: 18px;
        }
        .cover__title {
          font-size: 1.9rem;
          color: white;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .cover__title em {
          font-style: normal;
          color: var(--gold);
        }
        .cover__sub {
          font-size: 0.72rem;
          color: rgba(249,247,244,0.55);
          font-weight: 300;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .cover__divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 18px;
        }
        .cover__byline {
          font-size: 0.65rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
        }
        .cover__pages {
          font-size: 0.6rem;
          color: rgba(249,247,244,0.35);
          margin-top: 4px;
        }
        .guide-spine {
          position: absolute;
          left: -14px;
          top: 6px;
          bottom: 6px;
          width: 14px;
          background: linear-gradient(to right, #060e1e, #0B1C3A);
          border-radius: 2px 0 0 2px;
        }
        .guide-value {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 280px;
        }
        .value-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          padding: 10px 14px;
        }
        .value-pill__label {
          font-size: 0.78rem;
          color: rgba(249,247,244,0.6);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .value-pill__label svg {
          stroke: var(--gold);
        }
        .value-pill__price {
          font-size: 1rem;
          color: rgba(249,247,244,0.3);
          text-decoration: line-through;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .value-pill--free .value-pill__price {
          color: var(--gold);
          text-decoration: none;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 900px) {
          .hvco { padding: 64px 24px; }
          .hvco__inner { grid-template-columns: 1fr; gap: 48px; }
          .hvco__right { order: -1; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="hvco"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative circles animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: "absolute",
            right: "10px",
            bottom: "-80px",
            width: "440px",
            height: "440px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <MotionImage
            src={tyre_track_new} // Import your second SVG
            alt=""
            width={440}
            height={440}
            className="w-full h-full object-contain"
            style={{
              opacity: 1,
              filter: "brightness(0) invert(1)",
            }}
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={
              isInView
                ? { clipPath: "inset(0 0 0% 0)" }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="hvco__inner">
          {/* Left Column */}
          <div className="hvco__left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                gap: "8px",
                fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: "bold",
                marginBottom: "16px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              <span style={{ fontFamily: "var(--font-bebas)" }}>
                Free Download No catch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hvco__headline"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Not Ready To Book?
              <br />
              Grab Our{" "}
              <motion.em
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontStyle: "normal",
                  color: "var(--gold)",
                  whiteSpace: "nowrap",
                }}
              >
                Free Guide
              </motion.em>{" "}
              First.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hvco__subhead"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--white)",
                textAlign: "justify",
              }}
            >
              Before you spend a dollar on tyres, read this.{" "}
              <strong>The Perth Driver&rsquo;s Tyre Buying Guide</strong> cuts
              through the noise what to actually look for, which brands suit
              which budgets, and exactly how to avoid getting ripped off.
            </motion.p>

            <div className="hvco__inside">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.4, delay: 0.5 }}
                className="inside__label"
                style={{
                  fontFamily: "var(--font-bebas)",
                  color: "var(--gold)",
                }}
              >
                What&rsquo;s inside
              </motion.div>
              <div className="inside__items">
                {[
                  "The 5 questions to ask any tyre shop before you hand over your keys",
                  "Brand comparison guide Bridgestone vs Michelin vs Goodyear for Perth roads",
                  "Hidden fee decoder the 7 add ons shops slip in and when they&rsquo;re legitimate",
                  "When to replace vs repair the honest truth most shops won&rsquo;t tell you",
                  "Tyre life maximiser checklist get 30% more km from the tyres you already have",
                ].map((text, idx) => (
                  <motion.div
                    key={idx}
                    className="inside-item"
                    initial={{ opacity: 0, x: -15 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }
                    }
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.08 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      textAlign: "justify",
                      color: "var(--white)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="hvco__form"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.85 }}
                className="form__title"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Send me the free guide &rarr;
              </motion.div>
              <form onSubmit={handleSubmit}>
                <div className="form__row">
                  <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.9 }}
                    className="form__input placeholder-white"
                    type="text"
                    placeholder="First name"
                    style={{ fontFamily: "var(--font-inter)" }}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3, delay: 0.95 }}
                    className="form__input"
                    type="email"
                    placeholder="Email address"
                    style={{ fontFamily: "var(--font-inter)" }}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-download"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.4, delay: 1 }}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? (
                    "Sending…"
                  ) : isSubmitted ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Sent! Check your inbox
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Free Guide Instant Access
                    </>
                  )}
                </motion.button>
              </form>
              {error && (
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#fca5a5",
                    fontSize: "0.72rem",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Something went wrong. Please try again in a moment.
                </div>
              )}
              <div
                className="form__privacy"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--white)",
                }}
              >
                No spam. Unsubscribe any time. We hate junk mail as much as you
                do.
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="hvco__right">
            <motion.div
              className="guide-mockup"
              initial={{ opacity: 0, x: 30, rotate: -3 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, rotate: 0 }
                  : { opacity: 0, x: 30, rotate: -3 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              whileHover={{ y: -8, rotate: 1 }}
            >
              <div className="guide-spine"></div>
              <div className="guide-cover">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="cover__tag"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Free Guide
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="cover__title"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  The Perth Driver&rsquo;s
                  <br />
                  <em>Tyre Buying</em>
                  <br />
                  Guide
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="cover__sub"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--white)",
                  }}
                >
                  Everything you need to know before spending a dollar on tyres
                  written by the team at Kewdale Tyrepower.
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="cover__divider"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="cover__byline"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Kewdale Tyrepower
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 }}
                  className="cover__pages"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--white)",
                  }}
                >
                  24 pages &middot; Free instant download
                </motion.div>
              </div>
            </motion.div>

            <div className="guide-value">
              {[
                {
                  label: "Brand comparison guide",
                  price: "$29",
                  isFree: false,
                },
                { label: "Hidden fee decoder", price: "$19", isFree: false },
                {
                  label: "Tyre life maximiser checklist",
                  price: "$15",
                  isFree: false,
                },
                { label: "Total value", price: "FREE", isFree: true },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`value-pill ${item.isFree ? "value-pill--free" : ""}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.4, delay: 0.9 + idx * 0.08 }}
                  whileHover={
                    item.isFree
                      ? {
                          scale: 1.02,
                          backgroundColor: "rgba(255,255,255,0.08)",
                        }
                      : {}
                  }
                >
                  <div
                    className="value-pill__label"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--white)",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                    >
                      {item.isFree ? (
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      ) : (
                        <polyline points="20 6 9 17 4 12" />
                      )}
                    </svg>
                    {item.label}
                  </div>
                  <motion.div
                    className="value-pill__price"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      color: item.isFree ? "var(--gold)" : "var(--white)",
                    }}
                    initial={item.isFree ? { scale: 0.8 } : {}}
                    animate={isInView && item.isFree ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1.1, type: "spring" }}
                  >
                    {item.price}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
