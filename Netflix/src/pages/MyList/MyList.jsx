import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import MovieCard from "../../components/rows/MovieCard/MovieCard";
import { useMovies } from "../../context/MovieContext";
import "./MyList.css";

const MyList = () => {
    const { myList } = useMovies();

    return (
        <div className="mylist">
            <Header />
            <div className="mylist__body">
                <h1>My List</h1>
                {myList.length === 0 ? (
                    <p className="mylist__empty">
                        Your list is empty. Hover over a poster and press + to save it here.
                    </p>
                ) : (
                    <div className="mylist__grid">
                        {myList
                            .filter((m) => m.poster_path)
                            .map((m) => (
                                <MovieCard key={m.id} movie={m} />
                            ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyList;