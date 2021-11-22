import { PageConfigurator } from './pageConfigurator';
import { fetchDataType } from '../assets/types/types';



export class FetchData {
  private API: string;
  private API_ENDPOINT: 'locations' | 'countries';
  private API_URL: string;
  private pgConfig: PageConfigurator;

  constructor() {
    this.API = `https://wft-geo-db.p.rapidapi.com/v1/geo/`;
    this.API_ENDPOINT = `locations`;
    this.API_URL = '';
    this.pgConfig = new PageConfigurator();
  }

  setUrl({ lat, long, plus, countryId }: fetchDataType) {
    this.pgConfig.configHomePage(() => {
      this.API_ENDPOINT = 'locations';
      this.API_URL = `${this.API}${this.API_ENDPOINT}/${lat}${plus}${long}/nearbyCities?radius=100`
    });

    this.pgConfig.configCountryPage(() => {
      const query = `${countryId!.length > 3 ? `?namePrefix=${countryId}` : `${countryId}`}`;
      this.API_ENDPOINT = 'countries';
      this.API_URL = `${this.API}${this.API_ENDPOINT}/${query}`;
    })
  }

  async fetchData(params: fetchDataType) {
    let parsedResponse: any;
    this.setUrl(params);

    const response = await fetch(this.API_URL, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${process.env.APP_API_KEY}`,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      }
    });
    parsedResponse = await response.json();

    if (response.status != 200) {
      throw new Error(parsedResponse.errors[0].message);
    }

    return { parsedResponse };
  }
}
