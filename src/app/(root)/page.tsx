import { FeatureDebateCard } from '@/components/home/feature-debate-card';
import { HeadLine } from '@/components/home/headline';
import { Meta } from '@/components/home/meta';
import { Rank } from '@/components/home/rank';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeadLine />
      <FeatureDebateCard />
      <Rank />
      <Meta />
    </div>
  );
}
