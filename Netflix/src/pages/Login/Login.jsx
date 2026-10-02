import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";

const messages = {
    "invalid-credential": "Wrong email or password.",
    "invalid-email": "Please enter a valid email address.",
    "email-already-in-use": "This email already has an account. Try signing in.",
    "weak-password": "Password must be at least 6 characters.",
    "too-many-requests": "Too many attempts. Please try again later.",
    "network-request-failed": "Network error. Check your connection.",
};

const EyeIcon = ({ open }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
        {!open && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
);

const Login = () => {
    const [mode, setMode] = useState("Sign In"); // "Sign In" | "Sign Up" | "Reset"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    const switchMode = (next) => {
        setMode(next);
        setError("");
        setInfo("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            if (mode === "Sign In") {
                await signInWithEmailAndPassword(auth, email, password);
            } else if (mode === "Sign Up") {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await sendPasswordResetEmail(auth, email);
                setInfo("If an account exists for this email, a reset link has been sent. Check your inbox and spam folder.");
            }
        } catch (err) {
            const code = (err.code || "").replace("auth/", "");
            setError(messages[code] || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isReset = mode === "Reset";

    return (
        <div className="login">
            <span className="login__logo">NETFLIX</span>
            <div className="login__form">
                <h1>{isReset ? "Reset Password" : mode}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {!isReset && (
                        <div className="login__password">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password (6+ characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="login__eye"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>
                    )}

                    {error && <p className="login__error">{error}</p>}
                    {info && <p className="login__info">{info}</p>}

                    <button type="submit" className="login__submit" disabled={loading}>
                        {loading ? "Please wait..." : isReset ? "Send reset link" : mode}
                    </button>
                </form>

                {mode === "Sign In" && (
                    <p className="login__forgot">
                        <span onClick={() => switchMode("Reset")}>Forgot password?</span>
                    </p>
                )}

                <p className="login__switch">
                    {isReset ? (
                        <span onClick={() => switchMode("Sign In")}>← Back to sign in</span>
                    ) : mode === "Sign In" ? (
                        <>New to Netflix? <span onClick={() => switchMode("Sign Up")}>Sign up now.</span></>
                    ) : (
                        <>Already have an account? <span onClick={() => switchMode("Sign In")}>Sign in now.</span></>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;