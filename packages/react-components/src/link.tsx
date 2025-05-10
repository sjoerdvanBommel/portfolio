import { navigateToUrl } from "single-spa";

export const Link = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return <a href={href} onClick={navigateToUrl}>{children}</a>;
};