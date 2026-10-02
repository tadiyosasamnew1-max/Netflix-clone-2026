import "./Home.css";
import Header from "../../components/common/Header/Header";
import Banner from "../../components/banner/Banner";
import Row from "../../components/rows/Row/Row";
import Footer from "../../components/common/Footer/Footer";
import requests from "../../services/tmdb/requests";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Banner />
            <div className="home__rows">
                <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;