import { defineNuxtConfig } from 'nuxt/config'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'node:path'
// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default defineNuxtConfig({
    css: ['@/assets/main.css'],
    vite: {
        plugins: [
            VueI18nVitePlugin({
                include: [
                    resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
                ]
            })
        ]
    },
    generate: {
        dir: 'dist'
    }
})
