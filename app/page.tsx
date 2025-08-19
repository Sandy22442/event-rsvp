import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  const { data: events, error } = await supabase
    .from("Events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      <ul className="mt-4">
        {events?.map((event) => (
          <li key={event.id} className="border-b py-2">
            <h2 className="font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date} – {event.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
