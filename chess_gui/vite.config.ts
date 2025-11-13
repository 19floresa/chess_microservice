import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig(
{
    plugins: [react()],
    resolve: 
    {
      alias: 
      {
        // Create an alias for a directory outside your project
        // Replace '~/external-assets' with your desired alias name
        // Replace '../path/to/your/external/assets' with the actual relative path
        '~/external-assets': path.resolve(__dirname, '../../src'),
      },
    },
});