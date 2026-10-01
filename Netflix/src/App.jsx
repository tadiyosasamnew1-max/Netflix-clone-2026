import React, { useEffect } from 'react';
import Home from './pages/Home/Home'; // የቤትህ ፊልሞች ገፅ (ካለህበት ቦታ ጋር አስተካክለው)
import Login from './pages/Login/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ተጠቃሚው መግባቱን ወይም መውጣቱን በቋሚነት ይከታተላል
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In:", user);
        navigate('/'); // ተጠቃሚው ከገባ ወደ ዋናው ገፅ ይወስደዋል
      } else {
        console.log("Logged Out");
        navigate('/login'); // ካልገባ ደግሞ ወደ መግቢያ ገፅ ይመልሰዋል
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;