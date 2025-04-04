type Plan = {
    title: string;
    price: string;
    duration: string;
    features: string[];
};

export function PricingCard({plan}: { plan: Plan }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-gray-600">/{plan.duration}</span>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{plan.title}</h3>
            <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Plan
            </button>
        </div>
    );
}