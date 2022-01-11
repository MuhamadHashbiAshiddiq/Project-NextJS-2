import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
const qs = require('qs');

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {/* {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))} */}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View AllEvents</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: ["image"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
