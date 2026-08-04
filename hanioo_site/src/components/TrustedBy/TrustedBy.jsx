import "./TrustedBy.css";
import { motion } from "framer-motion";
import {
  FaHospitalAlt,
  FaBalanceScale,
  FaBriefcase,
  FaGlobeAmericas,
  FaHandsHelping,
  FaUniversity,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

/* Sector partners Hanioo interpreters regularly support.
   Icon-based marks are used instead of third-party brand logos. */
const partnerIcons = [
  FaHospitalAlt,
  FaBalanceScale,
  FaBriefcase,
  FaGlobeAmericas,
  FaHandsHelping,
  FaUniversity,
  FaHeadset,
  FaShieldAlt,
];

/* Distinct professional colors per sector so the marquee reads as colorful, not monochrome. */
const partnerColors = [
  "#e74c6f",
  "#2f80ed",
  "#3d8bd4",
  "#1abc9c",
  "#27ae60",
  "#8e44ad",
  "#e67e22",
  "#d6b25e",
];

function TrustedBy() {
  const { t } = useLanguage();
  const partners = t("trustedBy.partners").map((label, i) => ({
    icon: partnerIcons[i],
    label,
    color: partnerColors[i % partnerColors.length],
  }));
  // Duplicate the list so the marquee loops seamlessly with no visible seam.
  const track = [...partners, ...partners];

  return (
    <section className="trusted-by" aria-label="Sectors that trust Hanioo">
      <motion.div
        className="section-inner trusted-by-head"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="trusted-by-eyebrow">{t("trustedBy.eyebrow")}</p>
        <h3>{t("trustedBy.title")}</h3>
      </motion.div>

      <div className="trusted-by-marquee" role="presentation">
        <div className="trusted-by-track">
          {track.map(({ icon: Icon, label, color }, i) => (
            <div
              className="trusted-by-item"
              key={`${label}-${i}`}
              style={{ "--item-color": color }}
            >
              <span className="trusted-by-icon">
                <Icon />
              </span>
              <span className="trusted-by-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
