import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import "./ServiceDetail.css";
import { services, getServiceBySlug } from "../../data/servicesData";
import { servicesNL } from "../../data/servicesData.nl";
import Popup from "../Popup/popup";
import { useLanguage } from "../../i18n/LanguageContext";

/* ── Professional photo hero, themed per service ── */
function ServiceHeroPhoto({ image, color, icon, title, caption }) {
  return (
    <div className="service-hero-photo">
      <img src={image} alt={title} loading="lazy" />
      <div className="shp-overlay" style={{ background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)` }} />
      <div className="shp-badge" style={{ color: "#fff", background: `${color}e6` }}>
        {icon}
      </div>
      <div className="shp-caption">{caption}</div>
    </div>
  );
}

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, []);
  return null;
}

function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const [popupMode, setPopupMode] = useState(null); // "start" | "talk" | null
  const { language, t } = useLanguage();

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const nl = language === "nl" ? servicesNL[service.slug] : null;

  // Merge English base data with the Dutch overlay (when active), keeping
  // icons/colors/images from the base data either way.
  const title = nl?.title || service.title;
  const tagline = nl?.tagline || service.tagline;
  const desc = nl?.desc || service.desc;
  const intro = nl?.intro || service.intro;
  const body = nl?.body || service.body;
  const features = service.features.map((f, i) => ({
    icon: f.icon,
    title: nl?.features?.[i]?.title || f.title,
    text: nl?.features?.[i]?.text || f.text,
  }));
  const useCases = nl?.useCases || service.useCases;

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <motion.main
      className="service-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ScrollToTopOnMount />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="section-inner sd-hero-inner">
          <motion.div
            className="sd-hero-copy"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link to="/#services" className="sd-back">
              <FaArrowLeft /> {t("serviceDetail.backToServices")}
            </Link>

            <div className="sd-icon-badge" style={{ color: service.color, background: `${service.color}18` }}>
              {service.icon}
            </div>

            <p className="eyebrow" style={{ color: service.color, background: `${service.color}14` }}>
              {tagline}
            </p>
            <h1>{title}</h1>
            <p className="sd-lead">{intro}</p>

            <div className="sd-cta-row">
              <button className="cta-btn" onClick={() => setPopupMode("start")}>
                {t("serviceDetail.getStarted")} <FaArrowRight />
              </button>
              <button className="sd-secondary-btn" onClick={() => setPopupMode("talk")}>
                {t("serviceDetail.talkToUs")}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <ServiceHeroPhoto
              image={service.image}
              color={service.color}
              icon={service.icon}
              title={title}
              caption={t("serviceDetail.poweredBy")}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Body / description ──────────────────────────────── */}
      <section className="sd-body">
        <div className="section-inner sd-body-inner">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {body}
          </motion.p>
        </div>
      </section>

      {/* ── Photo banner ─────────────────────────────────────── */}
      <section className="sd-photo-banner">
        <div className="section-inner">
          <motion.div
            className="sd-photo-banner-frame"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img src={service.image} alt={`${title} — Hanioo`} loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ── Feature grid ─────────────────────────────────────── */}
      <section className="sd-features">
        <div className="section-inner">
          <div className="title">
            <p className="eyebrow">{t("serviceDetail.whyHanioo")}</p>
            <h2>{t("serviceDetail.whatMakesDifferent")}</h2>
          </div>

          <div className="sd-feature-grid">
            {features.map((f, i) => (
              <motion.div
                className="sd-feature-card"
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="sd-feature-icon" style={{ color: service.color, background: `${service.color}18` }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────── */}
      <section className="sd-usecases">
        <div className="section-inner sd-usecases-inner">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">{t("serviceDetail.whereUsed")}</p>
            <h2>{t("serviceDetail.builtForMoments")}</h2>
            <p className="sd-usecases-sub">
              {t("serviceDetail.usecasesSubPrefix")} {title.toLowerCase()} {t("serviceDetail.usecasesSubSuffix")}
            </p>
          </motion.div>

          <ul className="sd-usecases-list">
            {useCases.map((u, i) => (
              <motion.li
                key={u}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <FaCheckCircle style={{ color: service.color }} />
                <span>{u}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="sd-cta-banner">
        <motion.div
          className="section-inner sd-cta-banner-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{t("serviceDetail.readyToConnect")} {title}{t("serviceDetail.readyToConnectSuffix")}</h2>
          <p>{t("serviceDetail.readyToConnectSub")}</p>
          <button className="cta-btn" onClick={() => setPopupMode("start")}>
            {t("serviceDetail.getStarted")} <FaArrowRight />
          </button>
        </motion.div>
      </section>

      {/* ── Related services ─────────────────────────────────── */}
      <section className="sd-related">
        <div className="section-inner">
          <div className="title">
            <p className="eyebrow">{t("serviceDetail.exploreMore")}</p>
            <h2>{t("serviceDetail.otherServices")}</h2>
          </div>

          <div className="sd-related-grid">
            {related.map((r, i) => {
              const rNL = language === "nl" ? servicesNL[r.slug] : null;
              const rTitle = rNL?.title || r.title;
              const rDesc = rNL?.desc || r.desc;
              return (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <Link to={`/service/${r.slug}`} className="sd-related-card">
                    <div className="sd-related-thumb">
                      <img src={r.image} alt={rTitle} loading="lazy" />
                      <div className="icon" style={{ color: r.color, background: `${r.color}18` }}>
                        {r.icon}
                      </div>
                    </div>
                    <h3>{rTitle}</h3>
                    <p>{rDesc}</p>
                    <span className="card-link">
                      {t("serviceDetail.learnMore")} <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {popupMode && (
        <Popup
          closePopup={() => setPopupMode(null)}
          title={popupMode === "talk" ? t("popup.talkTitle") : t("popup.joinTitle")}
          subtitle={
            popupMode === "talk" ? t("popup.talkSubtitle") : t("popup.joinSubtitle")
          }
        />
      )}
    </motion.main>
  );
}

export default ServiceDetail;
