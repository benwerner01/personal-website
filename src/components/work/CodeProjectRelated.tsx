import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DescriptionIcon from "@material-ui/icons/Description";
import { Related } from "../../lib/work/code";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(1),
  },
  ul: {
    marginTop: 0,
    marginBottom: 0,
    listStyleType: "none",
    paddingLeft: theme.spacing(1),
  },
  li: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  title: {
    // marginLeft: theme.spacing(0.5),
  },
}));

type CodeProjectRelatedProps = {
  mt?: number;
  related: Related[];
};

const CodeProjectRelated: React.FC<CodeProjectRelatedProps> = ({
  mt,
  related,
}) => {
  const classes = useStyles();

  return (
    <Box mt={mt}>
      <Typography variant="h6" className={classes.heading}>
        Related
      </Typography>
      <ul className={classes.ul}>
        {related.map((relatedItem) => (
          <li key={relatedItem.title} className={classes.li}>
            <DescriptionIcon />
            <Box ml={1}>
              <Typography className={classes.title}>
                <a
                  href={relatedItem.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {relatedItem.title}
                </a>
                {relatedItem.variant === "Paper" && relatedItem.book && (
                  <>
                    {" published in "}
                    <a
                      href={relatedItem.book.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {relatedItem.book.name}
                    </a>
                  </>
                )}
              </Typography>
              {relatedItem.variant !== "Misc" && (
                <Typography>
                  <i>{relatedItem.type || relatedItem.variant}</i>
                </Typography>
              )}
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default React.memo(CodeProjectRelated);
