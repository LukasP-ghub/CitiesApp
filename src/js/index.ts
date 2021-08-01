import { UserLocation } from './userLocation';
import { FetchData } from './fetchData';
import { GoogleMap } from './googleMap';
import { UiElements } from './uiElements';
import { UiSelectors } from './uiSelectors';
import { Slider } from './slider';


class AppInit extends UiSelectors {
  location: UserLocation;
  fetchData: FetchData;
  googleMap: GoogleMap | null;
  uiElements: UiElements;
  slider: Slider;

  constructor() {
    super();
    this.location = new UserLocation();
    this.fetchData = new FetchData();
    this.googleMap = null;
    this.uiElements = new UiElements();
    this.slider = new Slider(this.slider_body);
  }

  getInputValue() {
    const latitude = this.input_lat?.value ?? '';
    const longitude = this.input_lng?.value ?? '';
    const countryName = this.input_country?.value ?? '';

    return { latitude, longitude, countryName }
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
    const { latitude, longitude } = this.getInputValue();
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
    const { countryName } = this.getInputValue();
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

