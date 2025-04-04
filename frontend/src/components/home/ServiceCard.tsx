type Service = {
    title: string;
    description: string;
};

export function ServiceCard({service}: { service: Service }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
        </div>
    );
}