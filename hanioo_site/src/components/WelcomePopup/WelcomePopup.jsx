// import { useEffect, useState } from "react";
// import "./WelcomePopup.css";
// import { FaTimes, FaPaperPlane } from "react-icons/fa";
// import haniooLogo from "../../assets/images/hanioo.png";
// import { useLanguage } from "../../i18n/LanguageContext";

// const ACCESS_KEY = "8850e143-5e61-447b-b94d-8938ee616fae";

// function WelcomePopup() {
//   const [visible, setVisible] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [submitError, setSubmitError] = useState(false);
//   const { t } = useLanguage();

//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(true), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Also open this same popup when a navbar link (Home, Services,
//   // How It Works, About, Contact) is clicked.
//   useEffect(() => {
//     const openPopup = () => setVisible(true);
//     window.addEventListener("show-welcome-popup", openPopup);
//     return () => window.removeEventListener("show-welcome-popup", openPopup);
//   }, []);

//   if (!visible) return null;

//   const close = () => setVisible(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = t("welcomePopup.errors.nameRequired");
//     if (!form.email.trim()) {
//       newErrors.email = t("welcomePopup.errors.emailRequired");
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = t("welcomePopup.errors.emailInvalid");
//     }
//     if (!form.message.trim()) newErrors.message = t("welcomePopup.errors.messageRequired");
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
//     if (submitError) setSubmitError(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     setSubmitError(false);

//     try {
//       const res = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           access_key: ACCESS_KEY,
//           subject: "New Popup Enquiry — Hanioo",
//           name: form.name,
//           email: form.email,
//           message: form.message,
//           botcheck: "",
//         }),
//       });
//       const json = await res.json();
//       if (json.success) {
//         setSubmitted(true);
//       } else {
//         setSubmitError(true);
//       }
//     } catch {
//       setSubmitError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="wp-overlay"
//       onClick={close}
//       role="dialog"
//       aria-modal="true"
//       aria-label="Contact us"
//     >
//       <div className="wp-box" onClick={(e) => e.stopPropagation()}>
//         <button className="wp-close" onClick={close} aria-label="Close popup">
//           <FaTimes />
//         </button>

//         {submitted ? (
//           <div className="wp-success">
//             <div className="wp-success-icon">
//               <FaPaperPlane />
//             </div>
//             <h2>{t("welcomePopup.successTitle")}</h2>
//             <p>{t("welcomePopup.successMsg")}</p>
//             <button className="wp-btn" onClick={close}>
//               {t("welcomePopup.close")}
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="wp-header">
//               <img src={haniooLogo} alt="Hanioo" className="wp-logo" />
//               <h2>{t("welcomePopup.title")}</h2>
//               <p className="wp-subtitle">{t("welcomePopup.subtitle")}</p>
//             </div>

//             <form onSubmit={handleSubmit} noValidate>
//               {/* Web3Forms hidden fields */}
//               <input type="hidden" name="access_key" value={ACCESS_KEY} />
//               <input
//                 type="hidden"
//                 name="subject"
//                 value="New Popup Enquiry — Hanioo"
//               />
//               {/* Honeypot anti-spam */}
//               <input
//                 type="checkbox"
//                 name="botcheck"
//                 style={{ display: "none" }}
//               />

//               <div className="wp-field">
//                 <label htmlFor="wp-name">{t("welcomePopup.fullName")}</label>
//                 <input
//                   id="wp-name"
//                   name="name"
//                   type="text"
//                   placeholder={t("welcomePopup.fullNamePlaceholder")}
//                   value={form.name}
//                   onChange={handleChange}
//                   className={errors.name ? "wp-input-error" : ""}
//                   autoComplete="name"
//                 />
//                 {errors.name && (
//                   <span className="wp-error">{errors.name}</span>
//                 )}
//               </div>

//               <div className="wp-field">
//                 <label htmlFor="wp-email">{t("welcomePopup.email")}</label>
//                 <input
//                   id="wp-email"
//                   name="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   className={errors.email ? "wp-input-error" : ""}
//                   autoComplete="email"
//                 />
//                 {errors.email && (
//                   <span className="wp-error">{errors.email}</span>
//                 )}
//               </div>

//               <div className="wp-field">
//                 <label htmlFor="wp-message">{t("welcomePopup.message")}</label>
//                 <textarea
//                   id="wp-message"
//                   name="message"
//                   rows="4"
//                   placeholder={t("welcomePopup.messagePlaceholder")}
//                   value={form.message}
//                   onChange={handleChange}
//                   className={errors.message ? "wp-input-error" : ""}
//                 />
//                 {errors.message && (
//                   <span className="wp-error">{errors.message}</span>
//                 )}
//               </div>

//               {submitError && (
//                 <p className="wp-submit-error" role="alert">
//                   {t("welcomePopup.errorMsg")}
//                 </p>
//               )}

//               <button type="submit" className="wp-btn" disabled={loading}>
//                 {loading ? (
//                   <span className="wp-spinner" aria-label="Sending…" />
//                 ) : (
//                   <>
//                     {t("welcomePopup.send")} <FaPaperPlane className="wp-btn-icon" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default WelcomePopup;






import { useEffect, useState } from "react";
import "./WelcomePopup.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import haniooDutchLogo from "../../assets/images/hanioo-dutch-logo-dark.png";
import { useLanguage } from "../../i18n/LanguageContext";

const ACCESS_KEY = "8850e143-5e61-447b-b94d-8938ee616fae";

function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
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

    setLoading(true);
    setSubmitError(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New Popup Enquiry — Hanioo",
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
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
              {/* Web3Forms hidden fields */}
              <input type="hidden" name="access_key" value={ACCESS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="New Popup Enquiry — Hanioo"
              />
              {/* Honeypot anti-spam */}
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
              />

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