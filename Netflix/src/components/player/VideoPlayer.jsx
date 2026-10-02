import "./VideoPlayer.css";

const VideoPlayer = ({ videoKey, title }) => {
    if (!videoKey) {
        return <p className="player__none">No trailer available for this title.</p>;
    }
    return (
        <div className="player">
            <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                title={`${title} trailer`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
            />
        </div>
    );
};

export default VideoPlayer;