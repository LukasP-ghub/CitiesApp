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
    this.uiElements = new UiElements({ accordion_template: this.accordion_template });
    this.slider = new Slider(this.slider_body);
  }

  getInputValue() {
    const latitude = this.input_lat?.value ?? '';
    const longitude = this.input_lng?.value ?? '';
    const countryName = this.input_country?.value ?? '';

    return { latitude, longitude, countryName }
  }

  async handleAutolocation() {
    let { long, lat, error } = await this.location.autoLocation();
    if (!error) {
      this.input_lat!.value = `${lat}`;
      this.input_lng!.value = `${long}`;
    } else {
      alert(error);
    }
  }

  async handleCoords() {
    const { latitude, longitude } = this.getInputValue();
    const plus = parseFloat(longitude) < 0 ? '' : '+';
    const coordsArr: { lat: number, lng: number }[] = [];
    try {
      let { parsedResponse } = await this.fetchData.fetchData({ lat: latitude, long: longitude, plus: plus });
      parsedResponse.data.forEach((item: any) => {
        coordsArr.push({ lat: item.latitude, lng: item.longitude })
      });
      this.googleMap!.setMap(latitude, longitude);
      this.googleMap!.setMarkers(coordsArr)
      this.uiElements.createAccordion(this.accordion_container, parsedResponse.data, ['country', 'region', 'latitude', 'longitude', 'population', 'distance'], 'Found Cities:')
    } catch (err: any) {
      alert(err.message);
    }
  }

  async handleCountry() {
    const { countryName } = this.getInputValue();
    try {
      const { parsedResponse } = await this.fetchData.fetchData({ countryId: countryName });
      const normalizedResData = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];
      this.uiElements.createAccordion(this.accordion_container, normalizedResData, ['name', 'code', 'currencyCodes'], 'Found Countries:');
      this.accordion_container!.addEventListener('click', (e) => this.handleCountryDetails(e));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async handleCountryDetails(e: any) {
    if (e.target.getAttribute('type') === 'checkbox' && !e.target.getAttribute('data-fetched')) {
      e.target.setAttribute('data-fetched', true);
      try {
        const { parsedResponse } = await this.fetchData.fetchData({ countryId: e.target.getAttribute('data-code') });
        this.uiElements.addFields(e.target.parentNode.querySelector('[data-tab-content]'), parsedResponse.data, ['capital', 'numRegions', 'flagImageUri']);
        this.googleMap!.setGeocoder(e.target.getAttribute('name'));
      } catch (err: any) {
        alert(err.message);
        e.target.setAttribute('data-fetched', false);
      }
    }
  }

  setPageConfig() {
    switch (window.location.pathname) {
      case '/pages/country.html':
        this.uiElements.addMapsScript();
        this.uiElements.createDatalist(this.input_container, this.input_country, this.uiElements.setDataList());
        this.btn_send_query?.addEventListener('click', () => this.handleCountry());
        break;
      case '/pages/gallery.html':
        this.slider_arrow_left?.addEventListener('click', (e) => this.slider.shift(e));
        this.slider_arrow_right?.addEventListener('click', (e) => this.slider.shift(e));
        break;
      default:
        this.uiElements.addMapsScript();
        this.btn_auto_localization?.addEventListener('click', () => this.handleAutolocation());
        this.btn_send_query?.addEventListener('click', () => this.handleCoords());
    }
  }

  init() {
    this.setPageConfig();
    (<any>window).initMap = function () {
      appInit.googleMap = document.getElementById('map') ? new GoogleMap() : null;
    };
  }

}

const appInit = new AppInit();
appInit.init();



