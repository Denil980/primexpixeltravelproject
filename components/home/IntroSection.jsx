import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import Link from 'next/link';
export const IntroSection = () => {
    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };
    return (<Section id="international-intro" className="bg-[#fbfaf7]">
      <Container className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <MotionWrapper {...animationProps}>
          <div className="eyebrow mb-5">Beyond the familiar</div>
          <h2 className="mb-5 max-w-xl font-playfair text-4xl leading-tight text-primaryText md:text-5xl">See the world with a little more wonder.</h2>
          <p className="mb-7 max-w-lg font-inter text-lg leading-8 text-secondaryText">
            From historic cities to breathtaking natural wonders, our curated itineraries ensure a seamless, luxurious experience.
          </p>
          <Link href="/#featured-packages" passHref>
            <Button intent="primary" size="md">Discover International Tours</Button>
          </Link>
        </MotionWrapper>
        <MotionWrapper {...animationProps}>
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#173f3d] p-2 shadow-[0_24px_60px_rgba(23,42,43,0.14)]">
          <ResponsiveImage src="/images/international-thumb.jpg" alt="International travel collage" width={600} height={400} className="h-[320px] w-full rounded-[1.6rem] object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"/>
          <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-[#0d292b]/65 via-transparent to-transparent"/>
          <div className="absolute bottom-7 left-7 text-white">
            <div className="eyebrow mb-2 text-[#ead8ad]">Curated departures</div>
            <div className="font-playfair text-2xl">The world, thoughtfully arranged.</div>
          </div>
          </div>
        </MotionWrapper>
      </Container>
    </Section>);
};
