import { Calendar, MapPin, Clock } from "lucide-react";

interface EventDetailsProps {
  date: string;
  time: string;
  venue: string;
  venueDescription: string;
}

export default function EventDetails({
  date,
  time,
  venue,
  venueDescription,
}: EventDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div className="space-y-2 text-center p-6 bg-white shadow-sm rounded-lg">
        <Calendar className="h-8 w-8 mx-auto text-slate-700" />
        <h3 className="font-medium text-lg">Date</h3>
        <p className="text-slate-600">{date}</p>
      </div>
      <div className="space-y-2 text-center p-6 bg-white shadow-sm rounded-lg">
        <Clock className="h-8 w-8 mx-auto text-slate-700" />
        <h3 className="font-medium text-lg">Time</h3>
        <p className="text-slate-600">{time}</p>
        <p className="text-sm text-slate-500">（開場 13:30）</p>
      </div>
      <div className="space-y-2 text-center p-6 bg-white shadow-sm rounded-lg">
        <MapPin className="h-8 w-8 mx-auto text-slate-700" />
        <h3 className="font-medium text-lg">Venue</h3>
        <p className="text-slate-600">{venue}</p>
        <p className="text-sm text-slate-500">{venueDescription}</p>
      </div>
    </div>
  );
}
