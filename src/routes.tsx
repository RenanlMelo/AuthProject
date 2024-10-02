import { AuthLoginProvider } from "./contexts/authLogin";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login/page";
import { RegisterPage } from "./pages/Register/page";
import { DisplayPage } from "./pages/Display/page";
import { AuthRegisterProvider } from "./contexts/authRegister";

function MainRouter() {
  return (
    <AuthRegisterProvider>
      <AuthLoginProvider>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/users/create" Component={RegisterPage} />
          <Route path="/users/me" Component={DisplayPage} />
        </Routes>
      </AuthLoginProvider>
    </AuthRegisterProvider>
  );
}

export default MainRouter;
