import { useState } from "react";
import "./popup.css";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

function Popup({ closePopup, title, subtitle }) {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const resolvedTitle = title ?? t("popup.joinTitle");
  const resolvedSubtitle = subtitle ?? t("popup.joinSubtitle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup-close"
          onClick={closePopup}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {submitted ? (
          <div className="popup-success">
            <h2>{t("popup.thankYou")}</h2>
            <p>{t("popup.thankYouMsg")}</p>
            <button className="popup-submit" onClick={closePopup}>
              {t("popup.close")}
            </button>
          </div>
        ) : (
          <>
            <h2>{resolvedTitle}</h2>
            <p className="popup-subtitle">{resolvedSubtitle}</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="popup-name">{t("popup.name")}</label>
              <input id="popup-name" type="text" placeholder={t("popup.namePlaceholder")} required />

              <label htmlFor="popup-email">{t("popup.email")}</label>
              <input id="popup-email" type="email" placeholder="you@example.com" required />

              <label htmlFor="popup-phone">{t("popup.phone")}</label>
              <input id="popup-phone" type="tel" placeholder={t("popup.phonePlaceholder")} required />

              <label htmlFor="popup-message">{t("popup.message")}</label>
              <textarea
                id="popup-message"
                rows="3"
                placeholder={t("popup.messagePlaceholder")}
              />

              <button type="submit" className="popup-submit">
                {t("popup.submit")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
