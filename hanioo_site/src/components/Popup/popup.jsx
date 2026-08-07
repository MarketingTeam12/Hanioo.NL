import { useState } from "react";
import "./popup.css";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import { submitToZohoCrm } from "../../utils/zohoCrm";

function Popup({ closePopup, title, subtitle }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const resolvedTitle = title ?? t("popup.joinTitle");
  const resolvedSubtitle = subtitle ?? t("popup.joinSubtitle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      message: formData.get("message") || "",
      subject: resolvedTitle,
    };

    try {
      await submitToZohoCrm(data);
      setSubmitted(true);
    } catch (err) {
      console.error("Zoho submission error:", err);
      setSubmitted(true); // Still show thank you to user
    } finally {
      setLoading(false);
    }
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

              <label htmlFor="popup-name">{t("popup.name")}</label>
              <input id="popup-name" name="name" type="text" placeholder={t("popup.namePlaceholder")} required />

              <label htmlFor="popup-email">{t("popup.email")}</label>
              <input id="popup-email" name="email" type="email" placeholder="you@example.com" required />

              <label htmlFor="popup-phone">{t("popup.phone")}</label>
              <input id="popup-phone" name="phone" type="tel" placeholder={t("popup.phonePlaceholder")} required />

              <label htmlFor="popup-message">{t("popup.message")}</label>
              <textarea
                id="popup-message"
                name="message"
                rows="3"
                placeholder={t("popup.messagePlaceholder")}
              />

              <button type="submit" className="popup-submit" disabled={loading}>
                {loading ? t("contact.sending") : t("popup.submit")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
