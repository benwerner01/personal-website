import React, { FunctionComponent, PropsWithChildren } from "react";
import { Typography, Box, Paper } from "@mui/material";
import Color from "color";

type MacOSWindowProps = PropsWithChildren<{
  title?: string;
  shadow?: boolean;
}>;

const MacOSWindow: FunctionComponent<MacOSWindowProps> = ({
  children,
  title,
  shadow = true,
}) => (
  <Paper
    sx={{
      position: "relative",
      overflow: "hidden",
      borderColor: ({ palette }) => palette.grey[300],
      borderWidth: 1,
      borderStyle: "solid",
      boxShadow: shadow ? undefined : "none",
    }}
  >
    <Box
      sx={({ breakpoints }) => ({
        left: 3,
        top: 6,
        position: "absolute",
        [breakpoints.down("sm")]: {
          top: 0,
          left: 2,
        },
        "& span": {
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          marginLeft: "9px",
          [breakpoints.down("sm")]: {
            marginLeft: "6px",
            width: 10,
            height: 10,
          },
        },
      })}
    >
      <Box
        component="span"
        sx={{
          backgroundColor: "rgb(238, 107, 96)",
          borderColor: Color("rgb(238, 107, 96)").darken(0.1).rgb().string(),
        }}
      />
      <Box
        component="span"
        sx={{
          backgroundColor: "rgb(246, 190, 80)",
          borderColor: Color("rgb(246, 190, 80)").darken(0.1).rgb().string(),
        }}
      />
      <Box
        component="span"
        sx={{
          backgroundColor: "rgb(98, 196, 84)",
          borderColor: Color("rgb(98, 196, 84)").darken(0.1).rgb().string(),
        }}
      />
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      sx={({ palette, breakpoints }) => ({
        height: 30,
        borderBottomColor: palette.grey[300],
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        [breakpoints.down("sm")]: {
          height: 20,
        },
      })}
    >
      {title && (
        <Typography
          sx={({ breakpoints }) => ({
            [breakpoints.down("sm")]: {
              fontSize: 14,
            },
          })}
          variant="h6"
        >
          {title}
        </Typography>
      )}
    </Box>
    {children}
  </Paper>
);

export default MacOSWindow;
