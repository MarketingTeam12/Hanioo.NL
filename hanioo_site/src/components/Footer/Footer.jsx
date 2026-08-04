import "./Footer.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGooglePlay,
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaLink,
  FaBriefcase,
  FaHeadset,
} from "react-icons/fa";
import haniooDutchLogo from "../../assets/images/hanioo-dutch-logo.png";
import { services } from "../../data/servicesData";
import { servicesNL } from "../../data/servicesData.nl";
import { useLanguage } from "../../i18n/LanguageContext";

const socials = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    href: "https://www.facebook.com/honeytranslationservices/",
    className: "social-facebook",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/honey_translation_services_/",
    className: "social-instagram",
  },
  {
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/honey-translation-services",
    className: "social-linkedin",
  },
  {
    icon: <FaGooglePlay />,
    label: "Play Store",
    href: "https://play.google.com/store/apps/details?id=com.honey.hanioo",
    className: "social-playstore",
  },
];

const quickLinkHrefs = ["#home", "#services", "#how-it-works", "#about", "#contact"];
const quickLinkKeys = ["home", "services", "howItWorks", "about", "contact"];

/* Illustrated flat-design people avatars — used instead of real photos
   (no third-party/real-person images used, so there's no privacy or
   copyright concern), styled to read as friendly human faces. */
function Avatar1() {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#F4B183" />
      <circle cx="20" cy="17" r="7.2" fill="#3A2317" />
      <path d="M6 38c1.5-8.5 8-12.5 14-12.5S38.5 29.5 40 38v2H6v-2z" fill="#2F80ED" />
      <path d="M13 15c0-5 3-8.5 7-8.5s7 3.5 7 8.5c0 1-.2 2-.5 3-1-3-3.3-4.5-6.5-4.5s-5.5 1.5-6.5 4.5c-.3-1-.5-2-.5-3z" fill="#1F1410" />
    </svg>
  );
}

function Avatar2() {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#E8C39E" />
      <path d="M12 14c0-5.5 4-9 8-9s8 3.5 8 9c0 1.8-.4 4-1 6-1.2-1-2.5-2-4-2.4l-.3 2.4h-5.4l-.3-2.4c-1.5.4-2.8 1.4-4 2.4-.6-2-1-4.2-1-6z" fill="#241408" />
      <circle cx="20" cy="18" r="6.6" fill="#5B4324" />
      <path d="M5 38c1.5-8 7.6-12.5 15-12.5S33.5 30 35 38v2H5v-2z" fill="#5B4FE0" />
    </svg>
  );
}

function Avatar3() {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#D6B25E" />
      <circle cx="20" cy="17" r="7" fill="#3C2A1A" />
      <path d="M8 39c1.2-9 7.5-13.8 12-13.8S30.8 30 32 39v1H8v-1z" fill="#0A1930" />
      <path d="M13.3 12.5c1.8-2.4 4.5-3.6 6.7-3.6s4.9 1.2 6.7 3.6c-1 .3-2 .4-3 .4-3 0-6-1-7.4-2.4-.7 1.1-1.8 2-3 2z" fill="#2A1B0E" />
    </svg>
  );
}

function Avatar4() {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#B8CBEF" />
      <circle cx="20" cy="17.5" r="7" fill="#132A4A" />
      <path d="M7 39c1.4-8.7 7.6-13.4 13-13.4S31.6 30.3 33 39v1H7v-1z" fill="#14304F" />
      <path d="M13 13c1.6-2.6 4.2-4 7-4s5.4 1.4 7 4c-1.6 1-3.4 1.6-5.2 1.7l.2-2.2-3.8-.2.2 2.2c-1.9-.1-3.7-.7-5.4-1.5z" fill="#0A1930" />
    </svg>
  );
}

const enrolledAvatars = [Avatar1, Avatar2, Avatar3, Avatar4];

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { language, t } = useLanguage();

  const quickLinkLabels = t("footer.quickLinkLabels");
  const quickLinks = quickLinkHrefs.map((href, i) => ({
    label: quickLinkLabels[quickLinkKeys[i]],
    href,
  }));

  const serviceLinks = services.slice(0, 5).map((s) => ({
    label: language === "nl" ? servicesNL[s.slug]?.title || s.title : s.title,
    slug: s.slug,
    icon: s.icon,
    color: s.color,
  }));

  const handleAnchorClick = (e, href) => {
    if (!isHome) {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  };

  return (
    <footer className="footer">
      <div className="section-inner footer-grid">
        <div className="footer-brand footer-col-animated" style={{ "--fdelay": "0s" }}>
          <div className="footer-logo-row">
            <img
              src={haniooDutchLogo}
              alt="Hanioo Dutch"
              className="footer-logo-dutch"
            />
          </div>
          <p>{t("footer.about")}</p>
          <div className="social">
            {socials.map((s) => (
              <a
                href={s.href}
                key={s.label}
                aria-label={s.label}
                title={s.label}
                className={s.className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col footer-col-animated" style={{ "--fdelay": "0.05s" }}>
          <h4>
            <span className="footer-heading-icon" aria-hidden="true">
              <FaLink />
            </span>
            {t("footer.quickLinks")}
          </h4>
          <ul className="footer-quicklinks">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-animated" style={{ "--fdelay": "0.15s" }}>
          <h4>
            <span className="footer-heading-icon" aria-hidden="true">
              <FaBriefcase />
            </span>
            {t("footer.ourServices")}
          </h4>
          <ul className="footer-services">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link to={`/service/${link.slug}`}>
                  <span
                    className="footer-service-icon"
                    style={{ background: link.color }}
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-animated" style={{ "--fdelay": "0.25s" }}>
          <h4>
            <span className="footer-heading-icon" aria-hidden="true">
              <FaHeadset />
            </span>
            {t("footer.getInTouch")}
          </h4>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-icon"><FaGlobe /></span>
              <span>{t("footer.globalAvailability")}</span>
            </li>
            <li>
              <span className="footer-contact-icon"><FaPhoneAlt /></span>
              <span>+91 729 900 5577</span>
            </li>
            <li>
              <span className="footer-contact-icon"><FaEnvelope /></span>
              <span>salesteam@honeytranslation.com</span>
            </li>
          </ul>

          <div className="footer-enrolled">
            <div className="footer-avatars">
              {enrolledAvatars.map((AvatarIcon, i) => (
                <span
                  className="footer-avatar"
                  key={i}
                  style={{ zIndex: enrolledAvatars.length - i }}
                >
                  <AvatarIcon />
                </span>
              ))}
            </div>
            <span className="footer-enrolled-text">
              <strong>1000+</strong> {t("footer.enrolledText")}
            </span>
          </div>
        </div>
      </div>

      <div className="section-inner footer-bottom-row">
        <hr />
        <div className="footer-bottom">
          <p>
           {new Date().getFullYear()} {t("footer.rightsReserved")}
          </p>
          <div className="footer-legal">
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")}>{t("footer.privacyPolicy")}</a>
            <span aria-hidden="true">•</span>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "#contact")}>{t("footer.termsOfService")}</a>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
