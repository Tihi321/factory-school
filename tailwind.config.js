/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-aes-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        bg: 'var(--bg)',
        card: 'var(--card)',
        band: 'var(--band)',
        muted: 'var(--muted)',
        fg: {
          DEFAULT: 'var(--fg)',
          body: 'var(--fg-body)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          ink: 'var(--accent-ink)',
          wash: 'var(--accent-wash)',
          line: 'var(--accent-line)',
        },
        good: 'var(--good)',
        bad: 'var(--bad)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
