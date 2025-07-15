'use client';

import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { LOCALIZATION } from 'localization';

import { StyledLink } from './styled-link';
import { CallAgentButton } from './call-agent-button';

import classes from './menu.module.scss';
import { CallAgentModal } from '@modules/call-agent-modal/call-agent-modal';

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className={classes.menuWrapper}>
      <nav className={classes.nav}>
        <div
          className={clsx(classes.linkWrapper, {
            [classes.selected]: pathname === '/',
          })}
        >
          <StyledLink href="/" text={LOCALIZATION.en.menu.home} />
        </div>
        <div
          className={clsx(classes.linkWrapper, {
            [classes.selected]: pathname === '/products',
          })}
        >
          <StyledLink href={'/products'} text={LOCALIZATION.en.menu.products} />
        </div>
        <div
          className={clsx(classes.linkWrapper, {
            [classes.selected]: pathname === '/organization',
          })}
        >
          <StyledLink
            href={'/organization'}
            text={LOCALIZATION.en.menu.organization}
          />
        </div>
        <div
          className={clsx(classes.linkWrapper, {
            [classes.selected]: pathname === '/account',
          })}
        >
          <StyledLink href={'/account'} text={LOCALIZATION.en.menu.account} />
        </div>
        <div
          className={clsx(classes.linkWrapper, {
            [classes.selected]: pathname === '/help',
          })}
        >
          <StyledLink href={'/help'} text={LOCALIZATION.en.menu.help} />
        </div>
      </nav>
      <CallAgentButton />
      <CallAgentModal />
    </div>
  );
};
