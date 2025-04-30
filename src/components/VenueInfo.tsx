import { ExternalLink } from "lucide-react";

interface VenueInfoProps {
  venue: string;
  address: string;
  accessMapUrl: string;
  organizer: string;
  contact: string;
}

export default function VenueInfo({
  venue,
  address,
  accessMapUrl,
  organizer,
  contact,
}: VenueInfoProps) {
  return (
    <div className="space-y-4 text-center text-sm text-slate-500 pt-8 border-t">
      <div>
        <p>{venue}</p>
        <p>{address}</p>
        <a
          href={accessMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          アクセスマップ
        </a>
      </div>
      <div className="pt-4">
        <p>主催：{organizer}</p>
        <p>お問い合わせ：{contact}</p>
      </div>
    </div>
  );
}
