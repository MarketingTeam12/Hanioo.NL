import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaPhone, FaRobot, FaTimes, FaPaperPlane, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./FloatingSidebar.css";
import { useLanguage } from "../../i18n/LanguageContext";

/* ─────────────────────────────────────────
   AI Chat Bot
───────────────────────────────────────── */
const BOT_REPLIES = {
  default:
    "Thank you for reaching out! Our team will get back to you shortly. For urgent help, WhatsApp us or call directly.",
  interpretation:
    "Hanioo offers professional interpretation in 100+ languages — for business, medical, legal, conference, and community needs. Would you like to know more?",
  translation:
    "Our certified human translators handle documents, contracts, websites, and more in 100+ language pairs — with a two-stage quality review. Want a quote?",
  training:
    "Our Language Training service pairs you with certified coaches for 1:1 or group sessions at any level. Want to learn about programme options?",
  price:
    "Pricing varies by service, language, and duration. Contact us via WhatsApp or the contact form for a personalised quote!",
  hello: "Hello! Great to hear from you. How can Hanioo assist you today?",
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (/hello|hi|hey|vanakkam/.test(m)) return BOT_REPLIES.hello;
  if (/interpret/.test(m)) return BOT_REPLIES.interpretation;
  if (/translat/.test(m)) return BOT_REPLIES.translation;
  if (/train|learn|cours|class/.test(m)) return BOT_REPLIES.training;
  if (/price|cost|fee|rate|charge|quot/.test(m)) return BOT_REPLIES.price;
  return BOT_REPLIES.default;
}

function AIChatPanel({ onClose }) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { from: "bot", text: t("floatingSidebar.botIntro") },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: getBotReply(text) },
      ]);
    }, 1000);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="fb-chat-panel">
      {/* Header */}
      <div className="fb-chat-header">
        <div className="fb-chat-avatar">
          <FaRobot />
        </div>
        <div className="fb-chat-header-info">
          <span className="fb-chat-title">{t("floatingSidebar.botName")}</span>
          <span className="fb-chat-status">
            <span className="fb-chat-dot" /> {t("floatingSidebar.online")}
          </span>
        </div>
        <button className="fb-chat-close" onClick={onClose} aria-label="Close chat">
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="fb-chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`fb-bubble fb-bubble--${m.from}`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="fb-bubble fb-bubble--bot fb-typing">
            <span /><span /><span />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="fb-chat-footer">
        <input
          className="fb-chat-input"
          type="text"
          placeholder={t("floatingSidebar.chatPlaceholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="fb-chat-send" onClick={send} aria-label="Send">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component — Bottom-Right Buttons
───────────────────────────────────────── */
export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { t } = useLanguage();

  // Track scroll position to decide arrow direction
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      // within 60px of the bottom counts as "at bottom"
      const atBottom = scrollY + viewportHeight >= fullHeight - 60;
      setIsAtBottom(atBottom);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function handleScrollToggle() {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  // 🔧 Replace with your real numbers before going live
  const WHATSAPP_NUMBER = "919999999999"; // country code + number, no +
  const PHONE_NUMBER = "+919999999999";

  const buttons = [
    {
      id: "whatsapp",
      icon: <FaWhatsapp />,
      label: t("floatingSidebar.whatsapp"),
      bg: "linear-gradient(135deg, #25d366, #128c7e)",
      pulse: true,
      action: () =>
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener"),
    },
    {
      id: "phone",
      icon: <FaPhone />,
      label: t("floatingSidebar.callUs"),
      bg: "linear-gradient(135deg, #3d8bd4, #2a5f96)",
      pulse: false,
      action: () => window.open(`tel:${PHONE_NUMBER}`),
    },
    // {
    //   id: "chat",
    //   icon: <FaRobot />,
    //   label: "AI Chat",
    //   bg: "linear-gradient(135deg, #8e44ad, #5b2c6f)",
    //   pulse: false,
    //   action: () => setChatOpen((o) => !o),
    // },
  ];

  return (
    <>
      {/* ── 3 Bottom-Right Buttons ── */}
      <div className="fb-stack" role="complementary" aria-label="Quick contact">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            className={`fb-btn${btn.pulse ? " fb-btn--pulse" : ""}${
              btn.id === "chat" && chatOpen ? " fb-btn--active" : ""
            }`}
            style={{ background: btn.bg }}
            onClick={btn.action}
            aria-label={btn.label}
          >
            {/* Tooltip on the left */}
            <span className="fb-tooltip">{btn.label}</span>
            {/* Icon */}
            <span className="fb-icon">{btn.icon}</span>
          </button>
        ))}

        {/* ── Scroll Up / Scroll Down Toggle ── */}
        <button
          className="fb-btn fb-btn--scroll"
          onClick={handleScrollToggle}
          aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          <span className="fb-tooltip">
            {isAtBottom ? "Scroll to top" : "Scroll to bottom"}
          </span>
          <span className="fb-icon">
            {isAtBottom ? <FaArrowUp /> : <FaArrowDown />}
          </span>
        </button>
      </div>

      {/* ── AI Chat Panel ── */}
      {/* {chatOpen && <AIChatPanel onClose={() => setChatOpen(false)} />} */}
    </>
  );
}
