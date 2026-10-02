import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyList from "./pages/MyList/MyList";
import Search from "./pages/Search/Search";
import Contact from "./pages/Contact/Contact";
import Modal from "./components/common/Modal/Modal";
import Loading from "./components/common/Loading/Loading";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false); // false until Firebase tells us who is signed in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else if (pathname === "/login") navigate("/");
      setReady(true);
    });
    return () => unsubscribe();
  }, [navigate, pathname]);

  if (!ready) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Modal />
    </>
  );
};

export default App;