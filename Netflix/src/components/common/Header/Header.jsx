import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [show, setShow] = useState(false);

  // ገጹ ወደ ታች Scroll ሲደረግ Navbarው ጥቁር እንዲሆን የሚያደርግ Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${show && 'header__black'}`}>
      <div className="header__contents">
        {/* በግራ በኩል፡ የ Netflix Logo እና Navigation Links */}
        <div className="header__left">
          <img
            className="header__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
          />
          <div className="header__nav">
            <span>Home</span>
            <span>TV Shows</span>
            <span>Movies</span>
            <span>New & Popular</span>
            <span>My List</span>
          </div>
        </div>

        {/* በቀኝ በኩል፡ የ User Avatar (Classic Blue Netflix Avatar) */}
        <img
          className="header__avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
          alt="User Avatar"
        />
      </div>
    </div>
  );
};

export default Header;