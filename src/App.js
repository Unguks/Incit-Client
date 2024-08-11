// import Form from "./components/Loginform";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./scenes/Loginpage";
import Registerpage from "./scenes/Registerpage";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile";
import ResetPassword from "./scenes/Resetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage/>}></Route>
        <Route path="/login" element={<Loginpage/>}></Route>
        <Route path="/register" element={<Registerpage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/reset-password" element={<ResetPassword/>}></Route>
      </Routes>
    </BrowserRouter>


    // <div className="flex w-full h-screen">
    //   <div className="w-full flex items-center justify-center lg:w-1/2">
    //     <Form/>
    //   </div>
    //   <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
    //     <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
    //     <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg bottom-0"/>
    //   </div>
    // </div>
  );
}

export default App;
