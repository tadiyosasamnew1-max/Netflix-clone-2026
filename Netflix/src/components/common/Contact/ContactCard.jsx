import { useEffect, useState } from "react";
import "./ContactCard.css";

// ✏️ Edit your details here
const PROFILE = {
    name: "Tadiyos Asamnew",
    role: "Computer Science Student",
    email: "tadiyosasamnew1@gmail.com",
    phone: "0928019622",
    photo: "/profile.jpg", // put your photo in the project's public/ folder with this name
};

const ContactCard = ({ onClose }) => {
    const [photoFailed, setPhotoFailed] = useState(false);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const initials = PROFILE.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);

    return (
        <div className="contact" onClick={onClose}>
            <div
                className="contact__card"
                role="dialog"
                aria-label="Contact"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="contact__close" onClick={onClose} aria-label="Close">×</button>

                <div className="contact__photo">
                    {photoFailed ? (
                        <span>{initials}</span>
                    ) : (
                        <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setPhotoFailed(true)} />
                    )}
                </div>

                <h2 className="contact__name">{PROFILE.name}</h2>
                <p className="contact__role">{PROFILE.role}</p>

                <div className="contact__rows">
                    <a href={`mailto:${PROFILE.email}`}>
                        <span className="contact__label">Email</span>
                        {PROFILE.email}
                    </a>
                    <a href={`tel:${PROFILE.phone}`}>
                        <span className="contact__label">Phone</span>
                        {PROFILE.phone}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;