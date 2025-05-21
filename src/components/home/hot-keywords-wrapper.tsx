import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { HotKeywords } from './hot-keywrods';

export type HotKeywordsProps = ComponentProps<'ul'>;

export function HotKeywordsWrapper({ className, ...rest }: HotKeywordsProps) {
  return (
    <ul
      {...rest}
      className={cn('divide-muted/30 space-y-1 divide-y', className)}
      role="list"
    >
      <HotKeywords />
    </ul>
  );
}
