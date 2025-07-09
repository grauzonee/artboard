/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            },
            fontWeight: {
                regular: 400,
                semibold: 600
            },
            colors: {
                primary: {
                    orange: '#DF8030',
                    red: '#D04726',
                    blue: '#1B4681',
                    violet: '#3E205F',
                },
                light: '#F5E1C1',
                lightGray: '#D9D9D9',
                secondary: '#67686F',
                inputsBg: '#D5DAD2',
                inputsBorder: '#5B5B5B',
            }
        },
    },
    plugins: [],
}

