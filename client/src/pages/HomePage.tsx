import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import TestimonialSection from "../sections/TestimonialSection";

import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

export default function HomePage() {
    return (
        <div className="overflow-x-hidden">
            <HeroSection />
            <FeaturesSection />
            <TestimonialSection />
            <ContactSection />
            <CTASection />
        </div>
    );
}