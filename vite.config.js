import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from "path";
import {VitePWA} from 'vite-plugin-pwa';

const SRC_DIR = path.resolve(__dirname, './resources/src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './public/build');
export default async () => {
    return {
        mode: 'development',
        workers: 1,
        appType: 'spa',
        base: '',
        build: {
            outDir: BUILD_DIR,
            assetsInlineLimit: 0,
            emptyOutDir: true,
            rollupOptions: {
                treeshake: false,
            },
        },
        resolve: {
            alias: {
                '@': SRC_DIR,
            },
        },
        plugins: [
            laravel({
                input: [
                    'resources/repair/src/js/app.js',
                ],
                publicDirectory: PUBLIC_DIR,
                output: 'public/build',
                watch: 'resources/repair/src/**/*.{js,jsx,ts,tsx}',
                refresh: true,

            }),
            react({
                include: ['resources/repair/src/**/*.{jsx,tsx,js,ts}'],
            })
        ],
        server: {
            fs: {
                strict: true,
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },

    }
}
