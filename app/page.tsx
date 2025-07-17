"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { medivoxFeatures } from "@/data/medivox"; // Make sure this is correctly set
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from 'next/image';
// --- Navbar ---
const Navbar = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center">
        <Image src="/trans_bg.png" alt="logo" width={80} height={80} />
        <h1 className="text-base font-bold md:text-2xl">MediVox AI</h1>
      </div>

      {!isMounted ? null : !user ? (
        <Link href="/sign-in">
          <button className="w-24 transform rounded-lg bg-teal-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Link href="/dashboard">
            <Button className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-blue-50 py-12 mt-12 w-full">
    <div className="container mx-auto px-4 text-center text-gray-600">
      <p className="text-sm md:text-base mb-2">
        © {new Date().getFullYear()} <strong>MediVox AI</strong>. All rights reserved.
      </p>
      <p className="text-sm md:text-base mb-4">
        Empowering modern healthcare with voice-first AI assistance.
      </p>
    </div>
  </footer>
);


// --- Fade Animation ---
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// --- Home Page ---
export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      <Navbar />

      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Hero */}
      <main className="px-4 py-10 md:py-20 w-full flex-1 flex flex-col items-center">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Deliver instant, accurate medical assistance through neutral voice
          conversations. Automate appointment scheduling, symptom triage, and follow-up care 24/7.
        </motion.p>

        <Link href={"/dashboard"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-teal-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started
            </button>
          </motion.div>
        </Link>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 w-full bg-teal-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            AI-Powered Features for Modern Healthcare
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {medivoxFeatures.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                // variants={fadeIn}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-center space-y-4">
                  <feature.icon className="mx-auto text-5xl text-teal-600" />
                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600 w-full">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Empower Your Practice with MediVox AI
          </h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join healthcare providers delivering better patient care through
            intelligent automation and voice-driven assistance.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-teal-500 hover:bg-blue-50 animate-bounce"
            >
              Explore Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
