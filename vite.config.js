import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  screens: {
    theme: {
    screens: {
      esm:'320px',
      sm: '480px',   // your custom mobile breakpoint
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
  },},
  plugins: [react(), tailwindcss(),]
  
})
