import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Notifications from "./components/Notification/Notifications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
    </Routes>
  );
}
