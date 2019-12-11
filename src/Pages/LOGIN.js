import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    div: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'row',
        width: '100vw',
        alignItems: 'center',
    },
    div1: {
        display: 'flex',
        flexDirection: 'column',
        width: '50vw',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn() {
    const classes = useStyles();
    return (
        <div  className={classes.div}>
	<div1  className={classes.div1}>
    Users
 <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           <Link>Login as User</Link>
  </Button>
 
	</div1>

	<div1  className={classes.div1}>
     {/* <Grid item xs={12} md={6}> */}
   Business
  <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Link>Login as Business</Link>
  </Button>
	</div1>
</div>
    )
};

export default SignIn;