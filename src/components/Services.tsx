"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "./../modal/BookingModal";

export default function Services() {
  const [featuredModalVisible, setFeaturedModalVisible] = useState(false);

  return (
    <section
      id="service"
      className="relative overflow-hidden flex flex-col justify-center items-center"
      style={{ background: "var(--white, #F5F5F7)" }}
    >
      <div
        className="relative mx-auto"
        style={{ maxWidth: 1100, padding: "64px 24px" }}
      >
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8"
          style={{ marginBottom: "clamp(40px, 6vw, 56px)" }}
        >
          <div>
            <div
              className="flex items-center justify-start font-semibold uppercase"
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
              What we do
            </div>
            <h2
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
                lineHeight: 1.1,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              Everything Your Car Needs <br />
              <em style={{ fontStyle: "normal", color: "var(--red)" }}>
                Done Fast, Done Right.
              </em>
            </h2>
          </div>
          <a
            href="tel:0893591444"
            className="inline-flex items-center shrink-0 font-medium no-underline w-full sm:w-auto justify-center"
            style={{
              fontFamily: "var(--font-geist-mono)",
              gap: 8,
              background: "var(--navy)",
              color: "var(--white)",
              fontSize: "0.85rem",
              padding: "13px 24px",
              borderRadius: 3,
              transition: "all 0.2s ease",
            }}
          >
            Call Now
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Cards - Responsive Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          style={{ marginBottom: 48 }}
        >
          {/* Tyre Supply & Fitment — Featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
            className="flex flex-col overflow-hidden"
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              position: "relative",
              boxShadow: "0 4px 20px rgba(212,0,15,0.08)",
              minHeight: "25rem",
            }}
          >
            {/* Most Popular Badge */}
            {/* Subtle corner badge - fixed */}
            <div
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                top: 0,
                right: 0,
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              <div
                className="absolute font-semibold uppercase text-center"
                style={{
                  fontFamily: "var(--font-bebas)",
                  background: "var(--red)",
                  color: "var(--white)",
                  fontSize: "0.5rem",
                  letterSpacing: "1px",
                  padding: "6px 0",
                  width: 120,
                  position: "absolute",
                  top: 20,
                  right: -30,
                  transform: "rotate(45deg)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Most Popular
              </div>
            </div>

            <div
              className="flex items-start"
              style={{
                padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px) 20px",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                gap: 16,
                background:
                  "linear-gradient(135deg, rgba(212,0,15,0.04), transparent)",
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: "rgba(212,0,15,0.08)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.95rem, 2.5vw, 1rem)",
                    color: "var(--navy)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                    fontWeight: 600,
                  }}
                >
                  Tyre Supply &amp; Fitment
                </div>
                <div
                  className="flex items-center"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    color: "var(--black)",
                    gap: 5,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--black)"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  90 minutes{" "}
                  <span
                    style={{
                      fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                      fontWeight: "Bold",
                    }}
                  >
                    (Subject to availability)
                  </span>
                </div>
              </div>
            </div>

            <div
              className="flex-1"
              style={{ padding: "20px clamp(20px, 4vw, 28px)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.8rem, 2.2vw, 0.83rem)",
                  color: "var(--black)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  marginBottom: 18,
                }}
              >
                All major brands in stock. We&apos;ll recommend the right tyre
                for your vehicle and driving style no upselling, just honest
                advice.
              </p>
              <div className="flex flex-col" style={{ gap: 7 }}>
                {[
                  "Supply + fit included",
                  "Wheel balancing included",
                  "Tyre pressure check included",
                  "Old tyre disposal included",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start"
                    style={{
                      fontFamily: "var(--font-inter)",
                      gap: 8,
                      fontSize: "clamp(0.72rem, 2vw, 0.78rem)",
                      color: "var(--black)",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--red)"
                      strokeWidth="2.5"
                      className="shrink-0 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "16px clamp(20px, 4vw, 28px)",
                background: "rgba(212,0,15,0.02)",
                borderTop: "1px solid rgba(212,0,15,0.08)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setFeaturedModalVisible(true)}
                className="flex items-center font-semibold cursor-pointer"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--red, #d4000f)",
                  gap: 5,
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(212,0,15,0.3)",
                  paddingBottom: 2,
                  transition: "all 0.2s ease",
                }}
              >
                Book now
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Wheel Alignment */}
          <ServiceCard
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            }
            title="Wheel Alignment"
            time="45 minutes"
            description="Incorrect alignment wears tyres 2–3x faster and affects fuel economy. We use computerised equipment for precise results, every time."
            includes={[
              "Computerised alignment check",
              "Before & after print out",
              "Steering & suspension check",
            ]}
            cta="Book now"
            priceLabel={""}
            price={undefined}
          />

          {/* Puncture Repair */}
          <ServiceCard
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            }
            title="Puncture Repair"
            time="30 minutes"
            description="Don't replace when you can repair. If it's fixable, we'll fix it properly no patch and hope, full internal repair to industry standard."
            includes={[
              "Full tyre inspection first",
              "Internal plug & patch repair",
              "Rebalance after repair",
            ]}
            cta="Book now"
            priceLabel={""}
            price={undefined}
          />

          {/* Wheel Balancing */}
          <ServiceCard
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            }
            title="Wheel Balancing"
            time="45 minutes"
            description="Vibration through the steering wheel? Uneven wear? Dynamic balancing eliminates the issue and extends tyre life significantly."
            includes={["Dynamic computerised balancing", "All four wheels"]}
            cta="Book now"
            priceLabel={""}
            price={undefined}
          />

          {/* Tyre Rotation */}
          <ServiceCard
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
            }
            title="Tyre Rotation"
            time="30–40 minutes"
            description="Maximise the life of your tyres. Regular rotation evens out wear patterns and means you replace less often saving money long term."
            includes={[
              "All four wheels rotated",
              "Pressure check & adjustment",
            ]}
            cta="Book now"
            priceLabel={""}
            price={undefined}
          />

          {/* Free Tyre Safety Check */}
          <ServiceCard
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Free Tyre Safety Check"
            time="10 minutes"
            description="Not sure if your tyres need replacing? Drive in, we'll check tread depth, pressure, and condition across all four tyres  at no charge."
            includes={["Tread depth measurement", "No obligation, ever"]}
            cta="Book check"
            priceLabel={""}
            price={undefined}
          />
        </div>

        <BookingModal
          visible={featuredModalVisible}
          onClose={() => setFeaturedModalVisible(false)}
          serviceName="Tyre Supply & Fitment"
        />

        {/* Add-ons strip */}
        <div
          className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-0"
          style={{
            justifyContent: "center",
          }}
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "Run flat Fitment",
              "4WD & SUV Tyres",
              "Locking Wheel Nuts",
              "Fleet Servicing",
            ].map((addon) => (
              <div
                key={addon}
                className="flex items-center"
                style={{
                  fontFamily: "var(--font-inter)",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  background: "#FFFFFF",
                  border: "1px solid rgba(212,0,15,0.15)",
                  borderRadius: "40px",
                  padding: "clamp(8px, 1.5vh, 10px) clamp(12px, 2.5vw, 18px)",
                  fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                  color: "var(--navy)",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  whiteSpace: "nowrap",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--red)"
                  strokeWidth="2.5"
                  className="shrink-0"
                  style={{
                    width: "clamp(10px, 1.5vw, 12px)",
                    height: "clamp(10px, 1.5vw, 12px)",
                  }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ whiteSpace: "nowrap" }}>{addon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  time,
  description,
  includes,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
  includes: string[];
  priceLabel: string;
  price: React.ReactNode;
  cta: string;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalVisible(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 28px rgba(0,0,0,0.09)",
        transition: { duration: 0.18 },
      }}
      className="flex flex-col overflow-hidden h-full"
      style={{
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minHeight: "25rem",
      }}
    >
      <div
        className="flex items-start"
        style={{
          padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px) 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          gap: 16,
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 46,
            height: 46,
            borderRadius: 10,
            background: "rgba(11,28,58,0.06)",
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(0.95rem, 2.5vw, 1rem)",
              color: "var(--navy)",
              marginBottom: 4,
              lineHeight: 1.3,
              fontWeight: 600,
            }}
          >
            {title}
          </div>
          <div
            className="flex items-center"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.72rem",
              color: "var(--text-dark)",
              gap: 5,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--black)"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {time}{" "}
            {title === "Wheel Alignment" || title === "Puncture Repair" ? (
              <span
                style={{
                  fontSize: "clamp(0.5rem, 2.2vw, 0.55rem)",
                  fontWeight: "Bold",
                }}
              >
                (Depending on the vehicle)
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        className="flex-1"
        style={{ padding: "20px clamp(20px, 4vw, 28px)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.8rem, 2.2vw, 0.83rem)",
            color: "var(--text-dark)",
            lineHeight: 1.65,
            fontWeight: 300,
            marginBottom: 18,
          }}
        >
          {description}
        </p>
        <div className="flex flex-col" style={{ gap: 7 }}>
          {includes.map((item) => (
            <div
              key={item}
              className="flex items-start"
              style={{
                fontFamily: "var(--font-inter)",
                gap: 8,
                fontSize: "clamp(0.72rem, 2vw, 0.78rem)",
                color: "var(--text-dark)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--red)"
                strokeWidth="2.5"
                className="shrink-0 mt-0.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4"
        style={{
          padding: "16px clamp(20px, 4vw, 28px)",
          background: "rgba(0,0,0,0.02)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <button
          onClick={() => handleBookNow(title)}
          className="flex items-center font-semibold no-underline cursor-pointer"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--navy)",
            gap: 5,
            background: "none",
            border: "none",
            borderBottom: "1px solid rgba(11,28,58,0.2)",
            paddingBottom: 2,
            transition: "all 0.2s ease",
          }}
        >
          {cta}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      <BookingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        serviceName={selectedService}
      />
    </motion.div>
  );
}
