import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
export const KashmirFeature = () => {
    const animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
    };
    return (<Section id="kashmir" className="relative overflow-hidden py-20">
      <ResponsiveImage src="/images/kashmir.jpg" alt="Kashmir valley landscape" priority={false} className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080}/>
      <div className="absolute inset-0 bg-black/50"/>
      <Container className="relative z-10 flex flex-col items-center text-center text-white max-w-2xl">
        <MotionWrapper as="h2" {...animationProps} className="font-playfair text-4xl md:text-5xl mb-4">
          Kashmir – The Crown Jewel
        </MotionWrapper>
        <MotionWrapper as="p" {...animationProps} className="font-inter text-lg md:text-xl">
          Experience the serene beauty of pristine lakes, verdant valleys, and timeless culture.
        </MotionWrapper>
      </Container>
    </Section>);
};
