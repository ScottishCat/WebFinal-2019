import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import BusinessTitle from './BusinessTitle';
import Button from '@material-ui/core/Button';
import Ratings from '../DetailPage/Rating';
import Gallery from '../MainPage/Gallery';
import Link from '@material-ui/core/Link';
import Axios from 'axios';

const axios = Axios.create()

const useStyle = makeStyles(theme =>({
    container:{
        height: '90vh',
        overflow: 'scroll',
        flexDirection:'column',
        maxWidth: '700px',
    },
    h3:{
        color: '#5c5757'
    },
    review:{
        width: '100%',
        height: 'auto',
        backgroundColor:'#f4f4f4',
        boxShadow: '5px 5px 10px -5px #aaaaaa',
        paddingBottom:'5px',
        marginTop:'20px'
    },
    reviewTitle:{
        fontWeight:'bold',
        fontSize:'23px',
        paddingTop: '10px',
        margin: '5px'
    },
}))

const ReviewList = (props) => {
    const classes = useStyle()
    let business = JSON.parse(localStorage.getItem("business"))
    const {businessId, userId} = useParams()
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        axios.get(`https://midi-fiction.glitch.me/api/review/business/${props.businessId}`)
            .then((res => {
                setReviews(res.data)
                console.log(reviews)
            }))
    },[])

    const hours = business.hours

    const onClickHandler = (e) => {
        if (userId !== 'undefined'){
            window.location.href=`/review/${businessId}/${userId}`
        }
        else{
            window.location.href='/login'
        }
    }

    return (
        <Container className={classes.container}>
            <BusinessTitle name={business.name}
            reviews={`${business.review_count} reviews`}
            address={business.address}
            city={business.city}
            postal={business.postal_code}
            stars={business.stars}
            hours={hours}/>
            <br/>
            <h2 className={classes.h3}>Recommended Reviews</h2>
            <Button variant='contained' color='secondary' onClick={onClickHandler}>Write a review</Button>
            <br/>
            {
                reviews.map(r => (
                    <div className={classes.review}>
                        <Container>
                            <h3 className={classes.reviewTitle}>{r.name}</h3>
                            <Ratings star={r.stars} size='small'/>
                            <small>{`posted on ${r.date}`}</small>
                            <p>{r.text}</p>
                        </Container>
                    </div>
                ))
            }
        </Container>
    )
}

export default ReviewList;