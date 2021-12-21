import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage.js';
import GridCards from '../commons/GridCards.js';
import { Row } from 'antd';


function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint) // Movie API
        .then(response => response.json()) // response.json()을 통해 response를 읽을 수 있다. (그냥은 안 됨)
        .then(response => {
            setMovies([...Movies, ...response.results]); // STATE에 넣기
            if(response.page === 1){
                setMainMovieImage(response.results[0]);
            }
            setCurrentPage(response.page);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    };

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />

                        </React.Fragment>
                    ))}
                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    );
}

export default LandingPage;
