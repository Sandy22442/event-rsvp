"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type EventDetails = {
  title: string;
  date: string;
  city: string;
};

type RSVP = {
  id: number;
  status: string;
  event_id: number;
  Events: EventDetails[]; // ✅ Supabase returns an array
};

export default function MyRsvps() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRsvps() {
      setLoading(true);

      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("RSVPs")
        .select("id, status, event_id, Events(title, date, city)")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching RSVPs:", error);
      } else if (data) {
        setRsvps(data as RSVP[]);
      }

      setLoading(false);
    }

    fetchRsvps();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading your RSVPs...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My RSVPs</h1>

      {rsvps.length === 0 ? (
        <p>You haven’t RSVPed to any events yet.</p>
      ) : (
        <ul>
          {rsvps.map((rsvp) => (
            <li key={rsvp.id} style={{ marginBottom: "10px" }}>
              <strong>{rsvp.Events[0]?.title ?? "Untitled Event"}</strong> <br />
              Status: {rsvp.status} <br />
              {rsvp.Events[0]?.city}, {rsvp.Events[0]?.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
