import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { SessionDetail } from "../medical-agent/types";

type Props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: Props) {
  const report = record.report ? (record.report as any) : {};

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"link"} size={"sm"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[850px] max-h-[90vh] overflow-hidden rounded-lg">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-4xl text-blue-700 font-extrabold tracking-wide py-4">
              🩺 MediVox AI Consultation Report
            </h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="overflow-y-auto max-h-[75vh] px-4 pb-4 space-y-8 text-gray-800 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
            {/* Session Info */}
            <div className="border-t pt-4 space-y-3">
              <h2 className="text-2xl font-bold text-blue-600">Session Info</h2>
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="font-medium"><span className="font-bold">Doctor:</span> {record.selectedDoctor.specialist}</p>
                  <p className="font-medium"><span className="font-bold">Consulted On:</span> {moment(new Date(record?.createdOn)).fromNow()}</p>
                </div>
                <div>
                  <p className="font-medium"><span className="font-bold">User:</span> {report.user || "Anonymous"}</p>
                  <p className="font-medium"><span className="font-bold">Agent:</span> {report.agent || `${record.selectedDoctor.specialist} AI`}</p>
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="border-t pt-4">
              <h2 className="text-2xl font-bold text-blue-600">Chief Complaint</h2>
              <p className="leading-relaxed">{report.chiefComplaint || record.notes}</p>
            </div>

            {/* Summary */}
            {report.summary && (
              <div className="border-t pt-4">
                <h2 className="text-2xl font-bold text-blue-600">Summary</h2>
                <p className="leading-relaxed">{report.summary}</p>
              </div>
            )}

            {/* Symptoms */}
            {report.symptoms?.length > 0 && (
              <div className="border-t pt-4">
                <h2 className="text-2xl font-bold text-blue-600">Symptoms</h2>
                <ul className="list-disc list-inside space-y-1">
                  {report.symptoms.map((symptom: string, idx: number) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Duration & Severity */}
            <div className="border-t pt-4 flex flex-wrap gap-8">
              <div>
                <h2 className="font-bold text-blue-600">Duration</h2>
                <p className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-800 font-semibold mt-1">{report.duration || "Not specified"}</p>
              </div>
              <div>
                <h2 className="font-bold text-blue-600">Severity</h2>
                <p className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-800 font-semibold mt-1">{report.severity || "Not specified"}</p>
              </div>
            </div>

            {/* Medications */}
            {report.medicationsMentioned?.length > 0 && (
              <div className="border-t pt-4">
                <h2 className="text-2xl font-bold text-blue-600">Medications Mentioned</h2>
                <ul className="list-disc list-inside space-y-1">
                  {report.medicationsMentioned.map((med: string, idx: number) => (
                    <li key={idx}>{med}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations?.length > 0 && (
              <div className="border-t pt-4">
                <h2 className="text-2xl font-bold text-blue-600">Recommendations</h2>
                <ul className="list-disc list-inside space-y-1">
                  {report.recommendations.map((rec: string, idx: number) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
