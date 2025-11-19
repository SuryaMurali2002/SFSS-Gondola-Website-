import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ProgressTracker = () => {
  const [signatureCount, setSignatureCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("petition_signature_count");

      if (!isMounted) return;

      if (error) {
        console.error("Failed to fetch signature count", error);
        return;
      }

      setSignatureCount(Number(data) || 0);
    };

    fetchCount();

    const intervalId = window.setInterval(fetchCount, 30_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-CA').format(num);
  };

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Petition Signatures</span>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-7xl md:text-8xl font-bold block mb-2">
                  {formatNumber(signatureCount)}
                </span>
                <p className="text-2xl md:text-3xl opacity-90">
                  Voices for Change
                </p>
              </div>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Every signature strengthens our case to government officials. 
                Together, we're building momentum for sustainable campus transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};