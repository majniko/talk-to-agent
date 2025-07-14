import Link from 'next/link';

import classes from './styled-link.module.scss';

export type StyledLinkProps = {
  href: string;
  text: string;
};

export const StyledLink = ({ href, text }: StyledLinkProps) => {
  return (
    <div className={classes.styledLink}>
      <Link href={href} className={classes.link}>
        {text}
      </Link>
    </div>
  );
};
