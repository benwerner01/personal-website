import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type NavBarItem = {
  href: string;
  label: string;
  position: "left" | "right";
};

const NAV_BAR_ITEMS: NavBarItem[] = [
  { href: "/", label: "BW", position: "left" },
  { href: "/work", label: "Work", position: "left" },
  { href: "/gallery", label: "Gallery", position: "left" },
  { href: "/contact", label: "Contact", position: "right" },
];

export const NAV_BAR_HEIGHT = 40;

const NavBar: React.FC = () => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const mapNavBarItemToElement = ({ label, href }: NavBarItem) => (
    <Box m={1} key={label}>
      <Typography>
        <Link href={href}>
          <a style={{ fontWeight: pathname === href ? 800 : 400 }}>{label}</a>
        </Link>
      </Typography>
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={xs ? 1 : 2}
      height={40}
    >
      <Box display="flex">
        {NAV_BAR_ITEMS.filter(({ position }) => position === "left").map(
          mapNavBarItemToElement
        )}
      </Box>
      <Box display="flex">
        {NAV_BAR_ITEMS.filter(({ position }) => position === "right").map(
          mapNavBarItemToElement
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
