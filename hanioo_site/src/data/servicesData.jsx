import {
  FaBriefcase,
  FaGlobe,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaComments,
  FaClock,
  FaHandshake,
  FaChartLine,
  FaGlobeAmericas,
  FaUsers,
  FaBroadcastTower,
  FaHeadset,
  FaLanguage,
  FaMapMarkedAlt,
  FaSchool,
  FaHandsHelping,
  FaBolt,
  FaLock,
  FaUserSecret,
  FaFileContract as FaFileContract2,
  FaCalendarCheck,
  FaSuitcaseRolling,
  FaRoute,
  FaHotel,
  FaFileUpload,
  FaGraduationCap,
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaFileAlt,
  FaPen,
  FaCheckDouble,
  FaExchangeAlt,
  FaAlignLeft,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";

/**
 * Central data source for every service card on the homepage
 * AND every dedicated "Learn more" detail page.
 * Adding a new service only requires adding one object here —
 * the card grid and the routing both pick it up automatically.
 */
export const services = [
  // ─── Language Training Service (NEW) ───────────────────────
  {
    slug: "language-training",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    icon: <FaGraduationCap />,
    color: "#e74c6f",
    title: "Language Training",
    tagline: "Master languages. Unlock opportunities.",
    desc: "Structured, expert-led language coaching that helps you master new languages faster — from everyday conversation to full business fluency, guided by certified trainers.",
    intro:
      "Learning a new language is one of the most powerful investments you can make — personally, professionally, and culturally. Hanioo's Language Training service connects learners of all levels with certified language coaches who design personalised curricula, set achievable milestones, and guide every session with the precision of a professional educator and the warmth of a native speaker.",
    body:
      "Whether you're preparing for an international relocation, upskilling for a global role, building a multilingual team, or simply pursuing fluency as a personal goal, Hanioo matches you with a trainer fluent in your target language and experienced in your context. Sessions are available one-to-one or in small groups, online or in person, with trainers who teach through real conversations, situational role-play, and structured exercises — not rote memorisation. Corporate clients receive bespoke team programmes with progress dashboards and completion certificates, while individual learners track weekly milestones through the Hanioo app. Every trainer on the platform is vetted, certified, and rated by learners before you book.",
    features: [
      {
        icon: <FaCertificate />,
        title: "Certified Trainers",
        text: "Every language coach is background-checked, credentials-verified, and rated by real learners before going live on Hanioo.",
      },
      {
        icon: <FaChalkboardTeacher />,
        title: "Personalised Curriculum",
        text: "Sessions are designed around your goals — travel, business, academic, or everyday fluency — not a one-size-fits-all syllabus.",
      },
      {
        icon: <FaLayerGroup />,
        title: "All Levels Welcome",
        text: "From absolute beginner to advanced conversational polish — trainers adapt pace and content to exactly where you are.",
      },
      {
        icon: <FaUsers />,
        title: "1:1 & Group Sessions",
        text: "Individual deep-dive sessions or structured small-group cohorts for teams and corporate language programmes.",
      },
      {
        icon: <FaChartLine />,
        title: "Progress Tracking",
        text: "Milestone-based progress reports and weekly goals visible in the app, keeping learners and managers aligned.",
      },
      {
        icon: <FaGlobe />,
        title: "100+ Languages Available",
        text: "Train in any of Hanioo's supported languages — from widely spoken global languages to regional and specialised dialects.",
      },
    ],
    useCases: [
      "Professionals preparing for international assignments or global roles",
      "Corporate teams building multilingual communication capabilities",
      "Students and academics needing academic or research-level fluency",
      "Individuals relocating to a new country or cultural environment",
      "Businesses onboarding international staff or clients",
      "Anyone pursuing personal language goals at their own pace",
    ],
  },

  // ─── Translation Service (NEW) ─────────────────────────────
  {
    slug: "translation",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    icon: <FaFileAlt />,
    color: "#1abc9c",
    title: "Translation Service",
    tagline: "Your words, perfectly translated.",
    desc: "Certified human translators bring precision and authenticity to every document, retaining its exact meaning, tone, and context across languages.",
    intro:
      "Machine translation can handle words. Human translation handles meaning. Hanioo's Translation Service connects you with certified translators who understand the cultural weight, industry-specific vocabulary, and contextual nuance behind every sentence — producing translations that read as naturally as the original, whether the document is a legal contract, a patient consent form, a product brochure, or a corporate website.",
    body:
      "Upload your document or share your content directly through the Hanioo platform. Choose your source and target languages, specify your domain (legal, medical, technical, marketing, or general), and receive a transparent quote with a delivery timeline before any work begins. Every translation goes through a two-stage process: first translated by a specialist in your domain, then reviewed by a second linguist for accuracy, tone, and cultural consistency. Certified translations requiring an official seal or statement of accuracy — for visa applications, court submissions, or academic credentials — are also available on request. Completed documents are delivered securely through the platform, with revision requests handled free of charge within 7 days of delivery.",
    features: [
      {
        icon: <FaPen />,
        title: "Expert Human Translators",
        text: "Domain-specialist translators — not algorithms — ensure every word carries the right meaning, tone, and cultural context.",
      },
      {
        icon: <FaCheckDouble />,
        title: "Two-Stage Quality Review",
        text: "Every translation is reviewed by a second linguist before delivery, catching errors in accuracy, fluency, and style.",
      },
      {
        icon: <FaExchangeAlt />,
        title: "100+ Language Pairs",
        text: "Translate between any combination of Hanioo's supported languages — bidirectional, with the same quality guarantee.",
      },
      {
        icon: <FaAlignLeft />,
        title: "All Document Types",
        text: "Legal contracts, medical records, technical manuals, websites, certificates, marketing copy, and more.",
      },
      {
        icon: <FaCertificate />,
        title: "Certified Translations",
        text: "Officially certified translations with seal and declaration of accuracy — accepted for visa, legal, and academic submissions.",
      },
      {
        icon: <FaClipboardList />,
        title: "Transparent Quoting",
        text: "Upfront quotes with word count, domain, and delivery timeline — no hidden fees, no surprises on delivery.",
      },
    ],
    useCases: [
      "Legal contracts, agreements, and court documents",
      "Medical records, clinical trial documents, and patient materials",
      "Visa applications, immigration forms, and academic certificates",
      "Corporate websites, product listings, and marketing campaigns",
      "Technical manuals, user guides, and software localisation",
      "Books, academic papers, and editorial content",
    ],
  },

  // ─── Existing services ─────────────────────────────────────
  {
    slug: "offline-meeting-travel",
    image:
      "https://images.unsplash.com/photo-1509694276680-cfc1a363bc5d?auto=format&fit=crop&w=1400&q=80",
    icon: <FaSuitcaseRolling />,
    color: "#d6b25e",
    title: "Offline Meetings & Travel Booking",
    tagline: "In-person interpretation, fully organized",
    desc: "Seamless in-person interpretation for meetings and travel, with transparent distance-based pricing and full logistics support handled end-to-end.",
    intro:
      "Some conversations need to happen in the room. For in-person meetings, Hanioo lets you choose exactly who handles travel and accommodation — yourself, or Hanioo's admin team — and calculates every cost upfront, so there are never any surprises on the day of the event.",
    body:
      "When Hanioo manages logistics, travel cost is calculated automatically from the round-trip distance to your meeting location, the number of days the interpreter is required, and the city involved. Accommodation is only charged when the event falls outside the interpreter's home city, and last-minute bookings made within 48 hours carry a clearly disclosed rush surcharge. If you'd rather arrange travel and stay yourself, you can simply upload the relevant tickets or documents along with a note, shared directly with the admin and your interpreter.",
    features: [
      {
        icon: <FaRoute />,
        title: "Distance-based travel pricing",
        text: "Fair, tiered per-kilometer travel charges calculated automatically for the round trip.",
      },
      {
        icon: <FaHotel />,
        title: "Accommodation, only when needed",
        text: "No accommodation charge for same-city meetings — only for out-of-city events.",
      },
      {
        icon: <FaCalendarCheck />,
        title: "Flexible responsibility",
        text: "Choose whether you or Hanioo's admin handles travel and stay arrangements.",
      },
      {
        icon: <FaFileUpload />,
        title: "Simple document sharing",
        text: "Upload tickets or receipts with a comment, visible to the admin and interpreter.",
      },
    ],
    useCases: [
      "In-person business meetings and site visits",
      "Offline legal proceedings and notarizations",
      "On-site medical appointments and home visits",
      "Multi-day events requiring an interpreter to travel with you",
    ],
  },
  {
    slug: "business-interpretation",
    image:
      "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1400&q=80",
    icon: <FaBriefcase />,
    color: "#2f80ed",
    title: "Business Interpretation",
    tagline: "Global deals, spoken fluently",
    desc: "Confident, industry-fluent interpretation for boardrooms, negotiations, and client calls — helping your business speak every language of global trade.",
    intro:
      "Closing a cross-border deal takes more than translating words — it takes an interpreter who understands tone, industry vocabulary, and negotiation nuance. Hanioo's business interpreters help teams present with confidence and understand every counter-offer clearly, in boardrooms and on video calls alike.",
    body:
      "Search interpreters by location, price, and language, review ratings from previous engagements, and try a quick trial call to check the fit before committing. Whether you're negotiating a supply contract, onboarding an international client, or running a multilingual all-hands, book online for a virtual session or in person with travel handled either by you or by Hanioo's admin team.",
    features: [
      {
        icon: <FaHandshake />,
        title: "Negotiation-ready",
        text: "Interpreters trained to preserve tone and intent during high-stakes discussions.",
      },
      {
        icon: <FaChartLine />,
        title: "Industry vocabulary",
        text: "Fluent across finance, manufacturing, tech, retail, and professional services.",
      },
      {
        icon: <FaGlobeAmericas />,
        title: "Global reach",
        text: "Support for boardrooms, client calls, and international teams anywhere.",
      },
      {
        icon: <FaUsers />,
        title: "Team & 1:1 sessions",
        text: "Scales from one-on-one client calls to full multilingual meetings.",
      },
    ],
    useCases: [
      "Contract negotiations and vendor discussions",
      "International client onboarding calls",
      "Multilingual board meetings and all-hands",
      "Cross-border partnership and M&A discussions",
    ],
  },
  {
    slug: "conference-interpretation",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=80",
    icon: <FaMicrophoneAlt />,
    color: "#5b4fe0",
    title: "Conference Interpretation",
    tagline: "One stage, every language, live",
    desc: "Flawless simultaneous and consecutive interpretation for summits and international events, keeping every attendee perfectly in sync, live.",
    intro:
      "Large events demand flawless, real-time delivery. Hanioo provides both simultaneous and consecutive interpretation for international conferences, summits, panels, and product launches — so every attendee follows along in their own language, without missing a beat.",
    body:
      "Interpreters list their exact mode of work — simultaneous or consecutive, audio or video, one-to-one or crowd capacity — so you can match the right professional to your event format before you book. Multi-day engagements are booked and confirmed through the same secure calendar-based flow used across Hanioo, with all completed, ongoing, and upcoming sessions visible in one place.",
    features: [
      {
        icon: <FaBroadcastTower />,
        title: "Simultaneous delivery",
        text: "Real-time interpretation streamed live alongside your event audio.",
      },
      {
        icon: <FaHeadset />,
        title: "Multi-channel support",
        text: "Multiple languages delivered in parallel for large, diverse audiences.",
      },
      {
        icon: <FaMicrophoneAlt />,
        title: "Stage & panel ready",
        text: "Experienced with keynotes, panels, Q&A, and breakout sessions.",
      },
      {
        icon: <FaLanguage />,
        title: "Seamless integration",
        text: "Works with your existing AV, streaming, and event-platform setup.",
      },
    ],
    useCases: [
      "International conferences and summits",
      "Product launches and press events",
      "Multilingual panels and keynote sessions",
      "Hybrid and fully virtual global events",
    ],
  },
  {
    slug: "world-languages",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
    icon: <FaGlobe />,
    color: "#27ae60",
    title: "100+ World Languages",
    tagline: "Borderless conversation, everywhere",
    desc: "From Tamil and Hindi to Mandarin and Swahili — access 100+ languages instantly, filtered by fluency and proficiency to match your exact need.",
    intro:
      "Language should never be the reason a conversation doesn't happen. Hanioo's interpreter network spans more than 100 languages and dialects — from widely spoken languages to regional and indigenous dialects — so you can reach virtually anyone, anywhere, in the language they're most comfortable in.",
    body:
      "Every interpreter's profile lists each language they speak along with a proficiency level — Read/Write or Both — and a fluency rating from Basic to Native Speaker. These same details power Hanioo's filters, so you can search precisely for the exact language and fluency level your conversation needs, whether it's a common business language or a rarer regional dialect.",
    features: [
      {
        icon: <FaGlobe />,
        title: "100+ languages",
        text: "From Tamil and Hindi to Mandarin, Arabic, French, and Swahili.",
      },
      {
        icon: <FaMapMarkedAlt />,
        title: "Fluency-level filtering",
        text: "Search by proficiency, from Basic and Intermediate to Native Speaker.",
      },
      {
        icon: <FaUsers />,
        title: "Community & rare languages",
        text: "Access to less-common dialects with advance scheduling.",
      },
      {
        icon: <FaBolt />,
        title: "Instant common-language access",
        text: "Widely spoken languages available on demand, day or night.",
      },
    ],
    useCases: [
      "Multinational teams and global customer support",
      "Community outreach across diverse neighborhoods",
      "International travel and relocation support",
      "Cross-cultural events and diaspora communities",
    ],
  },
  {
    slug: "community-interpretation",
    image:
      "https://images.unsplash.com/photo-1529209076408-5a115ec9f1c6?auto=format&fit=crop&w=1400&q=80",
    icon: <FaComments />,
    color: "#e67e22",
    title: "Community Interpretation",
    tagline: "Essential services, understood by everyone",
    desc: "Warm, patient interpreters supporting schools, NGOs, and social services — because essential care should never be lost in translation.",
    intro:
      "Access to education, social services, and public support shouldn't depend on fluency in the majority language. Hanioo partners with schools, NGOs, and local government agencies to provide on-demand interpreters, so every family can access the essential services they need.",
    body:
      "From parent-teacher conferences to social worker visits and public benefits enrollment, community interpreters are trained to communicate with warmth and patience, and every session ends with a two-way review — customers rate interpreters, and interpreters can rate customers — helping Hanioo keep quality high across every community it serves.",
    features: [
      {
        icon: <FaSchool />,
        title: "Education support",
        text: "Parent-teacher conferences, IEP meetings, and school enrollment.",
      },
      {
        icon: <FaHandsHelping />,
        title: "Social services access",
        text: "Support for case workers, housing services, and benefits enrollment.",
      },
      {
        icon: <FaComments />,
        title: "Warm, patient delivery",
        text: "Interpreters trained for sensitive, community-facing conversations.",
      },
      {
        icon: <FaClock />,
        title: "On-demand availability",
        text: "Fast access for NGOs, clinics, and local government agencies.",
      },
    ],
    useCases: [
      "Parent-teacher conferences and school meetings",
      "Social worker and case-manager visits",
      "Public benefits and housing service enrollment",
      "NGO outreach and community programs",
    ],
  },
  {
    slug: "secure-private",
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1400&q=80",
    icon: <FaShieldAlt />,
    color: "#8e44ad",
    title: "Secure & Private",
    tagline: "Every conversation, protected",
    desc: "Every conversation protected — KYC-verified interpreters, NDA-backed confidentiality, and secure payments before a single word is spoken.",
    intro:
      "Trust is the foundation of every interpreted conversation. Hanioo verifies every interpreter's identity during onboarding, requires a signed confidentiality agreement before they can accept bookings, and protects every customer with secure, upfront payment and clear cancellation policies.",
    body:
      "Interpreters complete document-based identity verification and sign a non-disclosure agreement before their profile goes live. Customers verify their own identity — individuals via Aadhaar, companies via business documents — before booking. Payments are collected securely in advance, invoices are generated automatically, and if plans change, Hanioo's cancellation policy sets out clearly how much of your payment is refunded and when.",
    features: [
      {
        icon: <FaLock />,
        title: "Secure, upfront payments",
        text: "Every booking is confirmed with protected payment and an instant invoice.",
      },
      {
        icon: <FaFileContract2 />,
        title: "Identity-verified users",
        text: "Interpreters and customers both complete identity verification before booking.",
      },
      {
        icon: <FaUserSecret />,
        title: "NDA-backed confidentiality",
        text: "All interpreters sign a non-disclosure agreement before taking bookings.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Clear cancellation policy",
        text: "Transparent, time-based refund rules if a booking needs to change.",
      },
    ],
    useCases: [
      "Confidential medical and mental-health consultations",
      "Sensitive legal and immigration proceedings",
      "Private business negotiations",
      "Personal and family conversations",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
