import React, { useEffect, useState,useRef } from 'react';
import {useParams} from 'react-router';
import TopBar from '../Components/MainPage/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Ratings from '../Components/DetailPage/Rating';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { borderRight } from '@material-ui/system';


const axios = Axios.create()
const imgUrl = require('../static/icons/boss.png')

const useStyle = makeStyles(theme => ({
    footer: {
        height: '8vh',
        width: '100vw',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fa877f',
        color: '#FFFFFF',
        fontSize: '2vh',
        display: 'fixed',
        bottom: '0px'
    },
    solid: {
        display: 'block',
        width: '100%',
        height: '64px',
        backgroundColor: '#FFFFFF'
    },
    container: {
        height: '90vh',
        overflow: 'scroll',
        flexDirection: 'column',
        maxWidth: '700px',
    },
    userTitle: {
        display: 'flex',
        width: '100%',
        height: '15vh',
        [theme.breakpoints.up('sm')]:{
            height: '18vh'
        },
        color: '#5c5757',
        backgroundColor: '#f4f4f4',
        flexDirection: 'row',
        boxShadow: '5px 5px 10px -5px #aaaaaa',
    },
    userInfo: {
        paddingLeft: '5%',
        paddingTop: '2%',
        margin: '0px',
    },
    partition1: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
    },
    partition2:{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        borderRight: 'solid 1px #CCCCCC'
    },
    img:{
        margin: "0px"
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

const UserProfilePage = (props) =>{
    const [log, setLog] = useState(false)
    const [name, setName] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [email, setEmail] = useState(null)
    const [reviews, setReviews] = useState([])

    let { userId } = useParams()


    useEffect(() => {
        if (userId && userId !== 'undefined'){
            setLog(true)
        }
        axios.get(`https://midi-fiction.glitch.me/api/userId/${userId}`)
            .then((res => {
                setName(res.data[0].name)
                setStartDate(res.data[0].yelping_since)
                setEmail(res.data[0].email)
            }))
        axios.get(`https://midi-fiction.glitch.me/api/review/user/${userId}`)
            .then((res => {
                setReviews(res.data)
                console.log(reviews)
            }))
    }, [])

    const onDeleteHandler = (review_id, index) =>{
        axios.delete(`https://midi-fiction.glitch.me/api/reviewD/${review_id}`)
        .then(res=>{
            setReviews(reviews.filter((item, i)=> i !== index))
        })
        .catch(err=> {console.log(err)})
    }

    const classes = useStyle()
    return (
        <div>
            <TopBar userId={userId} logged={log}/>
            <div className={classes.solid}></div>
            <br />
            <Container className={classes.container}>
                <div className={classes.userTitle}>
                    <div className={classes.partition2}>
                        <img src={imgUrl} className={classes.img} height="100%"/>
                    </div>
                    <div className={classes.partition1}>
                        <h1 className={classes.userInfo}>{name}</h1>
                        <small className={classes.userInfo}>{email}</small>
                        <small className={classes.userInfo}>{startDate}</small>
                    </div>
                </div>
                <h2>My reviews</h2>
                {reviews.map((r,index) => (
                    <div className={classes.review}>
                        <Container>
                            <br/>
                            <Ratings star={r.stars} size='small'/>
                            <small>{`posted on ${r.date}`}</small>
                            <p>{r.text}</p>
                            <Button color='secondary' onClick={()=>onDeleteHandler(r.review_id, index)}>Delete Review</Button>
                        </Container>
                    </div>
                ))
            }
            </Container>
            <div className={classes.footer}>
                <p>Copyright © 2019-03-12 Yummy Inc.</p>
            </div>
        </div>
    )
}

export default UserProfilePage;