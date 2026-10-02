import { useNavigate } from "react-router-dom";
import "./Footer.css";

// ✏️ Put your own profile links here
const SOCIAL = {
  github: "https://github.com/",
  tiktok: "https://www.tiktok.com/",
  linkedin: "https://www.linkedin.com/",
};

// Public Netflix help/info pages. Edit any address here.
const links = [
  { label: "FAQ", href: "https://help.netflix.com/en/" },
  { label: "Help Center", href: "https://help.netflix.com/" },
  { label: "Account", href: "https://www.netflix.com/youraccount" },
  { label: "Media Center", href: "https://media.netflix.com/" },
  { label: "Investor Relations", href: "https://ir.netflix.net/" },
  { label: "Jobs", href: "https://jobs.netflix.com/" },
  { label: "Ways to Watch", href: "https://help.netflix.com/en/" },
  { label: "Terms of Use", href: "https://help.netflix.com/legal/termsofuse" },
  { label: "Privacy", href: "https://help.netflix.com/legal/privacy" },
  { label: "Cookie Preferences", href: "https://help.netflix.com/legal/privacy" },
  { label: "Corporate Information", href: "https://help.netflix.com/legal/corpinfo" },
  { label: "Contact Us", contact: true },
  { label: "Speed Test", href: "https://fast.com/" },
  { label: "Legal Notices", href: "https://help.netflix.com/legal/notices" },
  { label: "Only on Netflix", href: "https://www.netflix.com/" },
];

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const openContact = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <p className="footer__contact">
        Questions?{" "}
        <button type="button" className="footer__linkbtn" onClick={openContact}>
          Contact us.
        </button>
      </p>

      <div className="footer__links">
        {links.map((l) =>
          l.contact ? (
            <button key={l.label} type="button" className="footer__linkbtn" onClick={openContact}>
              {l.label}
            </button>
          ) : (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          )
        )}
      </div>

      <div className="footer__social">
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Icon>
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </Icon>
        </a>
        <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <Icon>
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </Icon>
        </a>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Icon>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </Icon>
        </a>
      </div>

      <p className="footer__copy">© 2026 Netflix Clone · Built by Tadiyos Asamnew</p>

    </footer>
  );
};

export default Footer;