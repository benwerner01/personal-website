import Head from "next/head";
import { ReactNode } from "react";

import { Body } from "./body";
import { MuiWrapper } from "./mui-wrapper";
import NavBar from "./nav-bar";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <MuiWrapper>
        <Body>
          <NavBar />
          {children}
        </Body>
      </MuiWrapper>
    </html>
  );
}
