import clsx from 'clsx';
import { FC } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
