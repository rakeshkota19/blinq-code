import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  return (
    <div className={`App ${showRequestForm | showSuccessPopup ? "OverlayEffect" : ""}`}>
      <Header />
      <HomePage
        requestForm={setShowRequestForm}
        showRequestForm={showRequestForm}
        showSuccessPopup={showSuccessPopup}
        setShowSuccessPopup={setShowSuccessPopup}
      />
      <Footer />
    </div>
  );
}

export default App;
