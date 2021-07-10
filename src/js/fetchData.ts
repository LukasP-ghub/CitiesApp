interface fetchDataType {
  lat?: string;
  long?: string;
  plus?: string;
  namePrefix?: string;
  countryId?: string;
}

export class FetchData {
  API: string;
  API_ENDPOINT: 'locations' | 'countries';
  API_URL: string;

  constructor() {
    this.API = `https://wft-geo-db.p.rapidapi.com/v1/geo/`;
    this.API_ENDPOINT = `locations`;
    this.API_URL = '';
  }

  setUrl({ lat, long, plus, namePrefix, countryId }: fetchDataType) {
    const searchQuery = `${namePrefix ? `?namePrefix=${namePrefix}` : ''}`;
    const id = countryId ? `/${countryId}` : '';

    switch (window.location.pathname) {
      case '/pages/country.html':
        this.API_ENDPOINT = 'countries';
        this.API_URL = `${this.API}${this.API_ENDPOINT}${id}${searchQuery}`;
        break;
      default:
        this.API_ENDPOINT = 'locations';
        this.API_URL = `${this.API}${this.API_ENDPOINT}/${lat}${plus}${long}/nearbyCities?radius=100`
    }
  }

  async fetchData(params: fetchDataType) {
    let parsedResponse: any;
    let error: string = '';
    this.setUrl(params);

    try {
      const response = await fetch(this.API_URL, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${process.env.APP_API_KEY}`,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
      });
      parsedResponse = await response.json();
      if (response.status >= 400) {
        error = parsedResponse.message;
      }
    } catch (err) {
      error = err.message;
    }
    return { parsedResponse, error };
  }

}
