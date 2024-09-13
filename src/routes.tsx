import { AuthProvider } from "./contexts/auth"
import { Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login/page"
import { Register } from "./pages/Register/page"

function MainRouter() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/users/create" Component={Register}/>
      </Routes>
    </AuthProvider>

  )
}

export default MainRouter
