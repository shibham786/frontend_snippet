import "./App.css";

import Login from "./component/users/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Welcome from "./component/users/Welcome";
import UserRepository from "./component/users/UserRepository";
import NewRepository from "./component/users/NewRepository";

import NotFound from "./component/users/NotFound";
import { useSelector } from "react-redux";
import UserRepoDetail from "./component/users/UserRepoDetail";
import ContactUs from "./component/users/ContactUs";
import LanguageChoicePopup from "./component/users/languageChoicePopup";
import InetrestedSnippet from "./component/users/InetrestedSnippet";
import EditProfile from "./component/users/EditProfile";
import ChangePassword from "./component/users/ChangePassword";

function App() {
  const user = useSelector((state)=> state.login.user)
  return (
    <Routes>
    
      <Route path="/"  index element={<Welcome/>} />
      <Route path="/login"  element={<Login />} />
      <Route path="/TrendingRepo" element={user ? <InetrestedSnippet />:<Login/>}/>
   
      <Route path="/Contact" element={<ContactUs />} />
      <Route path="/NewRepository" element={user ? <NewRepository />:<Login/>} />
      <Route path="/UserRepository" element={user ? <UserRepository/>:<Login/>}/>
    
      <Route path="/UserRepoDetail/:id" element={<UserRepoDetail />} />
      <Route path="/modal" element={<LanguageChoicePopup />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
