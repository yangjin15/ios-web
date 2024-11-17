import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: path.resolve(__dirname, 'src') + '/',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // ant design 4.17 版本会有 less 报错，添加这个处理，之后版本看是否需要移除该项
          // 相关链接：https://githubmemory.com/repo/ant-design/ant-design-pro/issues/9082
          'root-entry-name': 'default',
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',  // 确保监听所有网络接口
    port: 5173,        // 使用的端口
  },
})
