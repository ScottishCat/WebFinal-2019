import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const Rating = (props) => {

    const useStyle = makeStyles(theme=>({
        stars:{
            display: 'flex',
            width: '85px',
            height: '14px',
            [theme.breakpoints.up('md')]:{
                width: '120px',
                height: '20px',
            },
            background: "url(" + require(`../../static/rating/small_${props.star}.png`) + ")",
            backgroundSize: 'cover',
            marginLeft: '5%',
            marginRight: '3%'
        },
    }))
    
    const classes = useStyle(props)
    return (
        <div className={classes.stars}></div>
    )
}

export default Rating;