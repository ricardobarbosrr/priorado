import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy para a API do Alpha Vantage
        '/api/alpha-vantage': {
          target: 'https://www.alphavantage.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/alpha-vantage/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              //console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              //console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    },
    define: {
      'import.meta.env.VITE_ALPHA_VANTAGE': JSON.stringify(env.VITE_ALPHA_VANTAGE)
    }
  }
})
