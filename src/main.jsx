import { useState } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import LandingPage from "./LandingPage.jsx";
import App from "./App.jsx";

inject();

function Root() {
  const [entered, setEntered] = useState(false);
  const [startLang, setStartLang] = useState("sv");

  const handleEnter = (lang) => {
    setStartLang(lang);
    setEntered(true);
  };

  if (!entered) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return <App initialLang={startLang} />;
}

createRoot(document.getElementById("root")).render(<Root />);