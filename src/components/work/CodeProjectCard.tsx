import React from 'react';
import Link from 'next/link';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CodeProject } from '../../lib/work/code';
import { WORK_VARIANT_PALETTE } from '../../lib/work';
import CodeProjectRepositories from './CodeProjectRepositories';
import CodeProjectRelated from './CodeProjectRelated';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
  },
  blurb: {
    marginTop: theme.spacing(1),
  },
  buttonWrapper: {
    '& a': {
      marginLeft: theme.spacing(1),
    },
  },
  moreButtonRoot: {
    borderColor: WORK_VARIANT_PALETTE.code,
    color: WORK_VARIANT_PALETTE.code,
    '&:hover': {
      backgroundColor: Color(WORK_VARIANT_PALETTE.code).lighten(0.9).fade(0.8).hex(),
      '& $moreButtonEndIcon': {
        left: 3,
      },
    },
  },
  moreButtonEndIcon: {
    position: 'relative',
    transition: theme.transitions.create('left'),
    left: 0,
    '& > *:first-child': {
      fontSize: 16,
    },
  },
}));

type CodeProjectPreviewProps = {
  project: CodeProject;
}

const CodeProjectPreview: React.FC<CodeProjectPreviewProps> = ({ project }) => {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.cardRoot }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">
            <strong>
              {project.name}
            </strong>
          </Typography>
          <Box display="flex" className={classes.buttonWrapper}>
            {project.url && (
              <a href={project.url} rel="noopener noreferrer" target="_blank">
                <Button variant="outlined">
                  Visit
                </Button>
              </a>
            )}
            <Link href={`/work/code/${project.slug}`}>
              <a>
                <Button
                  classes={{
                    root: classes.moreButtonRoot,
                    endIcon: classes.moreButtonEndIcon,
                  }}
                  variant="outlined"
                  endIcon={<ArrowForwardIosIcon />}
                >
                  More
                </Button>
              </a>
            </Link>
          </Box>
        </Box>
        {project.blurb && (
          <Typography className={classes.blurb}>{project.blurb}</Typography>
        )}
        {project.repositories && project.repositories.length > 0 && (
          <CodeProjectRepositories repositories={project.repositories} />
        )}
        {project.related && project.related.length > 0 && (
          <CodeProjectRelated related={project.related} />
        )}
      </CardContent>
    </Card>
  );
};

export default CodeProjectPreview;
