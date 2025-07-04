import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 原有环境变量加载逻辑保持不变
const loadEnvVariables = () => {
  const env = {}
  if (typeof process !== 'undefined') {
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith('VITE_')) {
        env[key] = process.env[key]
      }
    })
  }
  return env
}

const env = loadEnvVariables()

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/index.scss" as *;`,
      }
    }
  },
  define: {
    'process.env': env,
    'import.meta.env': JSON.stringify(env)
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL || 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 新增DeepSeek代理配置（保持原有代理不变）
      '/deepseek': {
        target: env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deepseek/, ''),
        headers: {
          // 代理层统一添加认证头（可选）
          Authorization: `Bearer ${env.VITE_DEEPSEEK_API_KEY || ''}`
        }
      }
    }
  }
})