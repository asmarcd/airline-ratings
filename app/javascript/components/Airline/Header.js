import React from 'react';
import syled from 'styled-components';

const Wrapper = syled.div`
    padding: 50px 100px 50px 0;
    font-size: 30px;

    img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        border: 1px solid rgba(0,0,0,0.1);
        margin-bottom: -8px;
    }

`
const TotalReviews = syled.div`
    font-size: 18px;
    padding: 10px 0;
`
const TotalOutOf = syled.div`
    font-size: 18px;
    font-weight: bold;
    paddingL 10px 0;
`

const Header = (props) => {
    const { name, image_url, avg_score } = props.attributes;
    const total = props.reviews.length;


    return (
        <Wrapper>
            <h1><img src={image_url} alt={name} /> {name}</h1>
            <div>
                <TotalReviews>{total} Customer Reviews</TotalReviews>
                <div className='starRating'></div>
                <TotalOutOf>{avg_score} out of 5</TotalOutOf>
            </div>
        </Wrapper>
    )
}

export default Header