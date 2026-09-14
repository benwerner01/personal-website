import React from "react";
import type { Metadata } from "next";
import Container from "@mui/material/Container";
import { WORK_ITEMS } from "../../lib/work";
import CodeProjectCard from "../../components/work/CodeProjectCard";
import { pageMetadata } from "../../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work — Ben Werner",
  description: `Software projects by Ben Werner: ${WORK_ITEMS.map(
    ({ name }) => name,
  ).join(", ")}.`,
  path: "/work",
});

// The Pages Router version filtered WORK_ITEMS by a `#<variant>` URL hash.
// "code" is the only variant and every item has it, so the filter never
// changed the output; a server component cannot read the hash anyway.
const WorkPage = () => (
  <Container maxWidth="md">
    {/* <Box display="flex" mt={1} mb={4}>
      {WORK_VARIANTS.map((variant) => (
        <Link
          key={variant}
          href={currentVariant === variant ? '/work' : `/work#${variant}`}
        >
          <Chip
            label={(
              <Typography>
                #
                {variant}
              </Typography>
            )}
            component="a"
            variant="outlined"
          />
        </Link>
      ))}
    </Box> */}
    {WORK_ITEMS.map((item) =>
      item.variant === "code" ? (
        <CodeProjectCard key={item.name} project={item} />
      ) : null,
    )}
  </Container>
);

export default WorkPage;
