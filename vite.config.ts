import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-redirect',
      configureServer(server) {
        // Add middleware BEFORE Vite's internal middlewares
        server.middlewares.use((req, res, next) => {
          // Redirect /admin to /admin/ (with trailing slash)
          if (req.url === '/admin') {
            res.writeHead(301, { Location: '/admin/' });
            res.end();
            return;
          }
          // Rewrite /admin/ to /admin/index.html
          if (req.url === '/admin/') {
            req.url = '/admin/index.html';
          }
          next();
        });
      }
    }
  ]
})
