import '../../styles/global.css';

import { PropsWithChildren } from 'react';
import GlassPane from '@/components/GlassPane';

const AuthRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
