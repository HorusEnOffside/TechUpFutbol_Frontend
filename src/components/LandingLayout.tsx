import { HomeNavbar } from "./NavbarHome";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
}
