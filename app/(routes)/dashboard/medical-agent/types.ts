import { doctorAgent } from "../_components/DoctorAgentCard";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
  voiceId?: string;
};