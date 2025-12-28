'use strict';

/**
 * hotel-room service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hotel-room.hotel-room');
