import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#1A202C',
        lighten: '#EDEFF5',
        text_primary: '#A0AEC0',
        second_primary_text: '#777E90',
        success_badge: 'rgba(46, 184, 114, 0.12)',
        success_text: '#2EB872',
        pending_text: '#F2994A',
        pending_bg: 'rgba(242, 153, 74, 0.12)'
      }
    },
  },
  plugins: [],
}
export default config
