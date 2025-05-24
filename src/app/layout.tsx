import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import type { Metadata } from 'next';
import { ReactNode } from "react";
import SiteLayout from "../components/Layout";
import React from "react";

export const metadata: Metadata = {
  title: "TeachTeam (TT) Web System",
  description: 'A web system dedicated to the selection and hiring of casual tutors for courses offered at the School of Computer Science.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteLayout>{children}</SiteLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
