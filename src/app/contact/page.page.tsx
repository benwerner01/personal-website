"use client";

import { Theme } from "@mui/material";
import Container from "@mui/material/Container";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React from "react";

import LinkedInIcon from "../../components/icons/linkedin-icon";
import TwitterIcon from "../../components/icons/twitter-icon";

type ContactMethod = {
  name: string;
  href: string;
  Icon: React.FC<SvgIconProps>;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ben-werner/",
    Icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/benwerner01",
    Icon: TwitterIcon,
  },
];

const useStyles = makeStyles<Theme>((theme) => ({
  ul: {
    paddingLeft: 0,
  },
  li: {
    marginBottom: theme.spacing(1),
    listStyleType: "none",
    display: "flex",
    alignItems: "center",
  },
  typography: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
  },
}));

const ContactPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h1">Contact Me</Typography>
      <ul className={classes.ul}>
        {CONTACT_METHODS.map(({ Icon, href, name }) => (
          <li key={href} className={classes.li}>
            <Icon fontSize="large" />
            <Typography className={classes.typography}>
              <a rel="noopener noreferrer" target="_blank" href={href}>
                {name}
              </a>
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ContactPage;
