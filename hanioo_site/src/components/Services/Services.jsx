import "./Services.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/servicesData";
import { servicesNL } from "../../data/servicesData.nl";
import { useLanguage } from "../../i18n/LanguageContext";

function Services() {
  const { language, t } = useLanguage();

  return (
    <section className="services" id="services">
      <div className="section-inner">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow">{t("services.eyebrow")}</p>
          <h2>{t("services.title")}</h2>
          <p>{t("services.lead")}</p>
        </motion.div>

        <div className="service-grid">
          {services.map((item, index) => {
            const nl = language === "nl" ? servicesNL[item.slug] : null;
            const title = nl?.title || item.title;
            const desc = nl?.desc || item.desc;

            return (
              <motion.div
                className="card"
                key={item.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="card-image">
                  <img src={item.image} alt={title} loading="lazy" />
                  <span
                    className="card-image-icon"
                    style={{ background: item.color }}
                  >
                    {item.icon}
                  </span>
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
                <Link to={`/service/${item.slug}`} className="card-link">
                  {t("services.exploreLink")} <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
