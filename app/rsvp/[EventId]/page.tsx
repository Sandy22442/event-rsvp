"use client"; // needed because we’re using useState + events

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

interface RSVPPageProps {
  params: {
    eventId: string;
  };
}

export default function RSVPPage({ params }: RSVPPageProps) {
  const [status, setStatus] = useState<string>("");
  const router = useRouter();

  async function handleRSVP() {
    try {
      const { data, error } = await supabase
        .from("RSVPs")
        .insert([{ user_id: 1, event_id: params.eventId, status }]);

      if (error) throw error;

      alert("RSVP submitted!");
      router.push("/"); // go back to home page
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">RSVP for Event #{params.eventId}</h1>

      <select
        className="border p-2 mt-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
      </select>

      <button
        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
        onClick={handleRSVP}
        disabled={!status}
      >
        Submit
      </button>
    </div>
  );
}
