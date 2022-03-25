import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Notifications from "./components/Notification/Notifications";
import Calls from "./components/Calls/Calls";
import Favorites from "./components/Favorites/Favorites";
import Settings from "./components/Settings/Settings";
import "./styles/index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/calls" element={<Calls />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);
