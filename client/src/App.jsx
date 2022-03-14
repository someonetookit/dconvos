import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Notifications from "./components/Notifications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/n" element={<Notifications/>}/>
    </Routes>
  );
}
