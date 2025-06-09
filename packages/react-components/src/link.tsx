import type { AnchorHTMLAttributes } from 'react';
import { Link as ReactRouterLink, useInRouterContext } from 'react-router-dom';
import { navigateToUrl } from 'single-spa';

export const Link = ({ children, className: classNameParam, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInReactRouter = useInRouterContext();
  const className = `cursor-pointer ${classNameParam}`;

  if (isInReactRouter) {
    return (
      <ReactRouterLink className={className} {...rest} to={rest.href!}>
        {children}
      </ReactRouterLink>
    );
  }

  return (
    <a
      className={className}
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
