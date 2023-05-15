import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Repository } from "../../lib/work/code";
import GitHubIcon from "../icons/GitHubIcon";

type CodeProjectRepositoriesProps = {
  mt?: number;
  repositories: Repository[];
};

const CodeProjectRepositories: React.FC<CodeProjectRepositoriesProps> = ({
  mt,
  repositories,
}) => (
  <Box mt={mt}>
    <Typography variant="h6" sx={{ marginTop: 1 }}>
      {`Repositor${repositories.length === 1 ? "y" : "ies"}`}
    </Typography>
    <Box display="flex" flexWrap="wrap" ml={1}>
      {repositories.map((repo) => (
        <Box key={repo.slug} display="flex" mt={1} mr={4}>
          <GitHubIcon />
          <Box sx={{ marginLeft: 1, position: "relative", top: -4 }}>
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
              <Typography sx={{ display: "block" }}>
                <i>{repo.comment}</i>
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default React.memo(CodeProjectRepositories);
