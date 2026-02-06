import { cn } from '@/lib/utils';

interface MetallicSurfaceProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MetallicSurface({ children, className, onClick }: MetallicSurfaceProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg overflow-hidden',
        'bg-gradient-to-br from-card via-card to-accent/10',
        'border border-border/50',
        'shadow-lg shadow-black/20',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-500/5 before:via-transparent before:to-transparent before:pointer-events-none',
        'after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.03)_50%,transparent_52%)] after:bg-[length:20px_20px] after:pointer-events-none',
        className
      )}
    >
      {children}
    </div>
  );
}
