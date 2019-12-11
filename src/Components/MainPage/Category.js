import React from 'react'
import {useParams} from 'react-router'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const axios = Axios.create();

const useStyle = makeStyles(theme=>({
    box: {
        padding: '15px',
        margin: '0px 15px'
    },
    title:{
        height: '10vw',
        fontSize: '2vw',
        fontWeight: 'bold',
        [theme.breakpoints.up('md')]:{
            paddingTop: '8vh',
        },
        [theme.breakpoints.down('md')]:{
            fontSize: '2vh',
            paddingTop: '2vh'
        },
        color: '#fa877f',
    },
    desc:{
        fontSize: '1vw'
    },
    image:{
        paddingTop: '8%',
        width: '50%',
    },
    container: {
        height: '30vw',
        maxHeight: '45vh',
        minHeight: '20vh',
        backgroundColor: '#ffffff',
        width: '100%',
    },
    item: {
        maxWidth: '180px',
        maxHeight: '180px',
        width: '20vw',
        height: '20vw'
    },
    paper: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: 'solid 1px #cccccc',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

const Category = () => {
    let {userId} = useParams()
    const onClickHandler = (city)=>{
        axios.post("https://midi-fiction.glitch.me/api/cityB",{
            city: city
        }).then(res=>{
            localStorage.setItem("searchList", JSON.stringify(res.data))
            console.log(JSON.parse(localStorage.getItem("searchList")));
            window.location.href=`/search/${userId}`
        })
    }
    const classes = useStyle()
    return (
        <div>
            <Grid container spacing={2} class={classes.container}>
                    <Grid container justify="center" alignContent='center' spacing={2} >
                        <Grid container justify="center" alignContent='center' className={classes.title}>
                        Top 10 places to go
                        </Grid>
                        {['Las Vegas', 'Toronto', 'Phoenix', 'Pittsburgh'].map(value => (
                            <Grid key={value} item className={classes.item} justify="center" alignContent='center' onClick={()=>onClickHandler(value)}>
                                <div className={classes.paper}>
                                    <p className={classes.desc}>{value}</p>
                                    <img src={require(`../../static/icons/${value}.png`)} className={classes.image}/>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
            </Grid>
        </div>)
}

export default Category;