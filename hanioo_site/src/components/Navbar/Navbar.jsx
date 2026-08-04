import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FaBars,
  FaTimes,
  FaGooglePlay,
  FaApple,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import haniooDutchLogo from "../../assets/images/hanioo-dutch-logo.png";
import Popup from "../Popup/popup";
import InstallToast from "../InstallToast/InstallToast";
import { useLanguage } from "../../i18n/LanguageContext";
import { GBFlag, NLFlag } from "./Flags";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.honey.hanioo";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", Flag: GBFlag },
  { code: "nl", label: "Dutch", Flag: NLFlag },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [installStore, setInstallStore] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { language, setLanguage, t } = useLanguage();
  const langMenuRef = useRef(null);

  const links = [
    { label: t("navbar.links.home"), href: "#home" },
    { label: t("navbar.links.services"), href: "#services" },
    { label: t("navbar.links.howItWorks"), href: "#how-it-works" },
    { label: t("navbar.links.about"), href: "#about" },
    { label: t("navbar.links.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the language dropdown when clicking anywhere outside it.
  useEffect(() => {
    const onClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // On the homepage, anchor links scroll natively via the browser.
  // On any other route (e.g. a service detail page), navigate home first,
  // then smoothly scroll to the target section.
  const handleAnchorClick = (e, href) => {
    setOpen(false);
    if (!isHome) {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        // Show the same welcome popup (as on page refresh) once we're
        // back on the homepage where it lives.
        window.dispatchEvent(new CustomEvent("show-welcome-popup"));
      }, 120);
    } else {
      // Already on the homepage: show the same welcome popup right away.
      window.dispatchEvent(new CustomEvent("show-welcome-popup"));
    }
  };

  const handleStoreClick = (store, url) => {
    setOpen(false);
    setInstallStore(store);
    // Single, reliable way to open exactly one new tab. (Previously this used
    // window.open(url, "_blank", "noopener,noreferrer") and checked its
    // return value to decide whether to fall back to window.location.href —
    // but browsers return null from window.open whenever "noopener" is used,
    // even though the tab opened fine. That made the fallback fire on every
    // click, navigating the current tab too and opening 2 pages instead of 1.)
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    setTimeout(() => setInstallStore(null), 2600);
  };

  const currentLang =
    LANGUAGE_OPTIONS.find((l) => l.code === language) ?? LANGUAGE_OPTIONS[0];

  const LanguageSwitcher = ({ className = "" }) => (
    <div className={`lang-switcher ${className}`} ref={langMenuRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setLangMenuOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={langMenuOpen}
      >
        <span className="lang-flag" aria-hidden="true">
          <currentLang.Flag />
        </span>{" "}
        Languages <FaChevronDown className="lang-caret" />
      </button>
      {langMenuOpen && (
        <ul className="lang-menu" role="listbox">
          {LANGUAGE_OPTIONS.map((opt) => (
            <li key={opt.code}>
              <button
                type="button"
                className={opt.code === language ? "active" : ""}
                onClick={() => {
                  setLanguage(opt.code);
                  setLangMenuOpen(false);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt.code === language}
              >
                <span className="lang-flag" aria-hidden="true">
                  <opt.Flag />
                </span>{" "}
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="tel:+917299005577" className="topbar-item">
              <FaPhoneAlt /> {t("topbar.call")} +91 72990 05577
            </a>
            <a href={`mailto:${t("topbar.email")}`} className="topbar-item">
              <FaEnvelope /> {t("topbar.email")}
            </a>
          </div>
          <div className="topbar-right">
            <span className="topbar-item">
              <FaClock /> {t("topbar.hours")}
            </span>
            <span className="topbar-item">
              <FaMapMarkerAlt /> {t("topbar.location")}
            </span>
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#home" className="logo" onClick={(e) => handleAnchorClick(e, "#home")}>
            <img src={haniooDutchLogo} alt="Hanioo Dutch" className="logo-img" />
          </a>

          <ul className={open ? "open" : ""}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}

            <li className="mobile-cta">
              <LanguageSwitcher className="mobile-lang" />
              <button
                className="store-btn"
                onClick={() => handleStoreClick("Google Play", PLAY_STORE_URL)}
              >
                <FaGooglePlay /> {t("navbar.playStore")}
              </button>
              <button
                className="store-btn"
                onClick={() => handleStoreClick("App Store", APP_STORE_URL)}
              >
                <FaApple /> {t("navbar.appStore")}
              </button>
            </li>
          </ul>

          <div className="navbar-actions desktop-only">
            <LanguageSwitcher />
            <button
              className="store-btn"
              onClick={() => handleStoreClick("Google Play", PLAY_STORE_URL)}
            >
              <FaGooglePlay /> {t("navbar.playStore")}
            </button>
            <button
              className="store-btn"
              onClick={() => handleStoreClick("App Store", APP_STORE_URL)}
            >
              <FaApple /> {t("navbar.appStore")}
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {showPopup && <Popup closePopup={() => setShowPopup(false)} />}
      {installStore && <InstallToast store={installStore} />}
    </>
  );
}

export default Navbar;
