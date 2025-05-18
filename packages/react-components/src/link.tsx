import type { AnchorHTMLAttributes } from 'react';
import { navigateToUrl } from 'single-spa';

export const Link = ({ children, className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={`cursor-pointer ${className}`}
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
