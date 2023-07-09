import { ReactNode } from "react";
import NavBar from "./nav-bar";
import { MuiWrapper } from "./mui-wrapper";
import { Body } from "./body";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <MuiWrapper>
        <Body>
          <NavBar />
          {children}
        </Body>
      </MuiWrapper>
    </html>
  );
}
