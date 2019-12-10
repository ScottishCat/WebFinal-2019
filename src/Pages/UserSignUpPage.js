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

const UserSignUpPage = () => {
    const classes = useStyles();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        // console.log(firstNameRef.current.value)
        // console.log(lastNameRef.current.value)
        // console.log(emailRef.current.value)
        // console.log(passwordRef.current.value)
        axios.post('https://midi-fiction.glitch.me/api/signup',{
            name: firstNameRef.current.value + lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then(res => {
            if (res.data.ret_code == 0){
                alert("Success!");
                window.location.href="#/login"
            }
            else if(res.data.ret_code == 1){
                alert("Signup Failed. This email has already been used.")
            }
            else{
                alert("Invalid email!")
            }
        })

    }   
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={firstNameRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={lastNameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={passwordRef}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmitHandler}
                    >
                        Sign Up
                    </Button>
                    <hr/>
                    <Grid container justify="center">
                        <Grid item className={classes.foot}>
                            <Link href="#/login" variant="body2" className={classes.link}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default UserSignUpPage;