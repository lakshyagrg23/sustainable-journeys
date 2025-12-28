import type { Schema, Struct } from '@strapi/strapi';

export interface RepeatableAmenities extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_amenities';
  info: {
    displayName: 'Amenities';
  };
  attributes: {
    Amenities: Schema.Attribute.String;
  };
}

export interface RepeatableAttractions extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_attractions';
  info: {
    displayName: 'Attractions';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String;
    rating: Schema.Attribute.Decimal;
    short_description: Schema.Attribute.Text;
  };
}

export interface RepeatableFaq extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface RepeatableItinerary extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_itineraries';
  info: {
    displayName: 'itinerary';
  };
  attributes: {
    Day: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    hotel_name: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    short_description: Schema.Attribute.Text;
  };
}

export interface RepeatableRoom extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_rooms';
  info: {
    displayName: 'Room';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    Occupancy: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    price: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface RepeatableSubActivites extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_sub_activites';
  info: {
    displayName: 'sub_activites';
  };
  attributes: {
    gallery: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    hero_section: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    island_name: Schema.Attribute.String & Schema.Attribute.Required;
    place_name: Schema.Attribute.String & Schema.Attribute.Required;
    Price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    short_description: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RepeatableTag extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_tags';
  info: {
    displayName: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RepeatableWhatsIncludedItem extends Struct.ComponentSchema {
  collectionName: 'components_repeatable_whats_included_items';
  info: {
    displayName: 'Whats_Included';
  };
  attributes: {
    description: Schema.Attribute.Text;
    emoji: Schema.Attribute.String;
    icons: Schema.Attribute.Enumeration<
      [
        'transportation',
        'photoshoot',
        'tickets',
        'accommodation',
        'cruise',
        'sightseeing',
        'bike',
        'breakfast',
      ]
    >;
    item: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'repeatable.amenities': RepeatableAmenities;
      'repeatable.attractions': RepeatableAttractions;
      'repeatable.faq': RepeatableFaq;
      'repeatable.itinerary': RepeatableItinerary;
      'repeatable.room': RepeatableRoom;
      'repeatable.sub-activites': RepeatableSubActivites;
      'repeatable.tag': RepeatableTag;
      'repeatable.whats-included-item': RepeatableWhatsIncludedItem;
    }
  }
}
