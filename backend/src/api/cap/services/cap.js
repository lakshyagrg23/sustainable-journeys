'use strict';

/**
 * cap service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cap.cap');
