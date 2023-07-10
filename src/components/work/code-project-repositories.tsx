import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React from "react";

import { Repository } from "../../app/work/code/code";
import GitHubIcon from "../icons/github-icon";

const useStyles = makeStyles<Theme>((theme) => ({
  heading: {
    marginTop: theme.spacing(1),
  },
  URLWrapper: {
    marginLeft: theme.spacing(1),
    position: "relative",
    top: -4,
  },
  comment: {
    display: "block",
  },
}));

type CodeProjectRepositoriesProps = {
  mt?: number;
  repositories: Repository[];
};

const CodeProjectRepositories: React.FC<CodeProjectRepositoriesProps> = ({
  mt,
  repositories,
}) => {
  const classes = useStyles();

  return (
    <Box mt={mt}>
      <Typography variant="h6" className={classes.heading}>
        {`Repositor${repositories.length === 1 ? "y" : "ies"}`}
      </Typography>
      <Box display="flex" flexWrap="wrap" ml={1}>
        {repositories.map((repo) => (
          <Box key={repo.slug} display="flex" mt={1} mr={4}>
            <GitHubIcon />
            <Box className={classes.URLWrapper}>
              <Typography>
                <a
                  href={`https://github.com/${repo.slug}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {repo.slug}
                </a>
              </Typography>
              {repo.comment && (
                <Typography className={classes.comment}>
                  <i>{repo.comment}</i>
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(CodeProjectRepositories);
