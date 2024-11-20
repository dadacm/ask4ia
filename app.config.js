module.exports = {
  expo: {
    name: 'ask4ia',
    slug: 'ask4ia',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './base/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    // ... resto das suas configurações do app.json
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      IS_MOCK: process.env.IS_MOCK,
    },
  },
};
