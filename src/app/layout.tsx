import React from 'react';
import type { Metadata } from 'next';

import { Menu } from '@modules/menu';

import { StoreProvider } from './StoreProvider';

import './globals.scss';
import classes from './layout.module.scss';

export type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'talk to agent',
  description: 'App where you can talk to an agent named Jessica',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className={classes.rootLayout}>
            <Menu />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
