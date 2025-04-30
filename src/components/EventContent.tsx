interface EventContentProps {
  content: string[];
}

export default function EventContent({
  content,
}: EventContentProps) {
  return (
    <div className="bg-white shadow-sm p-8 space-y-4 rounded-lg">
      <h3 className="text-xl font-medium text-center">イベント内容</h3>
      <ul className="space-y-2 text-slate-600">
        {content.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
      <p className="text-sm text-slate-500">※イベント内容は予告なく変更になる場合がございます。</p>
    </div>
  );
}
