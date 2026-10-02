import { useState } from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import Comments from "../../components/common/Comments/Comments";
import { PROFILE } from "../../utils/constants";
import "./Contact.css";

const Contact = () => {
    const [photoFailed, setPhotoFailed] = useState(false);
    const initials = PROFILE.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

    return (
        <div className="contactpage">
            <Header />
            <main className="contactpage__body">
                <div className="contactpage__photo">
                    {photoFailed ? (
                        <span>{initials}</span>
                    ) : (
                        <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setPhotoFailed(true)} />
                    )}
                </div>
                <h1>{PROFILE.name}</h1>
                <p className="contactpage__role">{PROFILE.role}</p>

                <div className="contactpage__rows">
                    <a href={`mailto:${PROFILE.email}`}>
                        <span>Email</span>
                        {PROFILE.email}
                    </a>
                    <a href={`tel:${PROFILE.phone}`}>
                        <span>Phone</span>
                        {PROFILE.phone}
                    </a>
                </div>

                <Comments />
            </main>
            <Footer />
        </div>
    );
};

export default Contact;