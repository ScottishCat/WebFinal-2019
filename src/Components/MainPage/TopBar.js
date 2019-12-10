import React, {useState, useRef} from 'react';
import {useParams} from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Axios from 'axios';

const axios = Axios.create();

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    AppBar: {
        backgroundColor: '#fa877f',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        fontFamily: 'Pacifico, cursive',
        fontSize: '30px',
        textDecoration: 'none',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: '2px',
        backgroundColor: fade('#FFFFFF', 0.3),
        '&:hover': {
            backgroundColor: fade('#FFFFFF', 0.3),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        color: '#FFFFFF',
        padding: theme.spacing(1, 1, 1, 7),

        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 250,
            '&:focus': {
                width: 300,
            },
        },
    },
    ButtonSet: {
        display: 'flex'
    },
    Button: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1%',
            display: 'flex',
            flexWrap: 'nowrap',
            fontSize: '18px'
        }
    },
    MenuButton: {
        color: '#FFFFFF',
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
}));

const TopBar = (props) => {
    const classes = useStyles();
    const inputRef = useRef(null);
    // Handle Search Event
    const SearchHandler = (e) => {
        if (e.keyCode == 13) {
            axios.get(`https://midi-fiction.glitch.me/api/byBname/${inputRef.current.value}`)
            .then(res=>{
                // console.log(res.data);
                localStorage.setItem("searchList",JSON.stringify(res.data));
                console.log(JSON.parse(localStorage.getItem("searchList")))
                window.location.href=`#/search/${props.userId}`
                window.location.reload();
            })
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const goLogin = (e) => {
        e.preventDefault();
        window.location.href="#/login";
    }

    const goSignup = (e) => {
        e.preventDefault();
        window.location.href="#/signup";
    }

    const goProfile = (e) => {
        e.preventDefault();
        window.location.href=`#/profile/${props.userId}`
    }

    const goHome = (e) => {
        e.preventDefault();
        window.location.href=`#/main/${props.userId}`
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.AppBar}>
                <Toolbar>
                    <Link className={classes.title} to={`/main/${props.userId}`}>
                        Yummy
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onKeyDown={SearchHandler}
                            placeholder="Search for your interests..."
                            inputRef={inputRef}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    {props.logged ?
                        <div>
                            <IconButton onClick={handleClick}>
                                <AccountCircle fontSize='large' />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={goHome}>Home</MenuItem>
                                <MenuItem onClick={goProfile}>Profile</MenuItem>
                                <MenuItem onClick={goLogin}>Log out</MenuItem>
                            </Menu>
                        </div>
                        :
                        <div className={classes.ButtonSet}>
                            <IconButton className={classes.MenuButton} onClick={handleClick}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={goSignup}>Sign Up</MenuItem>
                                <MenuItem onClick={goLogin}>Log in</MenuItem>
                            </Menu>
                            <Button
                                color="inherit"
                                className={classes.Button}
                                onClick={() => { window.location.href='#/login' }}>
                                Login
                            </Button>
                            <Button color="inherit"
                                className={classes.Button}
                                onClick={() => { window.location.href='#/signup' }}>
                                Signup
                            </Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default withRouter(TopBar);