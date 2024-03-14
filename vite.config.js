import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

import express from "express";

// On charge les variables d'environnement depuis le fichier .env
dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(express.static('public'));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@scssVariables': '/src/styles/_variables.scss',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  // On définit les variables d'environnement dans la configuration Vite
  define: {
    'process.env': process.env,
  },
});
