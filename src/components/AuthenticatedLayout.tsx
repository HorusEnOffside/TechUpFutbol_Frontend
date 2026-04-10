import { NavBarAuthenticated } from "./NavBarAuthenticated";


export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarAuthenticated />
      <main>{children}</main>
    </>
  );
}
