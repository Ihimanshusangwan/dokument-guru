type Feature = {
    icon: string;
    title: string;
    description: string;
};

export function FeatureCard({feature}: { feature: Feature }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </div>
    );
}