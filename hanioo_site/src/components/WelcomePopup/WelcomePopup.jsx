import { useEffect, useState } from "react";
import "./WelcomePopup.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import haniooDutchLogo from "../../assets/images/hanioo-dutch-logo-dark.png";
import { useLanguage } from "../../i18n/LanguageContext";
import { submitToZohoCrm } from "../../utils/zohoCrm";
import ReCAPTCHA from "react-google-recaptcha";

function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Also open this same popup when a navbar link (Home, Services,
  // How It Works, About, Contact) is clicked.
  useEffect(() => {
    const openPopup = () => setVisible(true);
    window.addEventListener("show-welcome-popup", openPopup);
    return () => window.removeEventListener("show-welcome-popup", openPopup);
  }, []);

  if (!visible) return null;

  const close = () => setVisible(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("welcomePopup.errors.nameRequired");
    if (!form.email.trim()) {
      newErrors.email = t("welcomePopup.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("welcomePopup.errors.emailInvalid");
    }
    if (!form.message.trim()) newErrors.message = t("welcomePopup.errors.messageRequired");
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (submitError) setSubmitError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    setRecaptchaError(false);

    setLoading(true);
    setSubmitError(false);

    try {
      const res = await submitToZohoCrm({
        name: form.name,
        email: form.email,
        message: form.message,
        subject: "New Popup Enquiry — Hanioo",
        recaptchaToken: recaptchaToken,
      });
      if (res.success !== false) {
        setSubmitted(true);
        setRecaptchaToken("");
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="wp-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Contact us"
    >
      <div className="wp-box" onClick={(e) => e.stopPropagation()}>
        <button className="wp-close" onClick={close} aria-label="Close popup">
          <FaTimes />
        </button>

        {submitted ? (
          <div className="wp-success">
            <div className="wp-success-icon">
              <FaPaperPlane />
            </div>
            <h2>{t("welcomePopup.successTitle")}</h2>
            <p>{t("welcomePopup.successMsg")}</p>
            <button className="wp-btn" onClick={close}>
              {t("welcomePopup.close")}
            </button>
          </div>
        ) : (
          <>
            <div className="wp-header">
              <img src={haniooDutchLogo} alt="Hanioo Dutch" className="wp-logo" />
              <h2>{t("welcomePopup.title")}</h2>
              <p className="wp-subtitle">{t("welcomePopup.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Zoho CRM Required Hidden Fields */}
              <input type="hidden" name="xnQsjsdp" value="b8b65411a1b1420942e1e01f2ee2930f1d636ed6d6511254b933103b1f8971bf" />
              <input type="hidden" name="zc_gad" id="zc_gad" value="" />
              <input type="hidden" name="xmIwtLD" value="4591badcb28859d64ec20ccf1a28080bd58517368fd0629a30ed9ec798a17f8242d07687955bab85cbfd4cd2c3f617c5" />
              <input type="hidden" name="actionType" value="TGVhZHM=" />
              <input type="hidden" name="returnURL" value="https://honeytranslations.com/thank-you" />
              <input type="hidden" name="Lead Source" value="Website" />
              <input type="hidden" name="LEADCF39" value="." />
              <input type="hidden" name="LEADCF29" value="." />
              <input type="hidden" name="aG9uZXlwb3Q" value="" />

              <div className="wp-field">
                <label htmlFor="wp-name">{t("welcomePopup.fullName")}</label>
                <input
                  id="wp-name"
                  name="name"
                  type="text"
                  placeholder={t("welcomePopup.fullNamePlaceholder")}
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "wp-input-error" : ""}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="wp-error">{errors.name}</span>
                )}
              </div>

              <div className="wp-field">
                <label htmlFor="wp-email">{t("welcomePopup.email")}</label>
                <input
                  id="wp-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "wp-input-error" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="wp-error">{errors.email}</span>
                )}
              </div>

              <div className="wp-field">
                <label htmlFor="wp-message">{t("welcomePopup.message")}</label>
                <textarea
                  id="wp-message"
                  name="message"
                  rows="4"
                  placeholder={t("welcomePopup.messagePlaceholder")}
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "wp-input-error" : ""}
                />
                {errors.message && (
                  <span className="wp-error">{errors.message}</span>
                )}
              </div>

              {submitError && (
                <p className="wp-submit-error" role="alert">
                  {t("welcomePopup.errorMsg")}
                </p>
              )}

              <div style={{ marginBottom: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ReCAPTCHA
                  sitekey="6Lfo0nktAAAAAM1A-d0ghI3GnnS1U0O94NqqK9xZ"
                  onChange={(token) => setRecaptchaToken(token)}
                />
                {recaptchaError && (
                  <span style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    Please verify that you are not a robot.
                  </span>
                )}
              </div>

              <button type="submit" className="wp-btn" disabled={loading}>
                {loading ? (
                  <span className="wp-spinner" aria-label="Sending…" />
                ) : (
                  <>
                    {t("welcomePopup.send")} <FaPaperPlane className="wp-btn-icon" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomePopup;