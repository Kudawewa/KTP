"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "@/modal/BookingModal";

interface FAQItemData {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategoryData {
  title: string;
  items: FAQItemData[];
}

const faqData: FAQCategoryData[] = [
  {
    title: "Pricing & Quotes",
    items: [
      {
        question: "Do I need to pay anything to get a quote?",
        answer: (
          <>
            No.{" "}
            <strong>
              Quotes are completely free and there&rsquo;s no obligation to
              proceed.
            </strong>{" "}
            Call us, come in, or fill out the form above we&rsquo;ll give you a
            full price. We won&rsquo;t follow you up 14 times
            either.
          </>
        ),
      },
      {
        question: "Will the price change between quote and payment?",
        answer: (
          <>
            <strong>No — that&rsquo;s our Price Lock Guarantee.</strong> The
            figure we quote is the figure you pay. The only exception is if you
            ask us to do additional work once we&rsquo;ve started. We&rsquo;ll
            always get your approval before doing anything extra, and
            we&rsquo;ll never surprise you at the counter.
          </>
        ),
      },
      {
        question: "Are balancing, disposal and valve replacement included?",
        answer: (
          <>
            Yes.{" "}
            <strong>
              Wheel balancing, tyre disposal, and new valve stems are all
              included
            </strong>{" "}
            in our fitment price no add ons at the counter. What we quote
            includes everything needed to get your car back on the road
            properly.
          </>
        ),
      },
    ],
  },
  {
    title: "Wait Times & Bookings",
    items: [
      {
        question: "How long will my car actually be with you?",
        answer: (
          <>
            <strong>Most standard fitments take 90 minutes or less.</strong>{" "}
            When you book, we&rsquo;ll give you a realistic time based on what
            you need and how busy we are. We don&rsquo;t say &ldquo;about an
            hour&rdquo; and mean three; we tell you what to expect and we stick
            to it.
          </>
        ),
      },
      {
        question: "Can I get a same day appointment?",
        answer: (
          <>
            Usually yes.{" "}
            <strong>We keep same day slots available for urgent jobs:</strong>
             flat tyres, blowouts, or if you just need it sorted today. Call us
            first thing in the morning for the best chance of a same day spot.
          </>
        ),
      },
      {
        question: "Can I drop off my car and come back later?",
        answer: (
          <>
            Absolutely.{" "}
            <strong>
              Drop the keys, tell us when you want it back, and we&rsquo;ll have
              it ready.
            </strong>{" "}
            We&rsquo;ll call you if anything unexpected comes up we won&rsquo;t
            just do extra work without asking. We know you have better things to
            do than sit in a waiting room.
          </>
        ),
      },
    ],
  },
  {
    title: "Tyres & Advice",
    items: [
      {
        question: "How do I know which tyre is right for my car?",
        answer: (
          <>
            Tell us your car&rsquo;s make, model and year and we&rsquo;ll do the
            rest.{" "}
            <strong>
              We&rsquo;ll recommend a tyre that suits how you drive and what you
              want to spend
            </strong>{" "}
            we won&rsquo;t just push the most expensive option. If you want to
            compare brands, we&rsquo;re happy to walk you through the
            differences.
          </>
        ),
      },
      {
        question: "Do I need to replace all four tyres at once?",
        answer: (
          <>
            Not necessarily.{" "}
            <strong>
              We&rsquo;ll check all four and only recommend replacing what
              actually needs replacing.
            </strong>{" "}
            If two are fine, we&rsquo;ll tell you. We&rsquo;d rather keep you as
            a long term customer who trusts us than make an extra $200 on tyres
            you don&rsquo;t need today.
          </>
        ),
      },
      {
        question: "Can you repair my tyre instead of replacing it?",
        answer: (
          <>
            <strong>
              If the tyre is repairable, we&rsquo;ll repair it from $35.
            </strong>{" "}
            We won&rsquo;t tell you a tyre needs replacing when it
            doesn&rsquo;t. We assess every puncture honestly: if it&rsquo;s in
            the repairable zone and the tyre still has life, a proper internal
            repair is the right call and we&rsquo;ll say so.
          </>
        ),
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string>("0-0");
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = (key: string) => {
    setOpenItem((prev) => (prev === key ? "" : key));
  };

  return (
    <section
      id="faq"
      style={{
        background: "var(--page-bg)",
      }}
      className="faq"
    >
      <div className="faq__inner">
        {/* Left Column */}
        <div className="faq__left">
          <div>
            {/* <div className="eyebrow-line"></div> */}
            <span
               style={{
                gap: "8px",
                fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                 color: "var(--red)",
                fontWeight: "bold",
                marginBottom: "16px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              Got questions?
            </span>
          </div>

          <h2
            className="faq__headline font-bold"
            style={{ fontFamily: "var(--font-geist-sans)",color: "var(--navy)",}}
          >
            We&rsquo;ve Got
            <br />
            <em
              style={{
                fontStyle: "normal",
                color: "var(--red)",
                display: "inline-block",
              }}
            >
              Straight
            </em>
            <br />
            Answers.
          </h2>

          <p
            className="faq__subhead"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--text-dark)",
            }}
          >
            No waffle. The questions we get asked most answered honestly.
          </p>

          <div className="faq__contact" style={{ background: "var(--navy)" }}>
            <div
              className="contact__label"
              style={{ fontFamily: "var(--font-inter)", letterSpacing: "2px" }}
            >
              Still not sure?
            </div>
            <div
              className="contact__title"
              style={{ color: "white", fontFamily: "var(--font-geist-sans)" }}
            >
              Talk to us directly
            </div>
            <div
              className="contact__sub"
              style={{ fontFamily: "var(--font-inter)", color: "var(--white)" }}
            >
              Call or book online. We&rsquo;ll give you a straight answer in
              under 2 minutes.
            </div>
            <div className="contact__options">
              <motion.a
                whileInView={{
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeInOut",
                }}
                href="tel:0893591444"
                className="contact-btn contact-btn--red"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
                </svg>
                Call (08) 9359 1444
              </motion.a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
                className="contact-btn contact-btn--ghost"
                style={{ fontFamily: "var(--font-geist-mono)", color: "white" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Online
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="faq__right">
          {faqData.map((category, catIdx) => (
            <div key={catIdx}>
              <div
                className={`faq__category${catIdx === 0 ? " first-child" : ""}`}
                style={{
                  ...(catIdx === 0 ? { marginTop: 0 } : undefined),
                  fontFamily: "var(--font-bebas)",
                  letterSpacing: "1.5px",
                }}
              >
                {category.title}
              </div>
              {category.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openItem === key;

                return (
                  <div key={key} className={`faq-item${isOpen ? " open" : ""}`}>
                    <button
                      className="faq-item__trigger"
                      onClick={() => toggle(key)}
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      <span
                        className="faq-item__q"
                        style={{
                          color: isOpen ? "var(--red)" : "#1D1D1F",
                        }}
                      >
                        {item.question}
                      </span>
                      <span
                        className="faq-item__icon"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{ stroke: "var(--gold)" }}
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-item__body">
                        <p
                          className="faq-item__a"
                          style={{
                            fontFamily: "var(--font-inter)",
                            color: "var(--text-dark)",
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <BookingModal visible={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      <style jsx>{`
        .faq {
          background: white;
          padding: clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px);
          position: relative;
          overflow: hidden;
        }

        /* Decorative background elements */
        .faq::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(201, 168, 76, 0.03) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
        }

        .faq::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(220, 53, 69, 0.03) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
        }

        .faq__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* Left Column */
        .faq__left {
          position: sticky;
          top: 100px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          color: var(--gold);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .eyebrow-line {
          width: 32px;
          height: 2px;
          background: var(--gold);
          border-radius: 1px;
        }

        .faq__headline {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1a1a1a;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .faq__headline em {
          color: var(--red);
          font-style: normal;
        }

        .faq__subhead {
          font-size: 1rem;
          color: #4a4a4a;
          line-height: 1.6;
          margin-bottom: 48px;
          font-weight: 400;
        }

        .faq__contact {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 28px;
          margin-top: 40px;
        }

        .contact__label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .contact__title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .contact__sub {
          font-size: 0.85rem;
          color: #6c757d;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .contact__options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .contact-btn--red {
          background: var(--red);
          color: white;
          border: none;
        }

        .contact-btn--red:hover {
          background: #b3000d;
        }

        .contact-btn--ghost {
          background: transparent;
          color: #495057;
          border: 1px solid #dee2e6;
        }

        .contact-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #1a1a1a;
          border-color: #ced4da;
        }

        /* Right Column - FAQ Items */
        .faq__right {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .faq__category {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          letter-spacing: 1.5px;
        }

        .faq__category.first-child {
          margin-top: 0;
        }

        .faq-item {
          border-bottom: 1px solid #e9ecef;
          transition: all 0.2s ease;
        }

        .faq-item__trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .faq-item__trigger:hover {
          padding-left: 4px;
        }

        .faq-item__q {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.4;
          flex: 1;
          transition: color 0.2s ease;
        }

        .faq-item__trigger:hover .faq-item__q {
          color: var(--red);
        }

        .faq-item__icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease-in-out;
        }

        .faq-item__icon svg {
          stroke: var(--gold);
        }

        .faq-item__body {
          overflow: hidden;
        }

        .faq-item__a {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #495057;
          padding-bottom: 24px;
          margin: 0;
          font-weight: 400;
        }

        .faq-item__a strong {
          color: #1a1a1a;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .faq__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .faq__left {
            position: static;
          }

          .faq__contact {
            margin-top: 32px;
          }
        }

        @media (max-width: 640px) {
          .faq {
            padding: 60px 20px;
          }

          .contact__options {
            flex-direction: column;
          }

          .contact-btn {
            justify-content: center;
            width: 100%;
          }

          .faq-item__trigger {
            gap: 12px;
          }

          .faq-item__q {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
