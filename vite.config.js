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
                refresh: true,

            }),
            react({
                include: ['resources/repair/src/**/*.{jsx,tsx,js,ts}'],
            })
        ],
        // server: {
        //    host: true,
        //     https: {
        //         key: fs.readFileSync('./server.key'),
        //         cert: fs.readFileSync('./server.crt'),
        //     },
        //     proxy: {
        //         '/api': {
        //             target: 'https://10.0.0.94:8000',
        //             changeOrigin: true,
        //             secure: false,
        //         },
        //     },
        // },

    }
}
