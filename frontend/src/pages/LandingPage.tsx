import {Navbar} from "../components/common/Navbar.tsx";
import {Hero} from "../components/home/Hero.tsx";
import {features, pricingPlans, services} from "../components/home/data.ts";
import {FeatureCard} from "../components/home/FeatureCard.tsx";
import {ServiceCard} from "../components/home/ServiceCard.tsx";
import {PricingCard} from "../components/home/PricingCard.tsx";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <Hero/>

            <section id="features" className="py-16 bg-white px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature}/>
                        ))}
                    </div>
                </div>
            </section>

            <section id="services" className="py-16 bg-gray-50 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service}/>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-16 bg-white px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard key={index} plan={plan}/>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="text-left">
                            <h3 className="text-xl font-bold mb-4">dokumentGuru</h3>
                            <p className="text-gray-400">Your complete legal documentation solution</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Corporate Docs</li>
                                <li>Tax Filing</li>
                                <li>IP Registration</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>About Us</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                                <li>Cookie Policy</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-gray-400">&copy; 2024 dokumentGuru. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}