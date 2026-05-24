import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllServices from "./components/AllServices";
import ProjectsPage from "./components/ProjectsPage";
import ServiceLanding from "./components/ServiceLanding";
import OwnerPage from "./components/OwnerPage";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/drywall-repair-phoenix" element={<ServiceLanding />} />
        <Route path="/ceiling-fan-installation-phoenix" element={<ServiceLanding />} />
        <Route path="/faucet-repair-phoenix" element={<ServiceLanding />} />
        <Route path="/owner" element={<OwnerPage />} />
      </Routes>
      <Footer />
    </>
  );
}

