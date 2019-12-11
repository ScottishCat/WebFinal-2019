import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MapWindow from './MapWindow';
import Rating from './Rating';
import Gallery from '../MainPage/Gallery';

const useStyle = makeStyles(theme=>({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    h1:{
        color: '#5c5757',
        [theme.breakpoints.down('sm')]:{
            fontSize: '4vh'
        }
    },
    reviews:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    span:{
        alignItems: 'center'
    },
    info:{
        display:'flex',
        flexDirection:'row',
        border: 'solid 2px #cccccc',
        padding: '10px'
    },
    locations:{
        display: 'flex',
        flexDirection:'column',
        width: '50%',
    },
    hours:{
        display: 'flex',
        flexDirection:'column',
        width: '50%',
        textAlign:'center'
    },
    locationItems:{
        display:'flex',
        margin:'8px',
    },
    hourItems:{
        display:'flex',
        margin: '0px',
    },
    h2:{
        color: '#5c5757'
    }
}))

const BusinessTitle = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.h1}>{props.name}</h1>
                <div className={classes.reviews}>
                    <Rating star={props.stars}/>
                    <span className={classes.span}>{props.reviews}</span>
                </div>
            </div>
            <br/>
            <MapWindow/>
            <br/>
            <h2 className={classes.h2}>Locations & Hours</h2>
            <div className={classes.info}>
                <div className={classes.locations}>
                    <p className={classes.locationItems}>{props.address}</p>
                    <p className={classes.locationItems}>{props.city}</p>
                    <p className={classes.locationItems}>{props.postal}</p>
                </div>
                { props.hours ? 
                <div className={classes.hours}>
                    {props.hours.Monday ?
                        <p className={classes.hourItems}>{`Mon: ${props.hours.Monday}`}</p>
                        : null}
                    {props.hours.Tuesday ?
                        <p className={classes.hourItems}>{`Tue: ${props.hours.Tuesday}`}</p>
                        : null}
                    {props.hours.Wednesday ?
                        <p className={classes.hourItems}>{`Wed: ${props.hours.Wednesday}`}</p>
                        : null}
                    {props.hours.Thursday ?
                        <p className={classes.hourItems}>{`Thu: ${props.hours.Thursday}`}</p>
                        : null}
                    {props.hours.Friday ?
                        <p className={classes.hourItems}>{`Fri: ${props.hours.Friday}`}</p>
                        : null}
                    {props.hours.Saturday ?
                        <p className={classes.hourItems}>{`Sat: ${props.hours.Saturday}`}</p>
                        : null}
                    {props.hours.Sunday ?
                        <p className={classes.hourItems}>{`Sun: ${props.hours.Sunday}`}</p>
                        : null}
                </div>
                    : null}
            </div>
        </div>
    )
}

export default BusinessTitle;