const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0A3D62',
                accent: '#D4AF37',
                background: '#F5F5F5',
                darkSection: '#0F0F0F',
                primaryText: '#212529',
                secondaryText: '#555555',
                error: '#DC3545', // Bootstrap danger red as subtle error
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-playfair)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
