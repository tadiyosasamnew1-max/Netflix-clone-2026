import "./Loading.css";

const Loading = ({ fullscreen = true, text = "" }) => (
    <div className={fullscreen ? "loading loading--full" : "loading"} role="status" aria-live="polite">
        {fullscreen && <span className="loading__logo">NETFLIX</span>}
        <div className="loading__spinner" />
        {text && <p className="loading__text">{text}</p>}
    </div>
);

export default Loading;