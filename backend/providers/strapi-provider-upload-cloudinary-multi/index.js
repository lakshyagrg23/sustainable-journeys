"use strict";

const cloudinary = require("cloudinary").v2;

module.exports = {
  init(providerOptions = {}) {
    // Read accounts from env (primary + secondary)
    const accounts = [
      {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      {
        cloud_name: process.env.CLOUDINARY_NAME_2,
        api_key: process.env.CLOUDINARY_KEY_2,
        api_secret: process.env.CLOUDINARY_SECRET_2,
      },
    ].filter((a) => a && a.cloud_name && a.api_key && a.api_secret);

    if (accounts.length === 0) {
      throw new Error(
        "No Cloudinary credentials found. Set CLOUDINARY_NAME/KEY/SECRET (and optional *_2)."
      );
    }

    let idx = 0;
    function nextAccount() {
      const acc = accounts[idx];
      idx = (idx + 1) % accounts.length;
      return acc;
    }

    async function configureForNext(action = "upload") {
      const acc = nextAccount();
      cloudinary.config({
        cloud_name: acc.cloud_name,
        api_key: acc.api_key,
        api_secret: acc.api_secret,
      });
      if (process.env.CLOUDINARY_MULTI_DEBUG === "true") {
        // eslint-disable-next-line no-console
        console.log(`[cloudinary-multi] Using account: ${acc.cloud_name} for ${action}`);
      }
      return acc;
    }

    // Global in-memory cache to prevent duplicate uploads by hash or name
    const uploadedCache = new Set();

    return {
      async upload(file) {
        // Use file.hash if available, else file.name, else fallback to Date.now()
        const cacheKey = file.hash || file.name || (file.path ? require('crypto').createHash('md5').update(file.path).digest('hex') : Date.now());
        if (uploadedCache.has(cacheKey)) {
          if (process.env.CLOUDINARY_MULTI_DEBUG === "true") {
            console.log('[cloudinary-multi] Skipping duplicate upload for file:', cacheKey);
          }
          return;
        }
        uploadedCache.add(cacheKey);
        const acc = await configureForNext("upload");
        const uploadOptions = { folder: providerOptions.folder || "uploads" };
        return new Promise((resolve, reject) => {
          const done = (err, result) => {
            if (err) return reject(err);
            file.url = result.secure_url;
            file.provider = `cloudinary-multi`;
            file.provider_metadata = {
              resource_type: result.resource_type,
              public_id: result.public_id,
              version: result.version,
              account: acc.cloud_name,
            };
            if (process.env.CLOUDINARY_MULTI_DEBUG === "true") {
              // eslint-disable-next-line no-console
              console.log(`[cloudinary-multi] Uploaded to: ${file.url}`);
            }
            return resolve();
          };
          if (file.path) {
            cloudinary.uploader.upload(file.path, uploadOptions, done);
          } else if (file.buffer) {
            cloudinary.uploader.upload_stream(uploadOptions, done).end(file.buffer);
          } else {
            reject(new Error("No file.path or file.buffer available for upload"));
          }
        });
      },

      async delete(file) {
        await configureForNext("delete");
        return new Promise((resolve, reject) => {
          try {
            const url = file?.url || file?.provider_metadata?.secure_url || file?.formats?.thumbnail?.url;
            if (!url) return resolve();
            const afterUpload = url.split("/upload/")[1];
            if (!afterUpload) return resolve();
            const withoutVersion = afterUpload.replace(/^v\d+\//, "");
            const withoutQuery = withoutVersion.split("?")[0];
            const lastDot = withoutQuery.lastIndexOf(".");
            const publicId = lastDot > -1 ? withoutQuery.slice(0, lastDot) : withoutQuery;
            if (!publicId) return resolve();
            if (process.env.CLOUDINARY_MULTI_DEBUG === "true") {
              // eslint-disable-next-line no-console
              console.log(`[cloudinary-multi] Deleting publicId: ${publicId}`);
            }
            cloudinary.uploader.destroy(publicId, (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          } catch (e) {
            resolve();
          }
        });
      },
    };
  },
};
