
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LocalMultiplayer from "./pages/LocalMultiplayer";
import OnlineMultiplayer from "./pages/OnlineMultiplayer";
import HumanVsAI from "./pages/HumanVsAI";
import Navbar from "./components/Navbar";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/local" element={<LocalMultiplayer />} />
      <Route path="/online" element={<OnlineMultiplayer />} />
      <Route path="/ai" element={<HumanVsAI />} />
    </Routes>
  </Router>
);

export default App;