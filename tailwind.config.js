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
        fontFamily: {
            'roboto': ['"Roboto", sans-serif']
        },
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
                darkest: '#494B51',
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
        boxShadow: {
            card: '0px 2px 8px 2px #C1C1C680',
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            none: 'none'
        },
        extend: {
            lineHeight: {
                '3-1/8': '0.875rem',
                '7-1/8': '1.875rem',
                '11': '2.75rem',
                '12': '3rem',
            },
            height: {
                '7-1/8': '1.875rem',
                '8-1/8': '2.125rem',
                '10-1/8': '2.625rem',
                '13': '3.25rem',
                '15': '3.75rem',
            },
        }
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/forms'),],
}
