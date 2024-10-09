import AffiliateLinks from '@/components/AffiliateLinks';
import { AffiliateMarquee } from '@/components/AffiliateMarquee';
import Body from "@/components/Body";


export default function Home() {
  return (
    <>
      <Body />
      <div className='block sm:hidden'>
        <AffiliateLinks />
      </div>
      <div className='hidden sm:block'>
        <AffiliateMarquee />
      </div>
    </>
  );
}
