interface BreakingBadLogoProps {
  className?: string;
}

export function Logo({ className = '' }: BreakingBadLogoProps) {
  return (
    <div
      className={`flex flex-col items-start justify-center font-serif text-[#1b3b2a] ${className}`}
    >
      <div className="flex items-end leading-none">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-br from-[#1e4d35] to-[#0e2419] text-white shadow-md">
          <span className="absolute left-1 top-1 text-[10px] font-semibold text-white/80">35</span>
          <span className="text-4xl font-bold">Br</span>
        </div>
        <span className="ml-1 text-5xl font-bold tracking-tight">eaking</span>
      </div>
      <div className="ml-15 mt-1 flex items-end leading-none">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-br from-[#1e4d35] to-[#0e2419] text-white shadow-md">
          <span className="absolute left-1 top-1 text-[10px] font-semibold text-white/80">56</span>
          <span className="text-4xl font-bold">Ba</span>
        </div>
        <span className="ml-1 text-5xl font-bold tracking-tight">d</span>
      </div>
    </div>
  );
}
