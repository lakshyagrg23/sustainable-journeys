# strapi-provider-upload-cloudinary-multi (local)

Cloudinary upload provider for Strapi v5 with round-robin multi-account switching.

## Options
- Reads credentials from env:
  - Primary: `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`
  - Secondary (optional): `CLOUDINARY_NAME_2`, `CLOUDINARY_KEY_2`, `CLOUDINARY_SECRET_2`
- Optional `folder` option via `config.plugins.js` providerOptions.

## Install (local)
This provider is local in `backend/providers/strapi-provider-upload-cloudinary-multi`.

In `backend/config/plugins.js` set:

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-cloudinary-multi',
      providerOptions: {
        folder: 'uploads',
      },
    },
  },
});
```

Ensure env vars are set. Restart Strapi.
