import '../../styles/global.css';

import { PropsWithChildren } from 'react';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center ">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default DashboardLayout;
