// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
    mode: "jit",
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        placeholderColor: {
            'primary': '#C1C1C6',
            'secondary': '#ffed4a',
            'danger': '#e3342f',
        },
        extend: {

            // backgroundImage:{
            //     'exxetaLogo': "url('./img/exxetalogo.png')"
            // }
        },
    },
    variants: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('@tailwindcss/forms'),],
}