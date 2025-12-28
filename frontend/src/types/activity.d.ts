export interface SubActivity {
  type: string;
  island_name: string;
  place_name: string;
  title: string;
  short_description: string;
  price: string;
  hero_section?: {
    url: string;
  };
  documentId: string;
}
