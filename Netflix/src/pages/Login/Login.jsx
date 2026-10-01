import React, { useState } from 'react';
import './Login.css';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signState, setSignState] = useState("Sign In"); // ለመቀያየር (Sign In ወይም Sign Up)

    // ተጠቃሚው ሎግኢን ወይም ሳይን አፕ ሲያደርግ ከ Firebase ጋር የሚያገናኘው ፌክሽን
    const user_auth = async (event) => {
        event.preventDefault();
        try {
            if (signState === "Sign In") {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Logged in successfully!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Account created successfully!");
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="login">
            <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="Netflix Logo"
            />

            <div className="login__form">
                <h1>{signState}</h1>
                <form>
                    <input
                        type="email"
                        placeholder="Email or mobile number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" onClick={user_auth}>{signState}</button>

                    <div className="form-switch">
                        {signState === "Sign In" ? (
                            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign up now.</span></p>
                        ) : (
                            <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign in now.</span></p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;