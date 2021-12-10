// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
    mode: 'jit',
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
        './src/components/**/*.{js,jsx,ts,tsx,vue}',
        '.src/sites/**/*.{js,jsx,ts,tsx,vue}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: {
                light: '#88B4CD',
                DEFAULT: '#212E50',
            },
            secondary: {
                DEFAULT: '#4074B2',
            },
            grayscale: {
                darkest: '#0E0E0E',
                dark: '#C1C1C6',
                DEFAULT: '#EFF0F6',
                light: '#FAFAFA',
                white: '#FFFFFF'
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
        },
        extend: {
            lineHeight: {
                '11': '2.75rem',
                '12': '3rem',
            }
        }
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/forms'),],
}