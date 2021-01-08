import React from 'react';

const ReviewForm = (props) => {



    return (
        <div className='wrapper'>
            <form onSubmit = {props.handleSubmit}>
                <div>Have an Experience with {props.attributes.name}? Share your review:</div>
                <div className='field'>
                    <input onChange={props.handleChange} value={props.review.title} type='text' name='title' placeholder='Title your Review'></input>
                </div>
                <div className='field'>
                    <input onChange={props.handleChange} value={props.review.description} type='text' name='description' placeholder='Write your Review'></input>
                </div>
                <div className='field'>
                    <div className='rating-container'>
                        <div className='rating-title-text'>Rate this Airline [stars go here]</div>
                    </div>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm