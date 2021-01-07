import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'

const Airline = (props) => {
    return (
        <div className = "card">
            <section className = "airline-logo">
                <img src={props.attributes.image_url} alt ={props.attributes.name}/>
            </section>
            <section className = "airline-name">{props.attributes.name}</section>
            <section className = "airline-score">{props.attributes.avg_score}</section>
            <section className = "airline-link">
                <Link to={`/airlines/${props.attributes.slug}`}>View Airline</Link>
            </section>
        </div>
    )
}

export default Airline