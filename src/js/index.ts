import { UserLocation } from './userLocation';
import { FetchData } from './fetchData';
import { GoogleMap } from './googleMap';
import { UiElements } from './uiElements';
import { Slider } from './slider';

class AppInit {
  UiSelectors: {
    input_lat_attr: string,
    input_lng_attr: string,
    input_country_attr: string,
    input_container_attr: string,
    btn_send_query_attr: string,
    btn_auto_localization_attr: string,
    accordion_container_attr: string,
    slider_body_attr: string,
    slider_arrow_left_attr: string;
    slider_arrow_right_attr: string;
  };
  input_lat: HTMLInputElement | null;
  input_lng: HTMLInputElement | null;
  input_country: HTMLInputElement | null;
  input_container: HTMLDivElement | null;
  btn_auto_localization: HTMLButtonElement | null;
  btn_send_query: HTMLButtonElement | null;
  accordion_container: HTMLDivElement | null;
  slider_body: HTMLUListElement | null;
  slider_arrow_left: HTMLSpanElement | null;
  slider_arrow_right: HTMLSpanElement | null;
  location: UserLocation;
  fetchData: FetchData;
  googleMap: GoogleMap | null;
  uiElements: UiElements;
  slider: Slider;

  constructor() {
    this.UiSelectors = {
      input_lat_attr: '[data-input-latitude]',
      input_lng_attr: '[data-input-longitude]',
      input_country_attr: '[data-input-country]',
      input_container_attr: '[data-input-container]',
      btn_send_query_attr: '[data-btn-send-query]',
      btn_auto_localization_attr: '[data-btn-localization]',
      accordion_container_attr: '[data-accordion]',
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
    this.slider_body = document.querySelector(this.UiSelectors.slider_body_attr);
    this.slider_arrow_left = document.querySelector(this.UiSelectors.slider_arrow_left_attr);
    this.slider_arrow_right = document.querySelector(this.UiSelectors.slider_arrow_right_attr);
    this.location = new UserLocation();
    this.fetchData = new FetchData();
    this.googleMap = null;
    this.uiElements = new UiElements();
    this.slider = new Slider(this.slider_body);
  }

  async handleAutoloc() {
    let { long, lat, error } = await this.location.autoLocation();
    if (!error) {
      this.input_lat!.value = `${lat}`;
      this.input_lng!.value = `${long}`;
    } else {
      alert(error);
    }
  }

  async handleSendCoords() {
    const latitude = this.input_lat?.value ?? '';
    const longitude = this.input_lng?.value ?? '';
    const plus = parseFloat(longitude) < 0 ? '' : '+';
    const coordsArr: { lat: number, lng: number }[] = [];
    let { parsedResponse, error } = await this.fetchData.fetchData({ lat: latitude, long: longitude, plus: plus });

    if (!error) {
      parsedResponse.data.forEach((item: any) => {
        coordsArr.push({ lat: item.latitude, lng: item.longitude })
      });
      this.googleMap!.setMap(latitude, longitude);
      this.googleMap!.setMarkers(coordsArr)
      this.uiElements.createAccordion(this.accordion_container, parsedResponse.data, ['country', 'region', 'latitude', 'longitude', 'population', 'distance'], 'Found Cities:')
    } else {
      alert(error);
    }
  }

  async handleSendCountryName() {
    const countryName = this.input_country?.value ?? '';
    const { parsedResponse, error } = await this.fetchData.fetchData({ namePrefix: countryName });

    if (!error) {
      this.uiElements.createAccordion(this.accordion_container, parsedResponse.data, ['name', 'code', 'currencyCodes'], 'Found Countries:');
      const cont = document.querySelector('.app__accordion');
      cont!.addEventListener('click', (e) => this.fetchCountryDetails(e));
    } else {
      alert(error);
    }
  }

  async fetchCountryDetails(e: any) {
    if (e.target.getAttribute('type') === 'checkbox' && !e.target.getAttribute('data-fetched')) {
      e.target.setAttribute('data-fetched', true);
      console.log(e.target.getAttribute('data-code'));
      const { parsedResponse, error } = await this.fetchData.fetchData({ countryId: e.target.getAttribute('data-code') });
      if (!error) {
        this.uiElements.addFields(e.target.parentNode.querySelector('[data-tab-content]'), parsedResponse.data, ['capital', 'numRegions', 'flagImageUri']);
        this.googleMap!.setGeocoder(e.target.getAttribute('name'));
      } else {
        alert(error);
      }
    }
  }

  setListeners() {
    switch (window.location.pathname) {
      case '/pages/country.html':
        this.btn_send_query?.addEventListener('click', () => this.handleSendCountryName());
        break;
      case '/pages/gallery.html':
        this.slider_arrow_left?.addEventListener('click', (e) => this.slider.shift(e));
        this.slider_arrow_right?.addEventListener('click', (e) => this.slider.shift(e));
        break;
      default:
        this.btn_auto_localization?.addEventListener('click', () => this.handleAutoloc());
        this.btn_send_query?.addEventListener('click', () => this.handleSendCoords());
    }
  }

  setUI() {
    switch (window.location.pathname) {
      case '/pages/country.html':
        this.uiElements.addMapsScript();
        this.uiElements.createDatalist(this.input_container, this.input_country, this.uiElements.countryList);
        break;
      default:
        this.uiElements.addMapsScript();
    }
  }

  init() {
    this.setUI();
    this.setListeners();
    (<any>window).initMap = function () {
      appInit.googleMap = document.getElementById('map') ? new GoogleMap() : null;
    };
  }

}



const appInit = new AppInit();
appInit.init();

