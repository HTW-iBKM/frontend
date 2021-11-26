// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: {
                light: '#88B4CD',
                DEFAULT: '#4074B2',
                dark: '#212E50',
            },
            grayscale: {
                darkest: '#0E0E0E',
                dark: '#C1C1C6',
                DEFAULT: '#EFF0F6',
                light: '#FAFAFA',
            },
            danger: {
                DEFAULT: '#D7382C',
            },
            success: {
                DEFAULT: '#259F56',
            },
            warning: {
                DEFAULT: '#E8BD50',
            },
        }
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/forms'),],
}