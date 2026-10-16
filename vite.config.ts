import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          'salams-casestudy': path.resolve(__dirname, 'salams-casestudy.html'),
          'unita-casestudy': path.resolve(__dirname, 'unita-casestudy.html'),
          'vara-casestudy': path.resolve(__dirname, 'vara-casestudy.html'),
          'zewards-casestudy': path.resolve(__dirname, 'zewards-casestudy.html'),
        },
      },
    },
  };
});
