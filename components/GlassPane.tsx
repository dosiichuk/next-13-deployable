import { PropsWithChildren } from 'react';
import clsx from 'clsx';

const GlassPane: React.FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'glass rounded-2xl border-solid border-2 border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
