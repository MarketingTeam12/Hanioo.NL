import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import About from "./components/About/About";
import TrustedBy from "./components/TrustedBy/TrustedBy";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import WelcomePopup from "./components/WelcomePopup/WelcomePopup";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import FloatingSidebar from "./components/FloatingSidebar/FloatingSidebar";

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Hero />
      <Services />
      <HowItWorks />
      <About />
      <TrustedBy />
      <Contact />
      <WelcomePopup />
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <FloatingSidebar />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
