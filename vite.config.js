import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import packageJson from './package.json';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const define = {
  __APP_VERSION__: JSON.stringify(packageJson.version),
  __APP_NAME__: JSON.stringify(packageJson.name),
  __APP_SHORT_NAME__: JSON.stringify(packageJson.short_name),
  __APP_DESCRIPTION__: JSON.stringify(packageJson.description),
  __APP_DISPLAY__: JSON.stringify(packageJson.display),
  __APP_BACKGROUND_COLOR__: JSON.stringify(packageJson.background_color),
  __APP_LOGO_SM__: JSON.stringify(packageJson.logo_sm),
  __APP_LOGO__: JSON.stringify(packageJson.logo),
};

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/site.webmanifest',
          dest: '.',
          transform: (content) => applyDefineReplacements(content),
        },
      ],
    }),
    {
      name: 'html-transform',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => applyDefineReplacements(html),
      },
    },
  ],
  define,
});


function applyDefineReplacements(content) {
  let result = content.toString();
  for (const [key, value] of Object.entries(define)) {
    result = result.replace(new RegExp(key, 'g'), value.replace(/^['"]|['"]$/g, ''));
  }
  return result;
}