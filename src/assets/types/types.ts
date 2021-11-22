// type OptionsPages<Type extends Pages> = {
//   [Value in Type as Value[keyof Pages]]?: () => void;
// };

type OptionsPages<Type extends Pages> = {
  [Property in keyof Type]?: () => void;
};

export type Pages = { HOME: '/index.html', COUNTRY: '/pages/country.html', GALLERY: '/pages/gallery.html' };
export type PageConfigParams = OptionsPages<Pages>

export interface fetchDataType {
  lat?: number;
  long?: number;
  plus?: string;
  namePrefix?: string;
  countryId?: string;
}

export type TUiSelectors = {
  input_lat_attr: string,
  input_lng_attr: string,
  input_country_attr: string,
  input_container_attr: string,
  btn_send_query_attr: string,
  btn_auto_localization_attr: string,
  accordion_container_attr: string,
  accordion_template_attr: string,
  accordion_heading_attr: string,
  accordion_accordion_attr: string,
  accordion_tab_attr: string,
  accordion_tabHead_attr: string,
  accordion_tabTitle_attr: string,
  accordion_tabContent_attr: string,
  accordion_contentKey_attr: string,
  accordion_contentValue_attr: string,
  accordion_image_attr: string,
  slider_body_attr: string,
  slider_arrow_left_attr: string;
  slider_arrow_right_attr: string;
}

export interface IUiSelectorsClass {
  UiSelectors: TUiSelectors;
  input_lat: HTMLInputElement | null;
  input_lng: HTMLInputElement | null;
  input_country: HTMLInputElement | null;
  input_container: HTMLDivElement | null;
  btn_auto_localization: HTMLButtonElement | null;
  btn_send_query: HTMLButtonElement | null;
  accordion_container: Element | null;
  accordion_template: HTMLTemplateElement | null;
  slider_body: HTMLUListElement | null;
  slider_arrow_left: HTMLSpanElement | null;
  slider_arrow_right: HTMLSpanElement | null;
}