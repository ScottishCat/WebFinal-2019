import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router';
import Pagination from '../Components/SearchPage/Pagination';
import TopBar from '../Components/MainPage/TopBar';
import ResultList from '../Components/SearchPage/ResultList';
import { makeStyles } from '@material-ui/core/styles';
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
    },
    solid: {
        display: 'block',
        width: '100%',
        height: '64px',
        backgroundColor: '#FFFFFF'
    }
}))

const SearchPage = () => {
    const [logged, setLog] = useState(false)
    const classes = useStyle();
    let {userId} = useParams();
    let resultLists;
    useEffect(() => {
        if (userId && userId !== 'undefined'){
            setLog(true)
        }
        resultLists = JSON.parse(localStorage.getItem("searchList"))
    },[]);

    return (
        <div>
            <TopBar logged={logged} setLog={setLog} userId={userId}/>
            <div className={classes.solid}></div>
            <ResultList userId={userId} resultLists={resultLists}/>
            {/* <Pagination perPage={10} totalPages={100} paginate={()=>{console.log('Hi')}}/> */}
            <div className={classes.footer}>
                <p>Copyright © 2019-03-12 Yummy Inc.</p>
            </div>
        </div>
    )
}

export default SearchPage;