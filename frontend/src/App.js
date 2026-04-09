import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Readingnews from "./pages/Readingnews";
import Writingnews from "./pages/Writingnews";
import Signup from "./pages/Signup";
import WriterDashboard from "./pages/WriterDashboard";


function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Readingnews" element={< Readingnews/>} />
        <Route path="/Writingnews" element={< Writingnews/>} />
        <Route path="/Signup" element={< Signup/>} />
        <Route path="/WriterDashboard" element={< WriterDashboard/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
