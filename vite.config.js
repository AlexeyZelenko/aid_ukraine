import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // Это алиас, который вы, скорее всего, хотите использовать
            // Он позволяет писать импорты от корня папки src
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            // Если вы хотите отдельный алиас '@components', то он должен быть настроен так:
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            // Если у вас нет папки 'src' и все файлы прямо в корне, измените './src' на './'
            // '@': fileURLToPath(new URL('./', import.meta.url)),
            // '@components': fileURLToPath(new URL('./components', import.meta.url)),
        },
    },
});
