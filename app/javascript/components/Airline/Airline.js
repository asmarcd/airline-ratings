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
    }, [])

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
                        <ReviewForm />
                    </Column>
                </Fragment>
            }
        </Wrapper>
    )
}

export default Airline