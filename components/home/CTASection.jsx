import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import Link from 'next/link';
export const CTASection = () => {
    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };
    return (<Section id="contact-booking" className="overflow-hidden bg-darkSection text-white py-28">
      <Container className="max-w-3xl text-center">
      <div className="eyebrow mb-5 text-[#ead8ad]">Your next story starts here</div>
        <MotionWrapper as="h2" {...animationProps} className="font-playfair text-4xl md:text-5xl mb-6">
          Ready to Embark on Your Dream Journey?
        </MotionWrapper>
        <MotionWrapper as="p" {...animationProps} className="mb-8 font-inter text-lg text-white/70 md:text-xl">
          Let us craft a premium travel experience tailored just for you.
        </MotionWrapper>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/booking" passHref>
            <Button intent="primary" size="lg" className="shadow-lg">
              Book Your Trip
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button intent="secondary" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </Section>);
};
