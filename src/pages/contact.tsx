import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';

type ContactMethod = {
  name: string;
  href: string;
  Icon: React.FC<SvgIconProps>;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ben-werner/',
    Icon: LinkedInIcon,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/benwerner01',
    Icon: TwitterIcon,
  },
];

const useStyles = makeStyles((theme) => ({
  ul: {
    paddingLeft: 0,
  },
  li: {
    marginBottom: theme.spacing(1),
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
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
      <Typography variant="h3" component="h1">Contact Me</Typography>
      <ul className={classes.ul}>
        {CONTACT_METHODS.map(({ Icon, href, name }) => (
          <li className={classes.li}>
            <Icon fontSize="large" />
            <Typography className={classes.typography}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={href}
              >
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
