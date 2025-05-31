import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Home } from "../components/Home/Home";
import { Side_nav } from "../components/Nav/side_nav/side_nav";
import { Hire } from "../components/Hire/hire";
import { Un_found_page } from "../components/404/un_found_page";
import Signup from "../components/Login-Signup/signup";
import { Top_nav } from "./../components/Nav/top_nav";
import Profile from "../components/profile/profile";
import { Login } from "../components/Login-Signup/login";
import { Become_Worker } from "../components/become_worker/become_worker";
import { Contact } from "../components/Contact/contact";
import { AnimatePresence } from "motion/react";
import { WorkerProfile } from "./../components/Hire/workerProfile";
import { Message_Contact } from "../components/Message_Contact/Message_Contact";
import { Order } from "../components/Orders/order";
import About from "../components/about/about";
import { Admin } from "../components/admin/Admin";

export function Main_router() {
  return (
    <BrowserRouter>
      <Top_nav />
      <Side_nav />
      <Router_Setup />
    </BrowserRouter>
  );
}
function Router_Setup() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[location.pathname])
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/order" element={<Order />} />
        <Route path="/messages/:contactId" element={<Message_Contact />} />
        <Route path="/messages" element={<Message_Contact />} />
        <Route path="/workerProfile/:workerId" element={<WorkerProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create_worker_profile" element={<Become_Worker />} />
        <Route path="/*" element={<Un_found_page />} />
      </Routes>
    </AnimatePresence>
  );
}
