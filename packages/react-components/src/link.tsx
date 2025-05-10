import type { AnchorHTMLAttributes } from 'react';
import { navigateToUrl } from 'single-spa';

export const Link = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        navigateToUrl(rest.href!);
      }}
    >
      {children}
    </a>
  );
};
