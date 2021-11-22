import { TUiSelectors, IUiSelectorsClass } from '../assets/types/types';

export class UiSelectors implements IUiSelectorsClass {
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

  constructor() {
    this.UiSelectors = {
      input_lat_attr: '[data-input-latitude]',
      input_lng_attr: '[data-input-longitude]',
      input_country_attr: '[data-input-country]',
      input_container_attr: '[data-input-container]',
      btn_send_query_attr: '[data-btn-send-query]',
      btn_auto_localization_attr: '[data-btn-localization]',
      accordion_container_attr: '[data-accordion-container]',
      accordion_template_attr: '[data-accordion-template]',
      accordion_heading_attr: '[data-accordion-title]',
      accordion_accordion_attr: '[data-accordion]',
      accordion_tab_attr: '[data-tab]',
      accordion_tabHead_attr: '[data-tab-head]',
      accordion_tabTitle_attr: '[data-tab-title]',
      accordion_tabContent_attr: '[data-tab-content]',
      accordion_contentKey_attr: '[data-item-key]',
      accordion_contentValue_attr: '[data-item-value]',
      accordion_image_attr: '[data-img]',
      slider_body_attr: '[data-slider-body]',
      slider_arrow_left_attr: '[data-slider-arrow="left"]',
      slider_arrow_right_attr: '[data-slider-arrow="right"]',
    }
    this.input_lat = document.querySelector(this.UiSelectors.input_lat_attr);
    this.input_lng = document.querySelector(this.UiSelectors.input_lng_attr);
    this.input_country = document.querySelector(this.UiSelectors.input_country_attr);
    this.input_container = document.querySelector(this.UiSelectors.input_container_attr);
    this.btn_auto_localization = document.querySelector(this.UiSelectors.btn_auto_localization_attr);
    this.btn_send_query = document.querySelector(this.UiSelectors.btn_send_query_attr);
    this.accordion_container = document.querySelector(this.UiSelectors.accordion_container_attr);
    this.accordion_template = document.querySelector(this.UiSelectors.accordion_template_attr);
    this.slider_body = document.querySelector(this.UiSelectors.slider_body_attr);
    this.slider_arrow_left = document.querySelector(this.UiSelectors.slider_arrow_left_attr);
    this.slider_arrow_right = document.querySelector(this.UiSelectors.slider_arrow_right_attr);
  }
}