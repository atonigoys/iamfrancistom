const GlowingLine = () => (
  <div className="relative w-full h-[1px]">
    {/* Soft glow behind */}
    <div className="absolute inset-x-0 -top-1 h-[3px] bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent blur-sm animate-[pulse_3s_ease-in-out_infinite]" />
    {/* Main line */}
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
    {/* Bottom glow */}
    <div className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent blur-md animate-[pulse_3s_ease-in-out_infinite]" />
  </div>
);

export default GlowingLine;
