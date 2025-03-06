/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "2px 2px 6px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        primary: "#A449EB",
        secondary: "#039099",
      },
    },
  },
  plugins: [],
});
