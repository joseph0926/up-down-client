import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo.webp"
      alt="Up & Down logo"
      width={80}
      height={80}
      priority
      className={cn('h-20 w-20', className)}
    />
  );
};
