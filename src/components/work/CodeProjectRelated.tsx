import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Typography } from "@mui/material";
import { Related } from "../../lib/work/code";

type CodeProjectRelatedProps = {
  mt?: number;
  /** Heading element for the section title, so the page keeps a valid heading order */
  headingComponent: "h2" | "h3";
  related: Related[];
};

const CodeProjectRelated: React.FC<CodeProjectRelatedProps> = ({
  mt,
  headingComponent,
  related,
}) => (
  <Box mt={mt}>
    <Typography variant="h6" component={headingComponent} sx={{ marginTop: 1 }}>
      Related
    </Typography>
    <Box
      component="ul"
      sx={{
        marginTop: 0,
        marginBottom: 0,
        listStyleType: "none",
        paddingLeft: 1,
      }}
    >
      {related.map((relatedItem) => (
        <Box
          component="li"
          key={relatedItem.title}
          sx={{ display: "flex", marginTop: 1 }}
        >
          <DescriptionIcon />
          <Box ml={1}>
            <Typography>
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
        </Box>
      ))}
    </Box>
  </Box>
);

export default React.memo(CodeProjectRelated);
