import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Speakers from "./components/Speakers";
import Schedules from "./components/Schedules";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";

function Layout() {
  const location = useLocation();

  // Hide header on dashboards
  const hideHeaderRoutes = ["/admin", "/student"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="font-sans bg-white text-gray-900">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Speakers />
              <Schedules />
                <section id="login"></section>
              <LoginPage />
              <Gallery />
              <Sponsors />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
