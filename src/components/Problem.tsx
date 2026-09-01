"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import problemImage from "../../public/tyreShop.svg";

export default function Problem() {
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const painPoints = [
    {
      icon: "/warning.png",
      number: "01",
      title: "“We’ll be about an hour…” 3 hours later",
      description:
        "Vague wait times, no updates, no respect for your schedule. You’re left guessing when you can get back to your day.",
    },
    {
      icon: "/dollars.png",
      number: "02",
      title: "The price at pickup doesn’t match the quote",
      description:
        "“Balancing, valve stems, disposal fee…” Costs that weren’t mentioned when you booked added on at the last second.",
    },
    {
      icon: "/staff.png",
      number: "03",
      title: "Pushed into tyres you didn’t ask for",
      description:
        "Staff who assume you don’t know your own vehicle and push premium upsells before they’ve even looked at your car.",
    },
    {
      icon: "/clock.png",
      number: "04",
      title: "Can’t get in when it suits you",
      description:
        "Long waits for bookings, no same day availability, and inconvenient hours that force you to rearrange your whole week.",
    },
    {
      icon: "/prob.png",
      number: "05",
      title: "Job not done right the first time",
      description:
        "Leaving with a pulling wheel or a dashboard warning light and having to come back and fight to get it fixed properly.",
    },
  ];

  return (
    <>
      <style>{`
        .problem-section {
          --quote-bg: #0A1128;
          padding: clamp(3rem, 8vw, 6.25rem) clamp(1rem, 5vw, 5rem);
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot grid */
        .problem-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        /* Soft glow orb top-right */
        .problem-section::after {
          content: '';
          position: absolute;
          top: -20%;
          right: -15%;
          width: min(500px, 70vw);
          height: min(500px, 70vw);
          background: radial-gradient(circle, rgba(212,0,15,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: absolute;
          bottom: -20%;
          left: -10%;
          width: min(450px, 60vw);
          height: min(450px, 60vw);
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .problem-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Top Row */
        .top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 3.75rem);
          align-items: center;
          margin-bottom: clamp(3rem, 6vw, 4.5rem);
        }

        .vector-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vector-wrapper {
          position: relative;
          width: 100%;
          max-width: 660px;
          margin: 0 auto;
        }

        .vector-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85%;
          padding-bottom: 85%;
          background: radial-gradient(circle, rgba(212,0,15,0.06) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }

        .vector-icon {
          width: 100%;
          height: auto;
          display: block;
        }

        .header-content {
          text-align: left;
        }

        /* Eyebrow tag */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212,0,15,0.07);
          border: 1px solid rgba(212,0,15,0.18);
          border-radius: 4px;
          padding: 0.55rem 1.1rem;
          margin-bottom: 1.25rem;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          background: var(--red, #d4000f);
          border-radius: 50%;
        }

        .eyebrow span {
          font-size: 0.65rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--red, #d4000f);
          font-weight: 700;
        }

        .section-title {
          font-size: clamp(1.8rem, 5.5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          color: var(--navy);
          line-height: 1.15;
        }

        .section-title .highlight {
          color: var(--red, #d4000f);
          display: block;
        }

        .section-subtitle {
          font-size: clamp(0.875rem, 2.5vw, 1rem);
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 0;
        }

        /* Pain Points Grid — 6-col base so cards 4&5 centre naturally */
        .pain-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        /* Each card spans 2 of 6 cols → 3 per row */
        .pain-card { grid-column: span 2; }

        /* Cards 4 & 5 start at col 2 and col 4 → centred */
        .pain-card:nth-child(4) { grid-column: 2 / span 2; }
        .pain-card:nth-child(5) { grid-column: 4 / span 2; }

        /* Pain card */
        .pain-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          cursor: default;
        }

        .pain-card:hover {
          border-color: rgba(212,0,15,0.2);
          box-shadow: 0 12px 28px rgba(0,0,0,0.07);
        }

        /* Icon */
        .pain-icon {
          flex-shrink: 0;
          align-self: center;
          width: 50px;
          height: 50px;
          background: rgba(212,0,15,0.07);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.45rem;
          color: #0A0A0A;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .card-description {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
        }

        /* Quote Card */
        .quote-card {
          background: var(--quote-bg);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 20px;
          padding: clamp(1.5rem, 5vw, 2.5rem);
          margin-bottom: 3.5rem;
          text-align: center;
          position: relative;
        }

        .quote-icon {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-family: Georgia, serif;
          color: rgba(201,168,76,0.35);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .quote-card p {
          font-size: clamp(0.9rem, 3vw, 1.05rem);
          color: rgba(255,255,255,0.88);
          font-style: italic;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 1rem;
        }

        .quote-card cite {
          font-size: 0.65rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #C9A84C;
          font-style: normal;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .cta-label {
          font-size: 0.65rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.75rem;
        }

        .cta-statement {
          font-size: clamp(1rem, 3vw, 1.15rem);
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }

        .cta-statement em {
          font-style: normal;
          color: var(--red, #d4000f);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--red, #d4000f);
          color: #FFFFFF;
          padding: 0.875rem 2rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.2px;
          transition: background 0.2s ease, transform 0.2s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .cta-button:hover {
          background: #b3000d;
          transform: translateY(-2px);
        }

        .cta-button svg {
          transition: transform 0.2s ease;
        }

        .cta-button:hover svg {
          transform: translateX(4px);
        }

        /* Tablet — 2-col: each card spans 3 of 6 */
        @media (max-width: 960px) {
          .pain-card { grid-column: span 3; }
          .pain-card:nth-child(4) { grid-column: span 3; }
          .pain-card:nth-child(5) { grid-column: span 3; }
        }

        /* Mobile — single column */
        @media (max-width: 768px) {
          .top-row {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 2.5rem;
          }
          .header-content { text-align: center; }
          .eyebrow {
            margin-left: auto;
            margin-right: auto;
          }
          .section-title .highlight { display: inline; }
          .pain-card { grid-column: 1 / -1; }
          .pain-card:nth-child(4),
          .pain-card:nth-child(5) { grid-column: 1 / -1; }
          .pain-icon { width: 44px; height: 44px; }
        }

        @media (max-width: 480px) {
          .problem-section {
            padding: 2.5rem 1rem;
          }
          .quote-card {
            padding: 1.25rem;
            margin-bottom: 2.5rem;
          }
        }
      `}</style>

      <section
        id="problems"
        className="problem-section"
        style={{ background: "var(--white, #f6f3f4)" }}
      >
        <div className="glow-orb" />

        <div className="problem-container">
          {/* Top Row: Image Left | Header Right */}
          <div className="top-row">
            {/* Left — illustration */}
            <motion.div
              className="vector-container"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="vector-wrapper">
                <div className="vector-circle" />
                <Image
                  src={problemImage}
                  alt="Frustrated driver at a tyre shop"
                  className="vector-icon"
                  priority
                />
              </div>
            </motion.div>

            {/* Right — headline */}
            <motion.div
              className="header-content"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Most Tyre Shops{" "}
                <span className="highlight">Waste Your Day</span>
                And Insult Your Intelligence.
              </h2>
              <p className="section-subtitle" style={{ color: "var(--black)" }}>
                You&rsquo;re a professional. Your time is worth money. But every
                time you need tyres, it turns into a half day ordeal vague wait
                times, surprise costs at the counter, and staff who treat you
                like you don&rsquo;t know what you&rsquo;re talking about.
                You&rsquo;ve probably left a shop before thinking: &ldquo;Why is
                something this simple always such a hassle?&rdquo;
              </p>
            </motion.div>
          </div>

          <div
            className="flex flex-col items-center gap-3"
            style={{
              marginBottom: "30px",
            }}
          >
            <div className="flex items-center gap-3">
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
                Sound familiar?
              </span>
            </div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              {[0, 1].map((i) => (
                <svg
                  key={i}
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  fill="none"
                  style={{ opacity: i === 0 ? 0.35 : 0.75 }}
                >
                  <polyline
                    points="1 1 10 10 19 1"
                    stroke="var(--red)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
            </motion.div>
          </div>

          {/* Pain Points Grid */}
          <div className="pain-grid">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                className="pain-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -5, transition: { duration: 0.18 } }}
                style={{
                  minHeight: "12rem",
                }}
              >
                {/* Icon */}
                <div className="pain-icon">
                  <Image
                    src={point.icon}
                    alt=""
                    width={26}
                    height={26}
                    style={{ display: "block", objectFit: "contain" }}
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="card-title">{point.title}</h3>
                  <p
                    className="card-description"
                    style={{ color: "var(--black)" }}
                  >
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote Card */}
          <motion.div
            className="quote-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="quote-icon">&ldquo;</div>
            <p>
              Took the morning off work, waited two hours, then they told me the
              price was different to what they quoted. Never going back.
            </p>
            <cite>Real Perth customer review</cite>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="cta-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="cta-label" style={{ color: "var(--black)" }}>
              There&rsquo;s a better way
            </p>
            <p className="cta-statement">
              Kewdale Tyrepower was built for people who{" "}
              <em>don&rsquo;t have time for this.</em>
            </p>
            <motion.div
              onClick={() => {
                smoothScrollTo("solution");
              }}
              className="cta-button"
              whileHover={{ background: "#b3000d", y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              See how we fix this
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
