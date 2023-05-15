import React from "react";
import { Typography, Container, Box } from "@mui/material";
import GitHubIcon from "../components/icons/GitHubIcon";
import LinkedInIcon from "../components/icons/LinkedInIcon";
import TwitterIcon from "../components/icons/TwitterIcon";
import SoundCloudIcon from "../components/icons/SoundCloudIcon";

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

const Home = () => (
  <Container>
    <Box my={10}>
      <Typography>Hi, my name is</Typography>
      <Typography
        sx={({ breakpoints }) => ({
          fontSize: 100,
          marginLeft: "-5px",
          marginBottom: "-10px",
          [breakpoints.down("md")]: {
            fontSize: 60,
            marginLeft: "-2px",
            marginBottom: "-5px",
          },
        })}
        variant="h1"
      >
        Ben Werner
      </Typography>
      <Box display="flex" mb={1}>
        {SOCIALS.map(({ name, url, icon }) => (
          <Box
            component="a"
            key={name}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              marginRight: ({ spacing }) => spacing(1),
              backgroundColor: ({ palette }) => palette.common.black,
              width: 30,
              height: 30,
              borderRadius: 1,
              transition: ({ transitions }) => transitions.create("opacity"),
              opacity: 1,
              "&:hover": {
                opacity: 0.75,
              },
              svg: {
                color: ({ palette }) => palette.common.white,
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
