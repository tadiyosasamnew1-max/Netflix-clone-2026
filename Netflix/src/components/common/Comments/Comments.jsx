import { useEffect, useState } from "react";
import {
    addDoc, collection, deleteDoc, doc,
    limit, onSnapshot, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Loading from "../Loading/Loading";
import "./Comments.css";

const MAX = 500;

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const user = auth.currentUser;

    // live updates: the list refreshes by itself when anyone adds a comment
    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"), limit(50));
        const unsub = onSnapshot(
            q,
            (snap) => {
                setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Comments load failed:", err.code);
                setError(
                    err.code === "permission-denied"
                        ? "No permission. Publish the Firestore rules first."
                        : "Could not load comments."
                );
                setLoading(false);
            }
        );
        return () => unsub();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clean = text.trim();
        if (!clean || !user) return;
        setSending(true);
        setError("");
        try {
            await addDoc(collection(db, "comments"), {
                text: clean,
                uid: user.uid,
                name: user.displayName || user.email.split("@")[0],
                createdAt: serverTimestamp(),
            });
            setText("");
        } catch (err) {
            console.error("Add comment failed:", err.code);
            setError("Could not post your comment. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "comments", id));
        } catch (err) {
            console.error("Delete failed:", err.code);
            setError("Could not delete the comment.");
        }
    };

    const formatTime = (ts) => (ts?.toDate ? ts.toDate().toLocaleString() : "just now");

    return (
        <section className="comments">
            <h2>Comments</h2>

            <form className="comments__form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Write a comment..."
                    value={text}
                    maxLength={MAX}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                />
                <div className="comments__bar">
                    <span>{text.length}/{MAX}</span>
                    <button type="submit" disabled={sending || !text.trim()}>
                        {sending ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>

            {error && <p className="comments__error">{error}</p>}

            {loading ? (
                <Loading fullscreen={false} text="Loading comments..." />
            ) : comments.length === 0 ? (
                <p className="comments__empty">No comments yet. Be the first!</p>
            ) : (
                <ul className="comments__list">
                    {comments.map((c) => (
                        <li key={c.id} className="comments__item">
                            <div className="comments__avatar">{(c.name || "?")[0].toUpperCase()}</div>
                            <div className="comments__main">
                                <div className="comments__head">
                                    <strong>{c.name}</strong>
                                    <time>{formatTime(c.createdAt)}</time>
                                </div>
                                <p>{c.text}</p>
                            </div>
                            {user && c.uid === user.uid && (
                                <button
                                    className="comments__delete"
                                    onClick={() => handleDelete(c.id)}
                                    aria-label="Delete comment"
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Comments;