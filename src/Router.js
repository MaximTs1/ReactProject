import { Route, Routes } from "react-router-dom";
import Cards from "./cards/Cards";
import Login from "./user/Login";
import Signup from "./user/Signup";
import FavoriteCards from "./cards/FavoriteCards";
import MyCards from "./cards/MyCards";
import CardInfo from "./cards/CardInfo";
import About from "./pages/About";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";
import UserManage from "./admin/UserManage";
import Account from "./user/Account";
import AdminEditUser from "./admin/AdminEditUser";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Cards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="/addcard" element={<AddCard />} />
      <Route path="/editcard" element={<EditCard />} />
      <Route path="/cardInfo" element={<CardInfo />} />
      <Route path="/favorite" element={<FavoriteCards />} />
      <Route path="/my-cards" element={<MyCards />} />
      <Route path="/admin" element={<UserManage />} />
      <Route path="/admineditUser" element={<AdminEditUser />} />

    
    </Routes>
  );
}
