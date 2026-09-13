import React from "react";
import { Box, SvgIconProps, Typography, Container } from "@mui/material";
import TwitterIcon from "../components/icons/TwitterIcon";
import LinkedInIcon from "../components/icons/LinkedInIcon";
import PageHead from "../components/PageHead";

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

const ContactPage: React.FC = () => (
  <Container>
    <PageHead
      title="Contact — Ben Werner"
      description="Get in touch with Ben Werner on LinkedIn or Twitter."
      path="/contact"
    />
    <Typography variant="h1">Contact Me</Typography>
    <Box
      component="ul"
      sx={{
        paddingLeft: 0,
      }}
    >
      {CONTACT_METHODS.map(({ Icon, href, name }) => (
        <Box
          key={name}
          component="li"
          sx={{
            marginBottom: 1,
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon fontSize="large" />
          <Typography sx={{ marginLeft: 1, fontSize: 18 }}>
            <a rel="noopener noreferrer" target="_blank" href={href}>
              {name}
            </a>
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
);

export default ContactPage;
