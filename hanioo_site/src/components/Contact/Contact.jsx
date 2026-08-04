import { useState } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { FaGlobe, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const ACCESS_KEY = "8850e143-5e61-447b-b94d-8938ee616fae";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
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
            {/* Web3Forms access key */}
            <input type="hidden" name="access_key" value={ACCESS_KEY} />
            {/* Optional: customise the email subject */}
            <input type="hidden" name="subject" value="New Contact Form Submission — Hanioo" />
            {/* Honeypot anti-spam */}
            <input type="checkbox" name="botcheck" style={{ display: "none" }} />

            <input type="text"  name="name"    placeholder={t("contact.formName")}    required />
            <input type="email" name="email"   placeholder={t("contact.formEmail")}   required />
            <input type="text"  name="subject_line" placeholder={t("contact.formPhone")} />
            <textarea           name="message" rows="6" placeholder={t("contact.formMessage")} required />

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
