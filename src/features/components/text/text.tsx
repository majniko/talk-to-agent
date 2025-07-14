import classes from './text.module.scss';

export type TextProps = {
  variant?: 'default' | 'bold-spans-only' | 'bold-large';
  text: string;
};

export const Text = ({ variant = 'default', text }: TextProps) => {
  return (
    <p
      className={classes[variant]}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
