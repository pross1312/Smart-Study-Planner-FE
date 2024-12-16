/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                utilGreen700: "#087443",
                utilGreen600: "#099250",
                "utility-pink-700": "#FF007A",
                "utility-pink-600": "#DD2590",
                "utility-pink-200": "#FCCEEE",
                "utility-pink-50": "#FDF2FA",
                "utility-yellow-700": "#A15C07",
                "utility-yellow-600": "#CA8504",
                "utility-yellow-200": "#FEEE95",
                "utility-yellow-50": "#FEFBE8",
                "border-secondary": "#E9EAEB",
            },
        },
    },
    plugins: [],
};
