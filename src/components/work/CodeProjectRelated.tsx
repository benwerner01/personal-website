import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { Related } from '../../lib/work/code';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(1),
  },
  ul: {
    marginTop: 0,
    marginBottom: 0,
    listStyleType: 'none',
    paddingLeft: theme.spacing(1),
  },
  li: {
    display: 'flex',
  },
  title: {
    marginLeft: theme.spacing(0.5),
  },
}));

type CodeProjectRelatedProps = {
  related: Related[]
}

const CodeProjectRelated: React.FC<CodeProjectRelatedProps> = ({
  related,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Related
      </Typography>
      <ul className={classes.ul}>
        {related.map((relatedItem) => (
          <li key={relatedItem.title} className={classes.li}>
            <DescriptionIcon />
            <Typography className={classes.title}>
              <a href={relatedItem.url} rel="noopener noreferrer" target="_blank">{relatedItem.title}</a>
              {relatedItem.variant !== 'Misc' && (
                <>
                  {' '}
                  <i>{relatedItem.variant}</i>
                </>
              )}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(CodeProjectRelated);
