import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  celebrityImageUrl: string;
}

export default function HeroSection({
  title,
  subtitle,
  date,
  description,
  buttonText,
  imageUrl,
  celebrityImageUrl,
}: HeroSectionProps) {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* キービジュアル背景 */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="背景"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/60" />
      </div>

      {/* コンテンツ */}
      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-light mb-4">{title}</h1>
          <div className="text-xl md:text-3xl font-light tracking-wider mb-6 space-y-1">
            <p>{subtitle}</p>
            <p className="text-gray-300">{date}</p>
          </div>
          <div className="space-y-2 mb-8 max-w-2xl mx-auto">
            <p className="text-base md:text-xl text-gray-300">
              {description}
            </p>
          </div>
          <Button className="text-base md:text-lg px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-slate-900 hover:bg-gray-100">
            {buttonText}
          </Button>
        </div>
      </div>

      {/* ベッキーの画像 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 md:w-80">
        <img
          src={celebrityImageUrl}
          alt="ベッキー"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
