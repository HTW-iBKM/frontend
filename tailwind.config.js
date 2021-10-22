// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/forms'),],
}