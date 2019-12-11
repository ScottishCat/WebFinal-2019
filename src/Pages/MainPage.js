import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router';
import TopBar from '../Components/MainPage/TopBar';
import ShowCase from '../Components/MainPage/ShowCase';
import Category from '../Components/MainPage/Category';
import HotBusiness from '../Components/MainPage/HotBusiness';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const axios = Axios.create();

const useStyle = makeStyles(theme => ({
    footer: {
        height: '8vh',
        width: '100vw',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fa877f',
        color: '#FFFFFF',
        fontSize: '2vh'
    }
}))
const MainPage = (props) => {
    const [logged, setLog] = useState(false);
    const classes = useStyle();
    let {userId} = useParams();

    useEffect(() => {
        if (userId && userId !== 'undefined'){
            setLog(true)
        }
    },[]);


    return (
        <div>
            <TopBar logged={logged} setLog={setLog} userId={userId}/>
            <ShowCase />
            <HotBusiness />
            <br />
            <Category />
            <br />
            <br />
            <div className={classes.footer}>
                <p>Copyright © 2019-03-12 Yummy Inc.</p>
            </div>
        </div>
    )

}

export default MainPage