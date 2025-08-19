"use client"; // needed because we’re using useState + events

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function RSVPPage({ params }: { params: { eventId: string } }) {
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function handleRSVP() {
    // For now, hardcode user_id = 1 (you can later add auth)
    const { data, error } = await supabase
      .from("RSVPs")
      .insert([{ user_id: 1, event_id: params.eventId, status }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("RSVP submitted!");
      router.push("/"); // go back to home page
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">RSVP for Event #{params.eventId}</h1>

      <select
        className="border p-2 mt-4"
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
      >
        Submit
      </button>
    </div>
  );
}
