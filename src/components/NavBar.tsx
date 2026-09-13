import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type NavBarItemDefinition = {
  href: string;
  label: string;
  position: "left" | "right";
  /** `false` stops Next.js prefetching the route's chunks on every page */
  prefetch?: false;
};

const NAV_BAR_ITEMS: NavBarItemDefinition[] = [
  { href: "/", label: "BW", position: "left" },
  { href: "/work", label: "Work", position: "left" },
  { href: "/gallery", label: "Gallery", position: "left" },
  // the 3D page's chunks (three.js, ~216 kB gz) shouldn't be downloaded on
  // every other page; hover/focus still prefetches them
  { href: "/3d", label: "3D", position: "left", prefetch: false },
  { href: "/contact", label: "Contact", position: "right" },
];

export const NAV_BAR_HEIGHT = 40;

const NavBarItem: FC<NavBarItemDefinition & { isActive: boolean }> = ({
  label,
  href,
  isActive,
  prefetch,
}) => (
  <Box m={1}>
    <Typography>
      <Link
        href={href}
        prefetch={prefetch}
        style={{ fontWeight: isActive ? 800 : 400 }}
      >
        {label}
      </Link>
    </Typography>
  </Box>
);

const NavBar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      px={2}
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
          ),
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
          ),
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
