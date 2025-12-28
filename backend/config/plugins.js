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



