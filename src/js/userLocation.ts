export class UserLocation {
  latitude: number;
  longitude: number;

  constructor(lat = '0', long = '0') {
    this.latitude = parseFloat(lat);
    this.longitude = parseFloat(long);
  }

  async autoLocation() {
    let lat: number = 0;
    let long: number = 0;
    let error: string = '';

    try {
      let res: GeolocationPosition = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      })
      lat = parseFloat(res.coords.latitude.toFixed(4));
      long = parseFloat(res.coords.longitude.toFixed(4));
    } catch (err: any) {
      error = err.message;
    }

    return { lat, long, error };
  }

}