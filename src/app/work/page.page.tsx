"use client";

import React, { useMemo } from "react";
import Container from "@mui/material/Container";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { WORK_ITEMS, WorkVariant, tbdIsWorkVariant } from "./work";
import CodeProjectCard from "../../components/work/CodeProjectCard";

const parseCurrentVariant = (params: {
  pathname: string;
}): WorkVariant | undefined => {
  const { pathname } = params;

  const hashIndex = pathname.indexOf("#");

  if (hashIndex < 0) return undefined;

  const variant = pathname.slice(hashIndex + 1);

  return tbdIsWorkVariant(variant) ? variant : undefined;
};

export const metadata = {
  title: "Ben Werner - Work",
};

const WorkPage: NextPage = () => {
  const pathname = usePathname();

  const currentVariant = useMemo(
    () => (pathname ? parseCurrentVariant({ pathname }) : undefined),
    [pathname]
  );

  return (
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
      {WORK_ITEMS.filter(({ variant }) =>
        currentVariant ? variant === currentVariant : true
      ).map((item) =>
        item.variant === "code" ? (
          <CodeProjectCard key={item.name} project={item} />
        ) : null
      )}
    </Container>
  );
};

export default WorkPage;
