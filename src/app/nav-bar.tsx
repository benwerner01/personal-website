"use client";

import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

type NavBarItemDefinition = {
  href: string;
  label: string;
  position: "left" | "right";
};

const NAV_BAR_ITEMS: NavBarItemDefinition[] = [
  { href: "/", label: "BW", position: "left" },
  { href: "/work", label: "Work", position: "left" },
  { href: "/gallery", label: "Gallery", position: "left" },
  { href: "/3d", label: "3D", position: "left" },
  { href: "/contact", label: "Contact", position: "right" },
];

export const NAV_BAR_HEIGHT = 40;

const NavBarItem: FC<NavBarItemDefinition & { isActive: boolean }> = ({
  label,
  href,
  isActive,
}) => (
  <Box component="div" m={1}>
    <Typography>
      <Link href={href} style={{ fontWeight: isActive ? 800 : 400 }}>
        {label}
      </Link>
    </Typography>
  </Box>
);

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="space-between"
      px={xs ? 1 : 2}
      height={40}
    >
      <Box component="div" display="flex">
        {NAV_BAR_ITEMS.filter(({ position }) => position === "left").map(
          (item) => (
            <NavBarItem
              key={item.label}
              isActive={pathname === item.href}
              {...item}
            />
          )
        )}
      </Box>
      <Box component="div" display="flex">
        {NAV_BAR_ITEMS.filter(({ position }) => position === "right").map(
          (item) => (
            <NavBarItem
              key={item.label}
              isActive={pathname === item.href}
              {...item}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
