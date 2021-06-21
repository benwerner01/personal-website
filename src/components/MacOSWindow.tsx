import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Color from 'color';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    position: 'relative',
    overflow: 'hidden',
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderStyle: 'solid',
  },
  fakeButtons: {
    left: 3,
    top: 6,
    position: 'absolute',
    '& span': {
      display: 'inline-block',
      width: 12,
      height: 12,
      borderRadius: '50%',
      borderWidth: 1,
      borderStyle: 'solid',
      marginLeft: 9,
      '&:nth-child(1)': {
        backgroundColor: 'rgb(238, 107, 96)',
        borderColor: Color('rgb(238, 107, 96)').darken(0.1).rgb().string(),
      },
      '&:nth-child(2)': {
        backgroundColor: 'rgb(246, 190, 80)',
        borderColor: Color('rgb(246, 190, 80)').darken(0.1).rgb().string(),
      },
      '&:nth-child(3)': {
        backgroundColor: 'rgb(98, 196, 84)',
        borderColor: Color('rgb(98, 196, 84)').darken(0.1).rgb().string(),
      },
    },
  },
  header: {
    height: 30,
    borderBottomColor: theme.palette.grey[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  content: {
    overflow: 'hidden',
    marginBottom: -5,
  },
}));

type MacOSWindowProps = {
  title?: string;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({
  children, title,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperRoot}>
      <Box className={classes.fakeButtons}>
        <span />
        <span />
        <span />
      </Box>
      <Box display="flex" justifyContent="center" className={classes.header}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box className={classes.content}>
        {children}
      </Box>
    </Paper>
  );
};

export default MacOSWindow;
