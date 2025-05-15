"use client";

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import { Inter } from 'next/font/google';
import './globals.css';
import { useState } from 'react';
import { DisclaimerContent } from '@/components/disclaimer-content'; // Import the new component
import { PrivacyContent } from '@/components/privacy-content'; // Import the new PrivacyContent component
import { FundamentalsContent } from '@/components/fundamentals-content'; // Import the new component
import { ContactUsContent } from '@/components/contactus-content'; // Import the new component


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({ subsets: ['latin'] })


function OverviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-10 w-11/12 max-w-5xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-0">Welcome to DrawdownCalc!</h2>
        <DisclaimerContent />
        {/* <p className="text-gray-700">
          This is a brief description of the application. You can include details about the
          purpose, features, and how to use the app.
        </p> */}
      </div>
    </div>
  );
}

function MathematicsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-10 w-11/12 max-w-5xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-0">Fundamentals</h2>
        <FundamentalsContent />
      </div>
    </div>
  );
}

function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-10 w-11/12 max-w-5xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-0">Privacy</h2>
        <PrivacyContent />
      </div>
    </div>
  );
}

function ContactUsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-10 bg-white rounded-lg shadow-lg w-11/12 max-w-5xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-0">About</h2>
        <ContactUsContent />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isMathematicsOpen, setIsMathematicsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> {/* `${inter.className} ${geistMono.variable} antialiased` */}
        {children}
        <footer className="z-50 w-full mt-auto py-4 border-t-2 border-primary bg-background fixed bottom-0">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-28"> {/* Increased gap */}
            <div><a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOverviewOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Overview
            </a></div>
            <div><a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsMathematicsOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Fundamentals
            </a></div>
            <div><a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsPrivacyOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Privacy
            </a></div>
            <div><a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsContactUsOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              About
            </a></div>
          </div>
        </footer>
        <OverviewModal isOpen={isOverviewOpen} onClose={() => setIsOverviewOpen(false)} />
        <MathematicsModal isOpen={isMathematicsOpen} onClose={() => setIsMathematicsOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <ContactUsModal isOpen={isContactUsOpen} onClose={() => setIsContactUsOpen(false)} />
      </body>
    </html>
  );
}
