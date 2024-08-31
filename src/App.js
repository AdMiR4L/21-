
import './App.css';
import './assets/css/fontiran.css';
import Header from "./layers/Header";
import Footer from "./layers/Footer";
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Game from "./components/Game";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import PaymentReceipt from "./components/PaymentReceipt";
import UserInfo from "./dashboard/UserInfo";
function App() {

    const [user, setUser] = useState({
        loggedIn : localStorage.getItem("loggedIn"),
    });
    const [loginModal, setLoginModal] = useState(false);
  return (

      <Router>
          <div className="App">
              <Header
                  loginModal={loginModal}
                  setLoginModal={setLoginModal}
                  user={user}
                  setUser={setUser}
              />
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home user={user} setUser={setUser} loginModal={loginModal} setloginModal={setLoginModal} />} />
                      <Route path="game/:id" element={<Game loginModal={loginModal} setloginModal={setLoginModal} />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="dashboard/user/info" element={<UserInfo/>} />
                      <Route path="verify/zarinpal/:id" element={<PaymentReceipt />} />
                  </Route>
                  {/* Add a fallback route to catch unmatched routes */}
                  <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer user={user} setUser={setUser} loginModal={loginModal} setloginModal={setLoginModal}/>
          </div>
      </Router>
  );
}

export default App;
