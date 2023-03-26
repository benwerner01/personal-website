import React from "react";
import { makeStyles } from "@mui/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material";
import GitHubIcon from "../components/icons/GitHubIcon";
import LinkedInIcon from "../components/icons/LinkedInIcon";
import TwitterIcon from "../components/icons/TwitterIcon";

type Social = {
  name: string;
  url: string;
  Icon: React.FC<SvgIconProps>;
};

const SOCIALS: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/benwerner01",
    Icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ben-werner",
    Icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/benwerner01",
    Icon: TwitterIcon,
  },
];

const useHomeStyles = makeStyles<Theme>((theme) => ({
  social: {
    marginRight: theme.spacing(1),
    "& svg": {
      width: 30,
      height: 30,
      opacity: 1,
      transition: theme.transitions.create("opacity"),
      "&:hover": {
        opacity: 0.75,
      },
    },
  },
  title: {
    fontSize: 100,
    marginLeft: -5,
    marginBottom: -10,
    [theme.breakpoints.down("md")]: {
      fontSize: 60,
      marginLeft: -2,
      marginBottom: -5,
    },
  },
}));

const Home = () => {
  const classes = useHomeStyles();
  return (
    <Container>
      <Box my={10}>
        <Typography>Hi, my name is</Typography>
        <Typography className={classes.title} variant="h1">
          Ben Werner
        </Typography>
        <Box display="flex" mb={1}>
          {SOCIALS.map(({ name, url, Icon }) => (
            <a
              key={name}
              className={classes.social}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon />
            </a>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
