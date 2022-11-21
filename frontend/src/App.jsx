import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Onboard from "./pages/Onboard/Onboard";
import Search from "./pages/Search/Search";
import Clase from "./pages/Clase/Clase";
import Profile from "./pages/Profile/Profile";
import Principal from "./pages/Principal/Principal";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import * as authService from "./services/authService";
import CompleteOnboardStudentFrm from "./pages/Onboard/CompleteOnboardStudentFrm";
import CompleteOnboardTeacherFrm from "./pages/Onboard/CompleteOnboardTeacherFrm";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import CrearClase from "./pages/Clase/CrearClase";
import ForgotPassword from "./pages/ChangePassword/ForgotPassword";

const App = () => {
  const [userState, setUserState] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUserState(null);
    navigate("/");
  };

  const handleSignupOrLogin = () => {
    setUserState(authService.getUser());
  };

  return (
    <>
      <NavBar userState={userState} handleLogout={handleLogout} />

      <Routes>
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />

        <Route
          path="/complete-onboard/student"
          element={<CompleteOnboardStudentFrm userState={userState} />}
        />
        <Route
          path="/complete-onboard/profesor"
          element={<CompleteOnboardTeacherFrm userState={userState} />}
        />
        <Route path="/search" element={<Navigate to="/search/1" />} />
        <Route
          path="/search/:page"
          element={<Search userState={userState} />}
        />
        <Route path="/clase" element={<Navigate to="/search" />} />
        <Route path="/clase/:id" element={<Clase userState={userState} />} />
        <Route
          path="/clase/add"
          element={
            userState ? (
              userState.role && userState.role === "teacher" ? (
                <CrearClase userState={userState} />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/profile" element={<Navigate to="/profile/1" />} />
        <Route
          path="/profile/:page"
          element={
            userState ? (
              userState.role && userState.role !== "" ? (
                <Profile userState={userState} />
              ) : (
                <Navigate to="/onboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/onboard"
          element={
            userState ? (
              userState.role || userState.role === "" ? (
                <Onboard userState={userState} />
              ) : (
                <Navigate to="/profile" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/changePassword/:token"
          element={

              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />

          }
        />


<Route
          path="/forgot"
          element={
  
              <ForgotPassword  />

          }
        />

        <Route path="/" element={<Principal userState={userState} />} />
        <Route path="*" element={<NotFound userState={userState} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
