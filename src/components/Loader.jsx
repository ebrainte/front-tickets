import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Loader({ type }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {type === "linear" ? <LinearProgress /> : <CircularProgress />}
        </div>
    );
}