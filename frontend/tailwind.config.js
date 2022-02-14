module.exports = {
  content: ['./src/**/*.{html,js}'],
  variants: {
    opacity: ({ after }) => after(['disabled']),
  },
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
