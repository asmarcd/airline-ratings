import React, { useState, useEffect, Fragment } from 'react';
import Header from './Header'
import axios from 'axios';
import styled from 'styled-components';
import ReviewForm from './ReviewForm'

const Wrapper = styled.div`
    margin-left:auto;
    margin-right:auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
background: #fff;
height: 100vh;
overflow: scroll;

&:last-child {
    background: #000;
}
`
const Main = styled.div`
padding-left: 50px;`


const Airline = (props) => {

    const [airline, setAirline] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const slug = props.match.params.slug
        const url = `/api/v1/airlines/${slug}`

        axios.get(url)
            .then(res => {
                setAirline(res.data)
                setLoaded(true)
            }).catch(res => console.log(res))
    }, []);

    const handleChange = e => {
        e.preventDefault();

        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    };

    const handleSubmit = e => {
        e.preventDefault();

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN']=csrfToken

        const airline_id = airline.data.id
        axios.post('/api/v1/reviews', {review, airline_id})
        .then(res => {
            const included = [...airline.data.relationships.reviews.data, res.data]
            setAirline({...airline, included})
            setReview({title: '', description: '', score: 0})
        })
        .catch(res => {})
    };

    const setRating = (score, e) => {
        e.preventDefault();
        
        setReview({...review, score})
    }

    return (
        <Wrapper>
            {loaded &&
                <Fragment>
                    <Column>
                        <Main>
                            <Header
                                attributes={airline.data.attributes}
                                reviews={airline.data.relationships.reviews.data}
                            />

                            <div className="reviews"></div>
                        </Main>
                    </Column>
                    <Column>
                        <ReviewForm
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setRating={setRating}
                            attributes={airline.data.attributes}
                            review={review}
                        />
                    </Column>
                </Fragment>
            }
        </Wrapper>
    )
}

export default Airline