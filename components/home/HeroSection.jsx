import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroMotion } from './HeroMotion';
import Link from 'next/link';
export const HeroSection = () => {
    return (<Section id="hero" className="relative min-h-[78vh] overflow-hidden bg-[#071c2b] p-0 md:min-h-[86vh]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-1 h-32 bg-linear-to-b from-[#071d24]/70 to-transparent"/>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-40 bg-linear-to-t from-[#071d24] to-transparent"/>
      <div className="absolute inset-0 z-2 flex items-center">
        <Container className="relative flex w-full flex-col items-center justify-center text-center md:items-start md:text-left">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#e2c78b] sm:text-sm">
            Explore · Discover · Experience
          </div>
        <HeroMotion as="h1" className="max-w-2xl font-playfair text-4xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Your journey.
          <span className="block text-[#e2c78b]">Your way.</span>
        </HeroMotion>
        <HeroMotion as="p" className="mb-8 mt-6 max-w-xl font-inter text-base leading-7 text-white/85 md:text-lg">
          Carefully crafted journeys that blend wild landscapes, living culture, and the freedom to go further.
        </HeroMotion>
        <div className="mb-7 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/60">
          <span className="h-px w-8 bg-[#ead8ad]/60" />
          Move across the globe to explore
          <span className="h-px w-8 bg-[#ead8ad]/60" />
        </div>
        <HeroMotion as="div" className="flex flex-col sm:flex-row gap-4">
          <Link href="/#destinations" passHref>
            <Button intent="primary" size="lg" className="shadow-lg">
              Explore Destinations
            </Button>
          </Link>
          <Link href="/#featured-packages" passHref>
            <Button intent="secondary" size="lg">
              View Packages
            </Button>
          </Link>
        </HeroMotion>
        </Container>
      </div>
    </Section>);
};
