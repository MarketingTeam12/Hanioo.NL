import "./HowItWorks.css";
import { FaLanguage, FaUserFriends, FaExchangeAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

const stepIcons = [<FaLanguage />, <FaUserFriends />, <FaExchangeAlt />, <FaStar />];
const stepNumbers = ["01", "02", "03", "04"];

function HowItWorks() {
  const { t } = useLanguage();
  const steps = t("howItWorks.steps").map((s, i) => ({
    ...s,
    number: stepNumbers[i],
    icon: stepIcons[i],
  }));

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-inner hiw-inner">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow">{t("howItWorks.eyebrow")}</p>
          <h2>{t("howItWorks.title")}</h2>
          <p>{t("howItWorks.lead")}</p>
        </motion.div>

        <div className="hiw-content">
          <motion.div
            className="hiw-illustration"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <svg viewBox="0 0 420 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of two people communicating through the Hanioo interpretation app">
              <defs>
                <linearGradient id="hiwPhone" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#17416e" />
                  <stop offset="100%" stopColor="#0b1f3f" />
                </linearGradient>
              </defs>

              {/* backdrop blob */}
              <circle cx="210" cy="230" r="200" fill="#f5f8ff" />

              {/* phone frame */}
              <rect x="115" y="55" width="190" height="350" rx="28" fill="url(#hiwPhone)" />
              <rect x="128" y="82" width="164" height="264" rx="10" fill="#ffffff" />
              <rect x="185" y="68" width="50" height="6" rx="3" fill="#1c3a5e" />

              {/* speech bubble 1 - customer, English */}
              <g>
                <rect x="140" y="100" width="120" height="46" rx="14" fill="#eaf2ff" />
                <circle cx="156" cy="123" r="9" fill="#3d8bd4" />
                <rect x="172" y="112" width="72" height="7" rx="3.5" fill="#9db4d6" />
                <rect x="172" y="126" width="52" height="7" rx="3.5" fill="#c3d3ec" />
              </g>

              {/* translate icon */}
              <g transform="translate(150,168)">
                <circle cx="30" cy="16" r="20" fill="#d6b25e" />
                <path d="M20 16h20M30 8v16M24 12l-6 4 6 4M36 12l6 4-6 4" stroke="#0b1f3f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>

              {/* speech bubble 2 - interpreter, Tamil */}
              <g>
                <rect x="140" y="222" width="120" height="46" rx="14" fill="#eef1ff" />
                <circle cx="156" cy="245" r="9" fill="#7ec3ee" />
                <rect x="172" y="234" width="70" height="7" rx="3.5" fill="#b6b1ef" />
                <rect x="172" y="248" width="50" height="7" rx="3.5" fill="#d3d0f7" />
              </g>

              {/* waveform - live call */}
              <g transform="translate(158,290)" stroke="#3d8bd4" strokeWidth="4" strokeLinecap="round">
                <line x1="0" y1="10" x2="0" y2="20" />
                <line x1="14" y1="0" x2="14" y2="30" />
                <line x1="28" y1="6" x2="28" y2="24" />
                <line x1="42" y1="-4" x2="42" y2="34" />
                <line x1="56" y1="6" x2="56" y2="24" />
                <line x1="70" y1="10" x2="70" y2="20" />
                <line x1="84" y1="0" x2="84" y2="30" />
                <line x1="98" y1="10" x2="98" y2="20" />
              </g>

              {/* floating avatar - customer */}
              <motion.g
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
              >
                <circle cx="70" cy="120" r="34" fill="#0b1f3f" />
                <circle cx="70" cy="108" r="13" fill="#c3d3ec" />
                <path d="M46 148c4-16 18-24 24-24s20 8 24 24" fill="#c3d3ec" />
              </motion.g>

              {/* floating avatar - interpreter */}
              <motion.g
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.4 }}
              >
                <circle cx="352" cy="270" r="34" fill="#d6b25e" />
                <circle cx="352" cy="258" r="13" fill="#0b1f3f" />
                <path d="M328 298c4-16 18-24 24-24s20 8 24 24" fill="#0b1f3f" />
              </motion.g>

              {/* connecting dashed arc between avatars */}
              <path d="M100 130 C 200 40, 300 200, 322 250" stroke="#3d8bd4" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.55" />
            </svg>

            <div className="hiw-badge">
              <strong>50+</strong>
              <span>{t("howItWorks.badgeText")}</span>
            </div>
          </motion.div>

          <div className="hiw-steps">
            {steps.map((step, index) => (
              <motion.div
                className="hiw-step"
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="hiw-step-marker">
                  <span className="hiw-step-icon">{step.icon}</span>
                  <span className="hiw-step-number">{step.number}</span>
                </div>
                <div className="hiw-step-text">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
