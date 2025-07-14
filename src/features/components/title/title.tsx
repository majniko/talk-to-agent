import classes from './title.module.scss';

export type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps) => {
  return (
    <h1 className={classes.title} dangerouslySetInnerHTML={{ __html: text }} />
  );
};
