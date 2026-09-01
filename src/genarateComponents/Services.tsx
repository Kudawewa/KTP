"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BookingModal from "./../modal/BookingModal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { renderFinePrint } from "@/utils/finePrint";

/**
 * The source_page recorded against a booking: the project slug from
 * /projects/[slug]. Matches genarateComponents/Offer.tsx so every form on a
 * project page agrees, and never returns "" (the backend requires it).
 */
function useSourcePage(): string {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "") return "professional";
  return pathname.split("/").pop() || "professional";
}

type serviceHeader = {
  main: string;
  highlight: string;
};

type ServiceCardItems = {
  icon: string;
  title: string;
  time: string;
  description: string;
  includes: string[];
  cta: string;
};

type ServiceCardPro = {
  icon: string;
  lbl: string;
  title: string;
  time: string;
  description: string;
  includes: string[];
  cta: string;
};

type ServiceCardItemsProps = ServiceCardItems[];
type ServiceProps = {
  sectionColor: string;
  backgroundColor: string;
  borderColor: string;
  serviceEyebrow: string;
  serviceHeader: serviceHeader;
  serviceTopBtn: string;
  proServiceCard: ServiceCardPro;
  serviceCardItem: ServiceCardItemsProps;
  bottomServiceItems: string[];
};

export default function Services({
  sectionColor,
  backgroundColor,
  borderColor,
  serviceEyebrow,
  serviceHeader,
  serviceTopBtn,
  proServiceCard,
  serviceCardItem,
  bottomServiceItems,
}: ServiceProps) {
  const sourcePage = useSourcePage();
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
                color: sectionColor,
                fontWeight: "bold",
                marginBottom: "16px",
                fontFamily: "var(--font-bebas)",
              }}
            >
              {serviceEyebrow}
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
              {serviceHeader.main} <br />
              <em style={{ fontStyle: "normal", color: sectionColor }}>
                {serviceHeader.highlight}
              </em>
            </h2>
          </div>
          <a
            href="tel:0893591444"
            className="inline-flex items-center shrink-0 font-medium no-underline w-full sm:w-auto justify-center"
            style={{
              fontFamily: "var(--font-geist-mono)",
              gap: 8,
              background: sectionColor,
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
              boxShadow: `0 4px 20px ${sectionColor}14`,
              minHeight: "25rem",
            }}
          >
            {/* Most Popular Badge */}
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
                  background: sectionColor,
                  color: "var(--white)",
                  fontSize: "0.5rem",
                  letterSpacing: "1px",
                  padding: "7px 0",
                  width: 123,
                  position: "absolute",
                  top: 20,
                  right: -30,
                  transform: "rotate(45deg)",
                  boxShadow: `0 2px 4px ${borderColor}`,
                }}
              >
                {proServiceCard.lbl}
              </div>
            </div>

            <div
              className="flex items-start"
              style={{
                padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px) 20px",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                gap: 16,
                background: `linear-gradient(135deg, ${backgroundColor}, transparent)`,
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: backgroundColor,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ stroke: sectionColor }}
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
                  {proServiceCard.title}
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
                    style={{ stroke: sectionColor }}
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {proServiceCard.time}
                  <span
                    style={{
                      fontSize: "clamp(0.4rem, 1.2vw, 0.55rem)",
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
                {renderFinePrint(proServiceCard.description)}
              </p>
              <div className="flex flex-col" style={{ gap: 7 }}>
                {proServiceCard.includes.map((item) => (
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
                      style={{ stroke: sectionColor }}
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
                background: `${sectionColor}05`,
                borderTop: `1px solid ${sectionColor}14`,
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
                  color: sectionColor,
                  gap: 5,
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${sectionColor}4d`,
                  paddingBottom: 2,
                  transition: "all 0.2s ease",
                }}
              >
                Book now
                {/* {proServiceCard.cta} */}
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
              visible={featuredModalVisible}
              onClose={() => setFeaturedModalVisible(false)}
              serviceName={proServiceCard.title}
              color={sectionColor}
              sourcePage={sourcePage}
            />
          </motion.div>

          {/* Card Item */}
          {serviceCardItem.map((item, idx) => (
            <ServiceCard
              key={idx} // Add unique key
              icon={item.icon}
              title={item.title} // Use item data
              time={item.time} // Use item data
              description={item.description} // Use item data
              includes={item.includes} // Use item data
              cta={item.cta} // Use item data
              priceLabel={""}
              price={""}
              sectionColor={sectionColor}
              backgroundColor={backgroundColor}
              boarderColor={borderColor}
            />
          ))}
        </div>

        {/* Add-ons strip */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0"
          style={{
            justifyContent: "center",
          }}
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {bottomServiceItems.map((addon) => (
              <div
                key={addon}
                className="flex items-center"
                style={{
                  fontFamily: "var(--font-inter)",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  background: "#FFFFFF",
                  border: `1px solid ${sectionColor}26`,
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
                  style={{
                    stroke: sectionColor,
                    width: "clamp(10px, 1.5vw, 12px)",
                    height: "clamp(10px, 1.5vw, 12px)",
                  }}
                  strokeWidth="2.5"
                  className="shrink-0"
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
  sectionColor,
  backgroundColor,
  boarderColor,
}: {
  icon: string;
  title: string;
  time: string;
  description: string;
  includes: string[];
  priceLabel: string;
  price: React.ReactNode;
  cta: string;
  sectionColor: string;
  backgroundColor: string;
  boarderColor: string;
}) {
  const sourcePage = useSourcePage();
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
          borderBottom: `2px solid rgba(0,0,0,0.1)`,
          gap: 16,
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 46,
            height: 46,
            borderRadius: 10,
            border: `1px solid ${boarderColor}`,
            background: backgroundColor,
          }}
        >
          <Image
            src={icon}
            alt="icon"
            width={25}
            height={25}
            className="object-contain"
          />
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
              style={{ stroke: sectionColor }}
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {time}
            {title === "4 Wheel Precision Alignment" ||
            title === "Wheel Balancing" || title === "Wheel Alignment" || title === "Puncture Repair" ? (
              <span
                style={{
                  fontSize: "clamp(0.4rem, 1.2vw, 0.55rem)",
                  fontWeight: "Bold",
                }}
              >
                (Depending on the vehicle)
              </span>
            ) : (
              <></>
            )}

            {title === "Staggered Fitment" ||
            title === "Run Flat Fitment" || title === "Free Safety Check" || title === "Tyre Supply & Fitment" ? (
              <span
                style={{
                  fontSize: "clamp(0.4rem, 1.2vw, 0.55rem)",
                  fontWeight: "Bold",
                }}
              >
                (Subject to availability)
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
          {renderFinePrint(description)}
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
                strokeWidth="2.5"
                className="shrink-0 mt-0.5"
                style={{ stroke: sectionColor }}
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
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => handleBookNow(title)}
          className="flex items-center font-semibold no-underline cursor-pointer"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: sectionColor,
            gap: 5,
            background: "none",
            border: "none",
            borderBottom: `1px solid ${sectionColor}4d`,
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
        color={sectionColor}
        sourcePage={sourcePage}
      />
    </motion.div>
  );
}
