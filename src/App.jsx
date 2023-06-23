import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SignupPage2 from "./pages/SignupPage2";
import Confirmationemail from "./pages/Confirmationemail";
import WelcomePage from "./pages/WelcomePage";
import TiragePage from "./pages/TiragePage";
import AchatBilletPage from "./pages/AchatBilletPage";
import MethodPaiment from "./pages/MethodPaiment";
import PaimentPage from "./pages/PaimentPage";
import EtatPaiment from "./pages/EtatPaiment";
import ParticipationPage from "./pages/ParticipationPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup2" element={<SignupPage2 />} />
          <Route path="/confirmationemail" element={<Confirmationemail />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/TiragePage" element={<TiragePage />} />
          <Route path="/AchatBilletPage" element={<AchatBilletPage />} />
          <Route path="/MethodPaiment" element={<MethodPaiment />} />
          <Route path="/PaimentPage" element={<PaimentPage />} />
          <Route path="/EtatPaiment" element={<EtatPaiment />} />
          <Route path="/ParticipationPage" element={<ParticipationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
