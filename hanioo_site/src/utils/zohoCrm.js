/**
 * Utility to submit lead data directly to Zoho CRM WebToLead endpoint.
 * Action: https://crm.zoho.in/crm/WebToLeadForm
 */

const ZOHO_CRM_CONFIG = {
  action: "https://crm.zoho.in/crm/WebToLeadForm",
  xnQsjsdp: "25f25cfba323948707119560fed330d596f73dd7f694cfeb864ac96761850898",
  zc_gad: "",
  xmIwtLD: "192d0bafc0e7342ca7a3a45e10d4924451cf92c9df66d7d2a7d16aaf674a3d5563bcc9275a1b436b0b24a35a32996a30",
  actionType: "TGVhZHM=",
  returnURL: "https://hanioo.nl/thank-you",
  leadSource: "Website",
  leadcf39: ".",
  leadcf29: ".",
  honeypot: "",
  formId: "webform588346000042222006",
  formName: "WebToLeads588346000042222006",
};

/**
 * Submits lead data to Zoho CRM without leaving or reloading the current page.
 * @param {Object} payload
 * @param {string} payload.name - Visitor / Contact Name
 * @param {string} payload.email - Visitor Email
 * @param {string} [payload.phone] - Visitor Mobile / Phone
 * @param {string} [payload.city] - Visitor City (defaults to "Netherlands")
 * @param {string} [payload.message] - Message / Description
 * @param {string} [payload.subject] - Optional form subject
 * @param {string} [payload.recaptchaToken] - Google ReCAPTCHA v2 token
 */
export async function submitToZohoCrm({
  name = "",
  email = "",
  phone = "",
  city = "",
  message = "",
  subject = "",
  recaptchaToken = "",
}) {
  const cityName = city.trim() || "Netherlands";
  const fullName = name.trim() || "Website Lead";

  // Build complete description string to guarantee all metadata is captured in CRM notes
  const fullDescription = [
    `Form Source: ${subject || "Hanioo Website Form"}`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `City: ${cityName}`,
    `Submitted At: ${new Date().toLocaleString()}`,
    `Message:\n${message}`,
  ].join("\n");

  const fields = {
    xnQsjsdp: ZOHO_CRM_CONFIG.xnQsjsdp,
    zc_gad: ZOHO_CRM_CONFIG.zc_gad,
    xmIwtLD: ZOHO_CRM_CONFIG.xmIwtLD,
    actionType: ZOHO_CRM_CONFIG.actionType,
    returnURL: ZOHO_CRM_CONFIG.returnURL,
    "Lead Source": ZOHO_CRM_CONFIG.leadSource,
    LEADCF39: ZOHO_CRM_CONFIG.leadcf39,
    LEADCF29: ZOHO_CRM_CONFIG.leadcf29,
    aG9uZXlwb3Q: ZOHO_CRM_CONFIG.honeypot,
    "Last Name": fullName,
    Email: email,
    Mobile: phone,
    City: cityName,
    Description: fullDescription,
  };

  if (recaptchaToken) {
    fields["g-recaptcha-response"] = recaptchaToken;
  }

  return new Promise((resolve) => {
    try {
      // 1. Create hidden target iframe if it doesn't exist yet
      let iframe = document.getElementById("zoho_crm_hidden_iframe");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "zoho_crm_hidden_iframe";
        iframe.name = "zoho_crm_hidden_iframe";
        iframe.style.display = "none";
        iframe.style.width = "0px";
        iframe.style.height = "0px";
        iframe.style.border = "0px";
        document.body.appendChild(iframe);
      }

      // 2. Build temporary HTML form targeting the iframe with exact Zoho form ID & name
      const form = document.createElement("form");
      form.id = "webform588346000042117485";
      form.name = "WebToLeads588346000042117485";
      form.method = "POST";
      form.action = ZOHO_CRM_CONFIG.action;
      form.target = "zoho_crm_hidden_iframe";
      form.acceptCharset = "UTF-8";
      form.style.display = "none";

      for (const [key, val] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      }

      document.body.appendChild(form);

      // 3. Submit form via iframe
      form.submit();

      // Clean up form after submit
      setTimeout(() => {
        if (form.parentNode) {
          form.parentNode.removeChild(form);
        }
        resolve({ success: true });
      }, 500);
    } catch (err) {
      console.error("Zoho CRM submission error:", err);
      resolve({ success: false, error: err });
    }
  });
}
