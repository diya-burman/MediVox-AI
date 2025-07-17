"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall, PhoneOff, Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import Provider from "@/app/provider";
import { toast } from "sonner";
import { SessionDetail } from "../types";

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const callStartHandler = () => {
    console.log("Call started");
    setCallStarted(true);
  };

  const callEndHandler = () => {
    console.log("Call ended");
    setCallStarted(false);
  };

  const messageHandler = (message: any) => {
    if (message.type === "transcript") {
      const { role, transcriptType, transcript } = message;
      console.log(`${role}: ${transcript}`);
      if (transcriptType == "partial") {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      } else if (transcriptType == "final") {
        setMessages((prev) => [...prev, { role, text: transcript }]);
        setLiveTranscript("");
        setCurrentRole(null);
      }
    }
  };

  const speechStartHandler = () => {
    console.log("Assistant started speaking");
    setCurrentRole("assistant");
  };

  const speechEndHandler = () => {
    console.log("Assistant stopped speaking");
    setCurrentRole("user");
  };

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "MediVox AI Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    //@ts-ignore
    vapi.start(VapiAgentConfig);

    vapi.on("call-start", callStartHandler);
    vapi.on("call-end", callEndHandler);
    vapi.on("message", messageHandler);
    vapi.on("speech-start", speechStartHandler);
    vapi.on("speech-end", speechEndHandler);
  };

  const endCall = async () => {
    
    if (!vapiInstance) return;
    vapiInstance.stop();
    vapiInstance.off("call-start", callStartHandler);
    vapiInstance.off("call-end", callEndHandler);
    vapiInstance.off("message", messageHandler);
    vapiInstance.off("speech-start", speechStartHandler);
    vapiInstance.off("speech-end", speechEndHandler);
    setCallStarted(false);
    setVapiInstance(null);
    toast.success('Your report is generated!')
    router.replace('/dashboard');
  };

  const GenerateReport = async () => {
    setLoading(true);
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
    console.log(result.data);
    return result.data;
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail.selectedDoctor.image}
            alt={sessionDetail.selectedDoctor.specialist ?? ""}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail.selectedDoctor.specialist}
          </h2>
          <p className="text-sm text-gray-400">MediVox AI Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role} : {msg.text}
              </h2>
            ))}

            {liveTranscript && (
              <h2 className="text-lg">
                {currentRoll} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button
              className="mt-20"
              onClick={StartCall}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <PhoneCall className="mr-2" />
              )}
              Start Call
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={endCall}
              disabled={loading}
              className="mt-20"
            >
              {loading ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <PhoneOff className="mr-2" />
              )}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
