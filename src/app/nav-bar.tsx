"use client";

import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

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
  <Box m={1}>
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
      display="flex"
      justifyContent="space-between"
      px={xs ? 1 : 2}
      height={40}
    >
      <Box display="flex">
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
      <Box display="flex">
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
