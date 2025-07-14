import Image from 'next/image';
import { LOCALIZATION } from 'localization';

import { Title } from '@components/title';
import { Text } from '@components/text';

import classes from './account.module.scss';

export const Account = () => {
  return (
    <div className={classes.pageWrapper}>
      <div className={classes.titleWrapper}>
        <Title text={LOCALIZATION.en.home.title} />
      </div>
      <div className={classes.textWrapper}>
        <Text variant={'bold-spans-only'} text={LOCALIZATION.en.account.text} />
      </div>
      <div className={classes.statementsWrapper}>
        <div className={classes.statement}>
          <Image
            src={'/static/images/Coins.svg'}
            alt={'coins'}
            height={24}
            width={24}
          />
          <Text
            variant={'bold-large'}
            text={LOCALIZATION.en.home.statements.first}
          />
        </div>
        <div className={classes.statement}>
          <Image
            src={'/static/images/ChartLineUp.svg'}
            alt={'coins'}
            height={24}
            width={24}
          />
          <Text
            variant={'bold-large'}
            text={LOCALIZATION.en.home.statements.second}
          />
        </div>
        <div className={classes.statement}>
          <Image
            src={'/static/images/ShieldCheck.svg'}
            alt={'coins'}
            height={24}
            width={24}
          />
          <Text
            variant={'bold-large'}
            text={LOCALIZATION.en.home.statements.third}
          />
        </div>
      </div>
    </div>
  );
};
