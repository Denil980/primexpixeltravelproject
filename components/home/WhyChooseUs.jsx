import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
export const WhyChooseUs = () => {
    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };
    const reasons = [
        {
            title: 'Curated Luxury',
            description: 'Hand‑picked experiences that combine comfort, culture, and adventure.',
        },
        {
            title: 'Expert Guides',
            description: 'Local experts ensure authentic, safe, and unforgettable journeys.',
        },
        {
            title: 'Seamless Service',
            description: 'From start to finish we handle every detail, so you can simply enjoy.',
        },
    ];
    return (<Section id="why-choose-us" className="bg-[#e9e5dc]">
      <Container className="max-w-5xl">
        <MotionWrapper {...animationProps} className="mb-12 text-center">
          <div className="eyebrow mb-4">The difference is in the detail</div>
          <h2 className="font-playfair text-4xl text-primaryText md:text-5xl">Travel, elevated.</h2>
        </MotionWrapper>
        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((r, index) => (<MotionWrapper key={r.title} {...animationProps}>
              <Card className="group h-full p-7 text-left">
                <div className="mb-9 flex items-center justify-between text-[#c9a45c]">
                  <span className="font-mono text-xs">0{index + 1}</span>
                  <span className="h-px w-12 bg-[#c9a45c]/40 transition-all duration-500 group-hover:w-20"/>
                </div>
                <h3 className="mb-4 font-playfair text-2xl text-primaryText">{r.title}</h3>
                <p className="font-inter leading-7 text-secondaryText">{r.description}</p>
              </Card>
            </MotionWrapper>))}
        </div>
      </Container>
    </Section>);
};
