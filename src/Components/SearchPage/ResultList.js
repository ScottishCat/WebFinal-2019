import React,{useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Rating from './Rating';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Axios from 'axios';
const axios = Axios.create()

const useStyle = makeStyles((theme,star) => ({
    container:{
        height: '90vh',
        overflow: 'scroll',
        flexDirection:'column',
        maxWidth: '700px',
    },
    itemContainer:{
        display: 'flex',
        flexDirection:'row',
        height: '27vh',
        [theme.breakpoints.down('md')]:{
            height:'18vh'
        },
        width:'100%',
        backgroundColor:'#f4f4f4',
        marginTop: '1vh',
        marginBottom:'1vh'
    },
    profile:{
        display:'flex',
        width: '35%',
        height: '100%',
        background: "url(" + require(`../../static/images/burgers.jpg`) + ") center",
        backgroundSize: "cover" 
    },
    info:{
        display:'flex',
        flexDirection:'column',
        width:'65%',
        height:'100%',
        fontSize: '15px',
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]:{
            fontSize: '1.5vh',
        }
    },
    name:{
        display: 'flex',
        padding: '5%',
        width: '50%'
    },
    title:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    address:{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        textAlign: 'right',
        paddingRight:'5%'
    },
    rating:{
        display: 'flex',
        flexDirection: 'row',
        height: '14px',
        width: '100%',
        [theme.breakpoints.up('md')]:{
            height: '20px',
        },
        textAlign: 'right'
    },
    stars:{
        display: 'flex',
        width: '85px',
        height: '14px',
        [theme.breakpoints.up('md')]:{
            width: '120px',
            height: '20px',
        },
        background: "url(" + require(`../../static/rating/small_3.png`) + ")",
        backgroundSize: 'cover',
        marginLeft: '5%',
        marginRight: '3%'
    },
    reviews:{
        fontSize: '12px',
        [theme.breakpoints.down('md')]:{
            fontSize: '1vh',
        },
        paddingTop:'2px'
    }
}))

const ResultList = (props) => {
    const classes = useStyle(props);

    const onLinkHandler = (bid) =>{
        axios.get(`https://midi-fiction.glitch.me/api/business/id/${bid}`)
        .then(res=>{
            localStorage.setItem("business",JSON.stringify(res.data[0]))
            localStorage.setItem("lat",res.data[0].latitude)
            localStorage.setItem("lng",res.data[0].longitude)
            // console.log(JSON.parse(localStorage.getItem("business")))
            // console.log(typeof localStorage.getItem("lat"))
            // console.log(localStorage.getItem("lat"))
            // console.log(localStorage.getItem("lng"))
            window.location.href=`/detail/${bid}/${props.userId}`
            })
        .catch(err=>console.log(err))
    }

    return (
        <Container className={classes.container}>
            {JSON.parse(localStorage.getItem("searchList")).map(value => (
                <div id={value.business_id} className={classes.itemContainer} onClick={()=>onLinkHandler(value.business_id)}>
                    <div className={classes.profile}></div>
                    <div className={classes.info}>
                        <div className={classes.title}>
                        <h3 className={classes.name}>{value.name}</h3>
                            <div className={classes.address}>
                                <p>
                                    {value.city}
                                    <br/>
                                    {value.postal_code}
                                </p>
                            </div>
                        </div>
                        <div className={classes.rating}>
                            <Rating star={value.stars}/>
                            <span className={classes.reviews}>{`${value.review_count}reviews`}</span>
                        </div>
                    </div>
                </div>))
            }
        </Container>
    )
}

export default ResultList;