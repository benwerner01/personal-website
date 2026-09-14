import React from "react";
import type { Metadata } from "next";
import { Typography, Container, Box } from "@mui/material";
import GitHubIcon from "../components/icons/GitHubIcon";
import LinkedInIcon from "../components/icons/LinkedInIcon";
import TwitterIcon from "../components/icons/TwitterIcon";
import SoundCloudIcon from "../components/icons/SoundCloudIcon";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ben Werner",
  description:
    "The personal website of Ben Werner: software projects, photography and ways to get in touch.",
  path: "/",
});

type Social = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const SOCIALS: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/benwerner01",
    icon: <GitHubIcon sx={{ fontSize: 22 }} />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ben-werner",
    icon: <LinkedInIcon sx={{ fontSize: 22 }} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/benwerner01",
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/benwerner01",
    icon: <SoundCloudIcon sx={{ fontSize: 22 }} />,
  },
];

// A server component, so the `sx` props must be serialisable: the theme
// callbacks are written as sx theme keys and breakpoint objects instead
// (`common.black`, spacing units, `{ xs, md }`), which produce the same CSS.
const Home = () => (
  <Container>
    <Box
      sx={{
        my: 10,
      }}
    >
      <Typography>Hi, my name is</Typography>
      <Typography
        sx={{
          fontSize: { xs: 60, md: 100 },
          marginLeft: { xs: "-2px", md: "-5px" },
          marginBottom: { xs: "-5px", md: "-10px" },
        }}
        variant="h1"
      >
        Ben Werner
      </Typography>
      <Box
        sx={{
          display: "flex",
          mb: 1,
        }}
      >
        {SOCIALS.map(({ name, url, icon }) => (
          <Box
            component="a"
            key={name}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={name}
            title={name}
            sx={{
              marginRight: 1,
              backgroundColor: "common.black",
              width: 30,
              height: 30,
              borderRadius: 1,
              // theme.transitions.create("opacity")
              transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              opacity: 1,
              "&:hover": {
                opacity: 0.75,
              },
              svg: {
                color: "common.white",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
    </Box>
  </Container>
);

export default Home;
