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

// New component for the small screen message
function SmallScreenMessage() {
  return (
    <div
      id="small-screen-message"
      style={{ display: 'none' }} // Initially hidden, CSS media query will show it
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-8 text-center text-gray-800"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
      <h1 className="text-3xl font-bold mb-4">Optimal Viewing Experience</h1>
      <p className="text-xl mb-3">
        DrawdownCalc is designed for larger screens.
      </p>
      <p className="text-lg">
        For the best user experience, please access this site using a tablet, laptop, or desktop computer.
      </p>
    </div>
  );
}

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
        <h2 className="text-2xl font-bold mb-4 mt-0">Overview</h2>
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
      <head>
        {/* Styles for the small screen message.
            Alternatively, these could be added to your globals.css file. */}
        <style jsx global>{`
          @media (max-width: 767px) { /* Targets phones and small tablets in portrait */
            #small-screen-message {
              display: flex !important; /* Show the message */
            }
            .main-app-container {
              display: none !important; /* Hide the main application content */
            }
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> {/* `${inter.className} ${geistMono.variable} antialiased` */}
        <SmallScreenMessage />
        <div className="main-app-container relative flex size-full min-h-screen flex-col bg-[#f8fcfc] group/design-root"> {/* Added main-app-container class */}
          <div className="layout-container flex flex-col min-h-screen"> {/* This div remains for layout structure within the app */}
            <header className="z-50 flex items-center justify-between whitespace-nowrap border-b border-[#dfdfe2] px-10 py-3 bg-[#fafafa] fixed top-0 w-full">
              <div className="flex items-center gap-4 text-[#008080]">
                {/* Wrap the icon and title in a Link */}
                <a href="/" className="flex items-center gap-4 text-[#008080] visited:text-[#008080] hover:text-[#008080]">
                  <h2 className="mt-0 text-lg font-bold leading-none tracking-[-0.015em]"><span className="inline-block">DrawdownCalc</span></h2>
                </a>
              </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <div><a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOverviewOpen(true);
                }}
                    className="text-[#008080] text-sm font-medium leading-normal" // Changed classes
              >
                Overview
              </a></div>
              <div><a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMathematicsOpen(true);
                }}
                    className="text-[#008080] text-sm font-medium leading-normal" // Changed classes
              >
                Fundamentals
              </a></div>
              <div><a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacyOpen(true);
                }}
                    className="text-[#008080] text-sm font-medium leading-normal" // Changed classes
              >
                Privacy
              </a></div>
              <div><a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactUsOpen(true);
                }}
                    className="text-[#008080] text-sm font-medium leading-normal" // Changed classes
              >
                About
              </a></div>
            </div>
          </div>
        </header>
            <main className="flex-grow pt-[2.875rem] pb-[5.125rem]">
              {children}
            </main>
            <footer className="z-50 w-full py-4 border-t-0 border-primary bg-background fixed bottom-0">
              <div className="container mx-auto flex flex-wrap items-center justify-center gap-28"> {/* Increased gap */}
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-[#45a1a1] text-sm font-normal leading-normal pb-1 pt-1 px-20 text-center line-clamp-2 min-h-[3.125rem]">
                  This website and its outputs should in no way be relied upon as financial, tax, investment, or retirement advice. The information provided does not constitute a
                  recommendation of any particular strategy or financial plan.
                </p>
              </div>
            </footer>
          </div> {/* Corresponds to layout-container */}
        <OverviewModal isOpen={isOverviewOpen} onClose={() => setIsOverviewOpen(false)} />
        <MathematicsModal isOpen={isMathematicsOpen} onClose={() => setIsMathematicsOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <ContactUsModal isOpen={isContactUsOpen} onClose={() => setIsContactUsOpen(false)} />
        </div> {/* Corresponds to main-app-container */}
    </body>
    </html>
  );
}
