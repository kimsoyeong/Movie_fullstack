import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import { Row, Button } from 'antd'
import Favorite from './Sections/Favorite'

function MovieDetail( props ) {
    let { movieId } = useParams(); // props.match.params.movieId;
    const [Movie, setMovie] = useState(null)
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        // console.log(movieId);

        let endpointCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setMovie(response)
            })

        fetch(endpointCasts)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
    }, [])

    const toggleActorView = () => {
        if(ActorToggle){
            setActorToggle(false)
        } else {
            setActorToggle(true)
        }
    }

    return (
        <div>
            {/* Header */}
            {Movie && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280/${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }
            
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {Movie && <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />}
                </div>


                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />

                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }} >
                    <Button onClick={toggleActorView}> Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            (cast.profile_path && 
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            )
                        ))}
                    </Row>
                }

            </div>

        </div>
    );
}

export default MovieDetail;
