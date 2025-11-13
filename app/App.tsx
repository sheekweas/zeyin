import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Reset from "../pages/Auth/Reset";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import Store from "../pages/Store/Store";
import MyItems from "../pages/MyItems/MyItems";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import EditProfile from "../pages/EditProfile/EditProfile";
import TestsList from "../pages/Tests/TestsList";
import MyTests from "../pages/Tests/MyTests";
import TestRunner from "../pages/Tests/TestRunner";
import TestResults from "../pages/Tests/TestResults";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/register") ||
    location.pathname.startsWith("/auth/reset");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/reset" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/my-items" element={<MyItems />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          <Route path="/tests" element={<TestsList />} />
          <Route path="/my-tests" element={<MyTests />} />
          <Route path="/test/:id" element={<TestRunner />} />
          <Route path="/test/:id/results" element={<TestResults />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
