import NavBar from "./nav-bar";
import { MuiWrapper } from "./mui-wrapper";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MuiWrapper>
          <NavBar />
          {children}
        </MuiWrapper>
      </body>
    </html>
  );
}
