import React, {useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';

const axios = Axios.create();

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: 'solid #cccccc 1px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#fa877f',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    foot: {
        textAlign: 'center'
    },
    link: {
        fontSize: '15px'
    }
}));

const UserLoginPage = () => {
    const classes = useStyles();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('https://midi-fiction.glitch.me/api/login',{
            email: emailRef.current.value, 
            password: passwordRef.current.value
        },
        )
        .then(res=>{
            if (res.data.ret_code == 0){
                window.location.href=`#/main/${res.data.id}`
                console.log(res.headers)
            }
            else if (res.data.ret_code == 2){
                alert('Invalid Email!')
            }
            else{
                alert('Wrong Password!')
            }
        });
        // axios.get('http://10.215.222.72:4000/api/hello')
        // .then(res => {console.log(res)})
    } 
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={emailRef}
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={passwordRef}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitHandler}
                    >
                        Sign in
                    </Button>
                    <hr/>
                    <Grid container justify="center">
                        <Grid item className={classes.foot}>
                            <Link href='#/signup' variant="body2" className={classes.link}>
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default UserLoginPage;