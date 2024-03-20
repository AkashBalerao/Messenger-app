// RootLayout.tsx

import React from 'react';
import './globals.css';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';
import ToasterContext from './context/ToasterContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Messenger',
  description: 'Messenger Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
