import "./About.css";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

/* ── Inline SVG: two people communicating across the globe ── */
function CommunicationSVG() {
  return (
    <svg
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two professionals communicating through interpreted language bridge"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="ab-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf2ff" />
          <stop offset="100%" stopColor="#ede9ff" />
        </linearGradient>
        <linearGradient id="ab-bridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d8bd4" />
          <stop offset="50%" stopColor="#7ec3ee" />
          <stop offset="100%" stopColor="#d6b25e" />
        </linearGradient>
        <linearGradient id="ab-phone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17416e" />
          <stop offset="100%" stopColor="#0b1f3f" />
        </linearGradient>
      </defs>

      {/* Background blob */}
      <ellipse cx="210" cy="200" rx="200" ry="180" fill="url(#ab-bg)" />

      {/* ── Globe ── */}
      <circle cx="210" cy="195" r="68" fill="none" stroke="#c5d9f8" strokeWidth="1.5" />
      <ellipse cx="210" cy="195" rx="35" ry="68" fill="none" stroke="#c5d9f8" strokeWidth="1.5" />
      <line x1="142" y1="195" x2="278" y2="195" stroke="#c5d9f8" strokeWidth="1.5" />
      <line x1="148" y1="165" x2="272" y2="165" stroke="#c5d9f8" strokeWidth="1" />
      <line x1="148" y1="225" x2="272" y2="225" stroke="#c5d9f8" strokeWidth="1" />
      <circle cx="210" cy="195" r="68" fill="none" stroke="#b0c8f0" strokeWidth="2" />

      {/* Language bridge beam */}
      <line x1="70" y1="195" x2="350" y2="195" stroke="url(#ab-bridge)" strokeWidth="3" strokeLinecap="round" />

      {/* ── Left person (customer) ── */}
      {/* Head */}
      <circle cx="68" cy="125" r="28" fill="#0b1f3f" />
      <circle cx="68" cy="113" r="13" fill="#c3d3ec" />
      <path d="M48 150c3-14 15-20 20-20s17 6 20 20" fill="#c3d3ec" />
      {/* Speech bubble */}
      <rect x="22" y="56" width="92" height="44" rx="12" fill="#fff" stroke="#3d8bd4" strokeWidth="1.5" />
      <polygon points="52,100 62,100 57,112" fill="#fff" stroke="#3d8bd4" strokeWidth="1" strokeLinejoin="round" />
      <text x="68" y="77" textAnchor="middle" fill="#0b1f3f" fontSize="9" fontWeight="700" fontFamily="'Inter',sans-serif">I need help</text>
      <text x="68" y="91" textAnchor="middle" fill="#0b1f3f" fontSize="9" fontFamily="'Inter',sans-serif">in Arabic 🇸🇦</text>
      {/* Flag badge */}
      <circle cx="40" cy="160" r="12" fill="#3d8bd4" />
      <text x="40" y="164" textAnchor="middle" fontSize="11">🇺🇸</text>

      {/* ── Right person (interpreter) ── */}
      {/* Head */}
      <circle cx="352" cy="125" r="28" fill="#d6b25e" />
      <circle cx="352" cy="113" r="13" fill="#0b1f3f" />
      <path d="M332 150c3-14 15-20 20-20s17 6 20 20" fill="#0b1f3f" />
      {/* Speech bubble */}
      <rect x="306" y="56" width="92" height="44" rx="12" fill="#fff" stroke="#7ec3ee" strokeWidth="1.5" />
      <polygon points="348,100 358,100 353,112" fill="#fff" stroke="#7ec3ee" strokeWidth="1" strokeLinejoin="round" />
      <text x="352" y="77" textAnchor="middle" fill="#0b1f3f" fontSize="9" fontWeight="700" fontFamily="'Inter',sans-serif">مرحباً، بكل</text>
      <text x="352" y="91" textAnchor="middle" fill="#0b1f3f" fontSize="9" fontFamily="'Inter',sans-serif">سرور! 🌍</text>
      {/* Flag badge */}
      <circle cx="382" cy="160" r="12" fill="#7ec3ee" />
      <text x="382" y="164" textAnchor="middle" fontSize="11">🇮🇳</text>

      {/* ── Hanioo hub on bridge ── */}
      <circle cx="210" cy="195" r="30" fill="#0b1f3f" />
      <text x="210" y="191" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="'Sora',sans-serif">HANIOO</text>
      <text x="210" y="203" textAnchor="middle" fill="#d6b25e" fontSize="7" fontFamily="'Inter',sans-serif">interpreter</text>

      {/* ── Wave / signal dots ── */}
      {[120, 148, 176].map((x, i) => (
        <circle key={x} cx={x} cy="195" r={3 - i * 0.5} fill="#3d8bd4" opacity={0.7 - i * 0.15} />
      ))}
      {[244, 272, 300].map((x, i) => (
        <circle key={x} cx={x} cy="195" r={2.5 - i * 0.4} fill="#7ec3ee" opacity={0.7 - i * 0.15} />
      ))}

      {/* ── Bottom stat badges ── */}
      <rect x="60" y="260" width="130" height="40" rx="12" fill="#fff" stroke="#e6ebf5" strokeWidth="1" />
      <text x="125" y="277" textAnchor="middle" fill="#0b1f3f" fontSize="10" fontWeight="700" fontFamily="'Inter',sans-serif">100+ Languages</text>
      <text x="125" y="292" textAnchor="middle" fill="#5b6472" fontSize="9" fontFamily="'Inter',sans-serif">Spoken worldwide</text>

      <rect x="230" y="260" width="130" height="40" rx="12" fill="#fff" stroke="#e6ebf5" strokeWidth="1" />
      <text x="295" y="277" textAnchor="middle" fill="#0b1f3f" fontSize="10" fontWeight="700" fontFamily="'Inter',sans-serif">24 / 7 Available</text>
      <text x="295" y="292" textAnchor="middle" fill="#5b6472" fontSize="9" fontFamily="'Inter',sans-serif">Any timezone</text>

      {/* ── Certified badge ── */}
      <rect x="145" y="318" width="130" height="36" rx="18" fill="#0b1f3f" />
      <text x="210" y="341" textAnchor="middle" fill="#d6b25e" fontSize="11" fontWeight="700" fontFamily="'Inter',sans-serif">✓ Certified Interpreters</text>
    </svg>
  );
}

function About() {
  const { t } = useLanguage();
  const points = t("about.points");

  return (
    <section className="about" id="about">
      <div className="section-inner about-inner">
        <motion.div
          className="about-image"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="about-image-frame">
            <CommunicationSVG />
          </div>
          <div className="about-badge">
            <strong>1000+</strong>
            <span>{t("about.badgeText")}</span>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="eyebrow">{t("about.eyebrow")}</p>

          <h2>
            {t("about.titleLine1")}
            <span> {t("about.titleAccent")}</span>
          </h2>

          <p className="about-lead">{t("about.lead")}</p>

          <ul className="about-list">
            {points.map((point) => (
              <li key={point}>
                <FaCheckCircle />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-dark">
            {t("about.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
