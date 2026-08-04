import "./Hero.css";
import heroImage from "../../assets/images/hero.png";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

/* Animates a number counting up from 0 once it scrolls into view.
   `value` is the target number, `suffix` is appended after counting (e.g. "+"). */
function CountUp({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <strong ref={ref}>
      {display}
      {suffix}
    </strong>
  );
}

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-left">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
           
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
            <br />
            <span className="hero-h1-accent">{t("hero.titleAccent")}</span>
          </motion.h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {t("hero.lead")}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.honey.hanioo"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a className="btn-secondary">{t("hero.ctaSecondary")}</a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <div>
              <CountUp value={1000} suffix="+" />
              <span>{t("hero.statPeople")}</span>
            </div>
            <div>
              <CountUp value={100} suffix="+" />
              <span>{t("hero.statLanguages")}</span>
            </div>
            <div>
              <strong>24 / 7</strong>
              <span>{t("hero.statAvailability")}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            scale:   { duration: 0.8, delay: 0.2 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 },
          }}
        >
          <img
            src={heroImage}
            alt="Hanioo — real-time language interpretation app"
            width="900"
            height="700"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
