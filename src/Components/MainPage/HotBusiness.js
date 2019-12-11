import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Gallery from './Gallery';
import { fontWeight } from '@material-ui/system';
const useStyle = makeStyles(theme=>({
    container: {
        display: 'block',
        height: '30vh',
        width: '100vw',
        backgroundColor: '#FFFFFF',
        textAlign:'center',
        [theme.breakpoints.down('sm')]:{
            maxHeight: '22vh'
          }
    },
    title:{
        fontSize: '2vw',
        fontWeight: 'bold',
        color:'#fa877f',
        [theme.breakpoints.down('md')]:{
            marginTop: '5%',
            fontSize: '2vh'
        }
    }
})) 
const HotBusiness = (props) =>{
    const classes = useStyle()
    return (
        <div className={classes.container}>
            <p className={classes.title}>Great spots near you</p>
            <hr style={{width:'60%'}} color='#f4f4f4'/>
            <Gallery cols='3.5'/>
        </div>
    )
}

export default HotBusiness;