"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "@/modal/BookingModal";
import { renderFinePrint } from "@/utils/finePrint";

type FaqQAItem = {
  quection: string;
  answer: string;
};

type HeadeLine = {
  highlightColor: string;
  highlight: string;
  mainSubOne: string;
  mainSubTwo: string;
};

type FaqQAItemProps = FaqQAItem[];

type FaqProps = {
  sectionColor: string;
  backgroundColor: string;
  boarderColor: string;
  iconBackColor: string;
  faqEyebrow: string;
  faqheader: HeadeLine;
  faqPhara: string;

  faqContactLbl: string;
  faqContactTitle: string;
  faqContactSub: string;
  faqContactSubBtn: string;

  faqCatTopicOne: string;
  faqCatTopicTwo: string;
  faqCatTopicThree: string;
  faqQAItem1: FaqQAItemProps;
  faqQAItem2: FaqQAItemProps;
  faqQAItem3: FaqQAItemProps;
};

interface FAQItemData {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategoryData {
  title: string;
  items: FAQItemData[];
}

export default function FAQ({
  sectionColor,
  backgroundColor,
  boarderColor,
  iconBackColor,
  faqEyebrow,
  faqheader,
  faqPhara,

  faqContactLbl,
  faqContactTitle,
  faqContactSub,
  faqContactSubBtn,

  faqCatTopicOne,
  faqCatTopicTwo,
  faqCatTopicThree,
  faqQAItem1,
  faqQAItem2,
  faqQAItem3,
}: FaqProps) {
  const [openItem, setOpenItem] = useState<string>("0-0");
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = (key: string) => {
    setOpenItem((prev) => (prev === key ? "" : key));
  };
  // Map each category's Q&A array straight through, so every item supplied in
  // the data renders. Entries with a blank question are placeholders and are
  // skipped, as are categories left with nothing to show.
  const toItems = (qa: FaqQAItemProps = []): FAQItemData[] =>
    qa
      .filter((item) => item?.quection?.trim())
      .map((item) => ({
        question: item.quection,
        answer: renderFinePrint(item.answer),
      }));

  const faqData: FAQCategoryData[] = [
    { title: faqCatTopicOne, items: toItems(faqQAItem1) },
    { title: faqCatTopicTwo, items: toItems(faqQAItem2) },
    { title: faqCatTopicThree, items: toItems(faqQAItem3) },
  ].filter((category) => category.items.length > 0);

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
          {/* <div className="eyebrow-line"></div> */}
          <span
            style={{
              gap: "8px",
              fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: sectionColor,
              fontWeight: "bold",
              marginBottom: "16px",
              fontFamily: "var(--font-bebas)",
            }}
          >
            {faqEyebrow}
          </span>

          <h2
            className="faq__headline font-bold"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {faqheader.mainSubOne}
            <br />
            <em
              style={{
                fontStyle: "normal",
                color: faqheader.highlightColor,
                display: "inline-block",
              }}
            >
              {faqheader.highlight}
            </em>
            {faqheader.mainSubTwo}
          </h2>

          <p
            className="faq__subhead"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--text-dark)",
            }}
          >
            {faqPhara}
          </p>

          <div className="faq__contact" style={{ background: "var(--navy)" }}>
            <div
              className="contact__label"
              style={{
                fontFamily: "var(--font-inter)",
                letterSpacing: "2px",
                color: sectionColor,
              }}
            >
              {faqContactLbl}
            </div>
            <div
              className="contact__title"
              style={{ color: "white", fontFamily: "var(--font-geist-sans)" }}
            >
              {faqContactTitle}
            </div>
            <div
              className="contact__sub"
              style={{ fontFamily: "var(--font-inter)", color: "var(--white)" }}
            >
              {faqContactSub}
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
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  background: sectionColor,
                }}
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
                className="contact-btn contact-btn--ghost"
                onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
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
                {faqContactSubBtn}
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
                  color: sectionColor,
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
                          color: isOpen ? sectionColor : "#1D1D1F",
                        }}
                      >
                        {item.question}
                      </span>
                      <span
                        className="faq-item__icon"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease-in-out",
                          color: isOpen ? sectionColor : sectionColor,
                          background: iconBackColor,
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{ stroke: sectionColor }}
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
      </div>

      <BookingModal visible={modalOpen} onClose={() => setModalOpen(false)} color={sectionColor} />

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
          color: "var(--navy)";
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
