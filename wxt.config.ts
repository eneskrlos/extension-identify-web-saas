import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'wxt-test',
        description: 'wxt test',
        version: '1.0.0',
        permissions: ['storage', 'webNavigation', 'webRequest', 'notifications'],
        host_permissions: ["*://*.google.com/*"],
    },
    runner: {
        startUrls: [
          "https://www.google.com/"
        ]
    }
});
