'use strict';

const cloudinary = require('cloudinary').v2;

module.exports = (plugin) => {
  // override upload service
  plugin.services.upload.upload = async function (files) {
    const accounts = [
      {
        cloud_name: process.env.CLOUDINARY_NAME_1,
        api_key: process.env.CLOUDINARY_KEY_1,
        api_secret: process.env.CLOUDINARY_SECRET_1,
      },
      {
        cloud_name: process.env.CLOUDINARY_NAME_2,
        api_key: process.env.CLOUDINARY_KEY_2,
        api_secret: process.env.CLOUDINARY_SECRET_2,
      },
      // {
      //   cloud_name: process.env.CLOUDINARY_NAME_3,
      //   api_key: process.env.CLOUDINARY_KEY_3,
      //   api_secret: process.env.CLOUDINARY_SECRET_3,
      // },
      // {
      //   cloud_name: process.env.CLOUDINARY_NAME_4,
      //   api_key: process.env.CLOUDINARY_KEY_4,
      //   api_secret: process.env.CLOUDINARY_SECRET_4,
      // },
      // {
      //   cloud_name: process.env.CLOUDINARY_NAME_5,
      //   api_key: process.env.CLOUDINARY_KEY_5,
      //   api_secret: process.env.CLOUDINARY_SECRET_5,
      // },
    ];

    // pick random account
    const account = accounts[Math.floor(Math.random() * accounts.length)];
    cloudinary.config(account);

    const file = Array.isArray(files) ? files[0] : files;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'strapi_uploads',
    });

    return [
      {
        url: result.secure_url,
        provider: 'cloudinary',
        name: file.name,
        mime: file.type,
        size: file.size / 1000,
      },
    ];
  };

  return plugin;
};
