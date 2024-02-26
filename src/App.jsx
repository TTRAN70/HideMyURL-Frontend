import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Redirect from "./Redirect";
import Saved from "./pages/Saved";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/createaccount", element: <Create /> },
    { path: "/home", element: <Home /> },
    { path: "/:id", element: <Redirect /> },
    { path: "/saved/:userID", element: <Saved /> },
  ];
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

function App() {
  return (
    <div className="app">
      <Router>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
