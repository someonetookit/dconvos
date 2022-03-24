import { Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Notifications from "./components/Notification/Notifications";
import Calls from "./components/Calls/Calls";
import Favorites from "./components/Favorites/Favorites";
import Settings from "./components/Settings/Settings";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/calls" element={<Calls/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
      <Route path="/settings" element={<Settings/>}/>

    </BrowserRouter>
  );
}
