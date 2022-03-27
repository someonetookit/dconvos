import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Notifications from "./components/Notification/Notifications";
import Calls from "./components/Calls/Calls";
import Favorites from "./components/Favorites/Favorites";
import Settings from "./components/Settings/Settings";

export default function App() {
  useEffect(() => {
    const acc = localStorage.getItem("fontSize");
    document.querySelector(":root").style.setProperty("--font-size", acc + "px");
  });
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/calls" element={<Calls />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
