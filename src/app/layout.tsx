"use client";

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { useState } from 'react';
import { DisclaimerContent } from '@/components/disclaimer-content'; // Import the new component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function OverviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Mathematics</h2>
        <p className="text-gray-700">
          This modal contains information about the mathematics behind the application.
        </p>
      </div>
    </div>
  );
}

function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Privacy</h2>
        <p className="text-gray-700">
          This modal contains information about the privacy policy of the application.
        </p>
      </div>
    </div>
  );
}

function ContactUsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl h-5/6 overflow-auto relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          This modal contains contact information for the application.
        </p>
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="w-full mt-auto py-4 border-t border-border bg-background">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-10"> {/* Increased gap */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOverviewOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Overview
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsMathematicsOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Mathematics
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsPrivacyOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsContactUsOpen(true);
              }}
              className="text-black text-sm font-bold hover:underline" // Changed classes
            >
              Contact Us
            </a>
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
