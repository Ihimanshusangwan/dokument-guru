module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            ringColor: {
                'blue-500': '#3b82f6',
            },
            ringWidth: {
                '2': '2px',
            },
            scale: {
                '101': '1.01',
            },
            colors: {
                blue: {
                    50: '#eff6ff',
                    600: '#2563eb',
                    700: '#1d4ed8'
                }
            }
        }
    },
    plugins: [],
}