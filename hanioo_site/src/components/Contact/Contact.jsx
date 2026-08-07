import { useState } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { FaGlobe, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import { submitToZohoCrm } from "../../utils/zohoCrm";
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    setRecaptchaError(false);

    setStatus("sending");

    const raw = Object.fromEntries(new FormData(e.target));

    try {
      const res = await submitToZohoCrm({
        name: raw.name || "",
        email: raw.email || "",
        phone: raw.subject_line || raw.phone || "",
        city: raw.city || "Netherlands",
        message: raw.message || "",
        subject: "New Contact Form Submission — Hanioo",
        recaptchaToken: recaptchaToken,
      });

      if (res.success !== false) {
        setStatus("sent");
        e.target.reset();
        setRecaptchaToken("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <motion.div
          className="contact-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.lead")}</p>
        </motion.div>

        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="info-box">
              <FaGlobe />
              <div>
                <h3>{t("contact.availabilityLabel")}</h3>
                <p>{t("contact.availabilityValue")}</p>
              </div>
            </div>

            <div className="info-box">
              <FaMapMarkerAlt />
              <div>
                <h3>{t("contact.addressLabel")}</h3>
                <p>{t("contact.addressValue")}</p>
              </div>
            </div>

            <div className="info-box">
              <FaPhoneAlt />
              <div>
                <h3>{t("contact.phoneLabel")}</h3>
                <p>+91 729 900 5577</p>
              </div>
            </div>

            <div className="info-box">
              <FaEnvelope />
              <div>
                <h3>{t("contact.emailLabel")}</h3>
                <p>support@hanioo.com</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
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

            <input type="text" name="name" placeholder={t("contact.formName")} required />
            <input type="email" name="email" placeholder={t("contact.formEmail")} required />
            <input type="text" name="subject_line" placeholder={t("contact.formPhone")} />
            <textarea name="message" rows="6" placeholder={t("contact.formMessage")} required />

            <div style={{ marginBottom: "15px" }}>
              <ReCAPTCHA
                sitekey="6Lfo0nktAAAAAM1A-d0ghI3GnnS1U0O94NqqK9xZ"
                onChange={(token) => setRecaptchaToken(token)}
              />
              {recaptchaError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Please verify that you are not a robot.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
            >
              {status === "sending"
                ? t("contact.sending")
                : status === "sent"
                  ? t("contact.sent")
                  : t("contact.send")}
            </button>

            {status === "sent" && (
              <p className="form-success" role="status">
                {t("contact.successMsg")}
              </p>
            )}
            {status === "error" && (
              <p className="form-error" role="alert">
                {t("contact.errorMsg")}
              </p>
            )}
          </motion.form>
        </div>

        <motion.div
          className="contact-map"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <iframe
            title="Hanioo location — Netherlands"
            src="https://www.google.com/maps?q=Amsterdam,Netherlands&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
