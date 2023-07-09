"use client";

import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

export const Body: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <Box
    component="body"
    sx={{
      background: ({ palette }) => palette.background.default,
      transition: ({ transitions }) => transitions.create("background"),
    }}
  >
    {children}
  </Box>
);
