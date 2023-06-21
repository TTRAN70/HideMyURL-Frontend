import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Redirect from "./Redirect";
import Saved from "./pages/Saved";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
function App() {
  return (
    <div className="app">
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createaccount" element={<Create />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/:id" element={<Redirect />} />
            <Route exact path="/saved/:userID" element={<Saved />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
