import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router';
import MapWindow from '../Components/DetailPage/MapWindow';
import TopBar from '../Components/MainPage/TopBar';
import Gallery from '../Components/MainPage/Gallery';
import ReviewList from '../Components/DetailPage/ReviewList';
import { makeStyles } from '@material-ui/core/styles';

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
    }
}))

const DetailPage = (props) => {
    let {businessId, userId} = useParams();
    const [logged, setLog] = useState(false)
    useEffect(()=>{
        if (userId && userId !== 'undefined'){
            setLog(true)
        }
    })
    const classes = useStyle();
    return (
        <div>
            <TopBar businessId={businessId} userId={userId} logged={logged}/>
            <div className={classes.solid}></div>
            <Gallery cols='4'/>
            <ReviewList businessId={businessId}/>
            <div className={classes.footer}>
                <p>Copyright © 2019-03-12 Yummy Inc.</p>
            </div>
        </div>
    )

}

export default DetailPage