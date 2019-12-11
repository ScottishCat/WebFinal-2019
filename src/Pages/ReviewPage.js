import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router';
import TopBar from '../Components/MainPage/TopBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

const axios = Axios.create()

const useStyle = makeStyles(theme =>({
    footer: {
        height: '8vh',
        width: '100vw',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fa877f',
        color: '#FFFFFF',
        fontSize: '2vh',
        display :'fixed',
        bottom: '0px'
    },
    solid: {
        display: 'block',
        width: '100%',
        height: '64px',
        backgroundColor: '#FFFFFF'
    },
    container:{
        height: '90vh',
        overflow: 'scroll',
        flexDirection:'column',
        maxWidth: '700px',
    },
    textfield:{
        display: 'flex',
        flexDirection:'column',
        width: '100%',
        height: '50vh',
        border: 'solid #cccccc 2px',
        borderRadius: '5px',
        [theme.breakpoints.down('md')]:{
            height:'40vh'
        }
    },
    text:{
        display:'flex',
        width: '100%',
        height: '20%'
    },
    form: {
        display: 'flex',
        minWidth: 120,
        marginLeft: '5%',
        marginTop: '2%',
        flexDirection: 'column'
    },
    buttons:{
        display: 'flex',
        minWidth: 120,
        marginTop: '1%',
        flexDirection: 'column'
    },
    content: {
        width: '38vw',
        [theme.breakpoints.down('md')]:{
            width: '50vw'
        },
        [theme.breakpoints.down('sm')]:{
            width: '75vw'
        }
    },
    submit:{
        marginLeft: '10px'
    }
}))

const ReviewPage = (props) => {
    let {businessId, userId} = useParams();
    useEffect(() => {
        if (userId && userId !== 'undefined'){
            setLog(true)
        }
    },[]);
    const classes = useStyle();
    const [logged, setLog] = useState(true);
    const [star, setStar] = useState(5);
    const [content, setContent] = useState('');
    const [submit, setSubmit] = useState(false)

    const onChangeHandler = (e) => {
        setStar(e.target.value);
    }

    const textChangeHandler = (e) => {
        setContent(e.target.value);
    }

    const onSubmitHandler = (e) => {
        console.log(star);
        console.log(content);
        axios.post("https://midi-fiction.glitch.me/api/newReview",{
            user_id: userId,
            business_id: businessId,
            stars: parseInt(star),
            text: content
        }).then(res=>{
            localStorage.setItem("business", JSON.stringify(res.data));
            // console.log(JSON.parse(localStorage.getItem("business")));
            window.location.href=`/detail/${businessId}/${userId}`
        }
        ).catch(err=>console.log(err))
        setSubmit(true);
    }

    return (
        <div>
            <TopBar logged={logged} businessId={businessId} userId={userId}/>
            <div className={classes.solid}></div>
            <Container className={classes.container}>
                <h1>Write a review</h1>
                <div className={classes.textfield}>
                    <div className={classes.text}>
                        <FormControl className={classes.form}>
                                <TextField
                                    label="Write a review"
                                    multiline
                                    rowsMax="10"
                                    value={content}
                                    onChange={textChangeHandler}
                                    className={classes.content}
                                    margin="normal"
                                />
                        </FormControl>
                    </div> 
                </div>
                <div style={{display: 'flex', flexDirection:'row', height: '10%', width: '100%', alignItems:'flex-end'}}>
                    <FormControl className={classes.buttons}>
                        <InputLabel>Stars</InputLabel>
                        <Select value={star} onChange={onChangeHandler}>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' color='secondary' className={classes.submit} onClick={onSubmitHandler}>Submit</Button>
                </div>
            </Container>
            <div className={classes.footer}>
                <p>Copyright © 2019-03-12 Yummy Inc.</p>
            </div>
        </div>
    )
}

export default ReviewPage;