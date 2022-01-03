import { UserLocation } from './userLocation';
import { FetchData } from './fetchData';
import { GoogleMap } from './googleMap';
import { UiElements } from './uiElements';
import { UiSelectors } from './uiSelectors';
import { Slider } from './slider';
import { PageConfigurator } from './pageConfigurator';
import { Accordion } from './accordion';

class AppInit extends UiSelectors {
  location: UserLocation;
  fetchData: FetchData;
  googleMap: GoogleMap | null;
  uiElements: UiElements;
  slider: Slider;
  pgConfig: PageConfigurator;
  accordion?: Accordion;

  constructor() {
    super();
    this.pgConfig = new PageConfigurator();
    this.location = new UserLocation();
    this.fetchData = new FetchData();
    this.googleMap = null;
    this.uiElements = new UiElements({ accordion_template: this.accordion_template, uiSelectors: this.UiSelectors });
    this.slider = new Slider(this.slider_body);
  }

  getCoordsValue() {
    let latitude = +this.input_lat!.value;
    let longitude = +this.input_lng!.value;

    if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) throw new Error('Invalid coordinates value');
    if (latitude < -90 || latitude > 90) throw new Error('Latitude must contain between -90 and 90');
    if (longitude < -180 || longitude > 180) throw new Error('Longitude must contain between -180 and 180');

    return { latitude, longitude }
  }

  getCountryNameValue() {
    const countryName = this.input_country?.value;

    if (!countryName) throw new Error('Enter country name');

    return countryName;
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
    try {
      const { latitude, longitude } = this.getCoordsValue();
      const plus = longitude < 0 ? '' : '+';
      const coordsArr: { lat: number, lng: number }[] = [];

      let { parsedResponse } = await this.fetchData.fetchData({ lat: latitude, long: longitude, plus: plus });
      parsedResponse.data.forEach((item: any) => {
        coordsArr.push({ lat: item.latitude, lng: item.longitude })
      });

      this.googleMap!.setMap(latitude, longitude);
      this.googleMap!.setMarkers(coordsArr);

      this.accordion = new Accordion({
        container: this.accordion_container,
        data: parsedResponse.data,
        fieldKeys: ['country', 'region', 'latitude', 'longitude', 'population', 'distance'],
        title: 'Found Cities:'
      });

    } catch (err: any) {
      alert(err.message);
    }
  }

  async handleCountry() {
    try {
      const countryName = this.getCountryNameValue();
      const { parsedResponse } = await this.fetchData.fetchData({ countryId: countryName });
      const normalizedResData = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];

      this.accordion = new Accordion({
        container: this.accordion_container,
        data: normalizedResData,
        fieldKeys: ['name', 'code', 'currencyCodes'],
        title: 'Found Countries:'
      });
      this.accordion.addEventCallback((e) => { this.handleCountryDetails(e) });

    } catch (err: any) {
      alert(err.message);
    }
  }

  async handleCountryDetails(e: any) {
    if (e.target.getAttribute('data-fetched')) return;
    const name = e.target.getAttribute('name');
    e.target.setAttribute('data-fetched', true);

    try {
      const { parsedResponse } = await this.fetchData.fetchData({ countryId: e.target.getAttribute('data-code') });
      this.accordion!.addFields(parsedResponse.data, ['capital', 'numRegions', 'flagImageUri']);
      this.googleMap!.setGeocoder(name);
    } catch (err: any) {
      alert(err.message);
      e.target.setAttribute('data-fetched', false);
    }
  }

  init() {
    this.pgConfig.configHomePage(() => {
      this.uiElements.addMapsScript();
      this.btn_auto_localization?.addEventListener('click', () => this.handleAutolocation());
      this.btn_send_query?.addEventListener('click', () => this.handleCoords());
    });

    this.pgConfig.configCountryPage(() => {
      this.uiElements.addMapsScript();
      this.uiElements.createDatalist(this.input_container, this.input_country, this.uiElements.getDataList());
      this.btn_send_query?.addEventListener('click', () => this.handleCountry());
    });

    this.pgConfig.configGalleryPage(() => {
      this.slider_arrow_left?.addEventListener('click', (e) => this.slider.shift(e));
      this.slider_arrow_right?.addEventListener('click', (e) => this.slider.shift(e));
    });

    (<any>window).initMap = function () {
      appInit.googleMap = document.getElementById('map') ? new GoogleMap() : null;
    };
  }
}

const appInit = new AppInit();
appInit.init();



