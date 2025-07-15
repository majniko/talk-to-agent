import { LOCALIZATION } from 'localization';

import { Button } from '@components/button';
import { Text } from '@components/text';
import { useAppDispatch } from '@redux/hooks';

import { callAgentModalActions } from '@redux/features/call-agent-modal/slice';

import classes from './call-agent-button.module.scss';

export const CallAgentButton = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(callAgentModalActions.toggleModal());
  };

  return (
    <Button onClick={onClick} className={classes.callAgentButton}>
      <Text text={LOCALIZATION.en.menu.callAgent} variant={'button-text'} />
    </Button>
  );
};
