import { Col } from 'antd';

function GridCards( props ) {
    if(props.landingPage){
        return (
            // 한 컬럼에 24사이즈 -> 6 => 4개
            <Col lg={6} md={8} xs={24}> 
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`} >
                        <img 
                            src={props.image} 
                            alt={props.movieName}
                            style={{ width: '100%', height: '320px' }} 
                        />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}> 
                <div style={{ position: 'relative' }}>
                    <img 
                        src={props.image} 
                        alt={props.movieName} 
                        style={{ width: '100%', height: '320px' }} 
                    />
                    {props.characterName}
                </div>
            </Col>
        )
    }

    
}

export default GridCards;
