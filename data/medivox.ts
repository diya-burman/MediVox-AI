// @/data/medivox.ts

import {
  FaStethoscope,
  FaRobot,
  FaCalendarCheck,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdSchedule, MdHealthAndSafety, MdAutoFixHigh } from "react-icons/md";

export const medivoxStats = [
  { value: "25K+", label: "Patients Assisted" },
  { value: "98%", label: "Accuracy in Triage" },
  { value: "150+", label: "Hospitals Onboarded" },
  { value: "24/7", label: "AI Availability" },
];

export const medivoxFeatures = [
  {
    icon: FaRobot,
    title: "Voice AI Assistant",
    description:
      "Offer human-like interaction with patients via voice commands.",
  },
  {
    icon: MdSchedule,
    title: "Appointment Scheduling",
    description: "Let patients book, cancel, or reschedule with AI assistance.",
  },
  {
    icon: FaStethoscope,
    title: "Symptom Triage",
    description: "Identify symptoms and direct patients to the right care.",
  },
  {
    icon: MdHealthAndSafety,
    title: "Follow-Up Automation",
    description: "Remind patients for check-ups, medication, and reports.",
  },
  {
    icon: FaPhoneAlt,
    title: "Smart IVR",
    description:
      "Replace traditional IVR with intelligent, context-aware routing.",
  },
  {
    icon: MdAutoFixHigh,
    title: "Multilingual Support",
    description: "Engage patients in their native language seamlessly.",
  },
];

export const medivoxHowItWorks = [
  {
    icon: FaPhoneAlt,
    title: "Patient Calls the Clinic",
    description: "The AI agent picks up and starts the conversation instantly.",
  },
  {
    icon: FaRobot,
    title: "Voice AI Handles the Request",
    description:
      "From appointment booking to triage, everything is managed by AI.",
  },
  {
    icon: MdHealthAndSafety,
    title: "Information Logged Securely",
    description:
      "The system updates your EHR or dashboard with relevant details.",
  },
];

export const medivoxTestimonials = [
  {
    name: "Dr. Ayesha Khan",
    role: "Cardiologist, Apollo",
    image: "/avatars/ayesha.png",
    quote:
      "MediVox AI has saved my staff hours every day and improved patient satisfaction drastically.",
  },
  {
    name: "Dr. Raj Patel",
    role: "Clinic Director, MedCare",
    image: "/avatars/raj.png",
    quote: "The voice interface feels natural and reliable—patients love it!",
  },
  {
    name: "Dr. Emily Green",
    role: "Pediatrician, Lifeline Hospital",
    image: "/avatars/emily.png",
    quote: "Follow-up care automation has increased our revisit rate by 40%.",
  },
];
