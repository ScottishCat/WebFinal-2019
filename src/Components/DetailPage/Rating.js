import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const Rating = (props) => {

    const useStyle = makeStyles(theme=>({
        stars:{
            display: 'flex',
            width: '125px',
            height: '22px',
            [theme.breakpoints.up('sm')]:{
                width: '180px',
                height: '31px',
            },
            background: "url(" + require(`../../static/rating/regular_${props.star}.png`) + ")",
            backgroundSize: 'cover',
            marginRight: '3%'
        },
    }))
    
    const classes = useStyle(props)
    return (
        <div className={classes.stars}></div>
    )
}

export default Rating;