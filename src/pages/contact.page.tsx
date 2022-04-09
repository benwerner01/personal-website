import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { Theme } from "@mui/material";
import TwitterIcon from "../components/icons/TwitterIcon";
import LinkedInIcon from "../components/icons/LinkedInIcon";

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
          <li className={classes.li}>
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