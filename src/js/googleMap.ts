export class GoogleMap {
  private map: google.maps.Map;
  private geocoder: google.maps.Geocoder;

  constructor() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      disableDefaultUI: true
    });
    this.geocoder = new google.maps.Geocoder();
  }

  setMap(latitude: string, longitude: string) {
    const lat = parseFloat(parseFloat(latitude).toFixed(4));
    const lng = parseFloat(parseFloat(longitude).toFixed(4));
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: lat, lng: lng },
      zoom: 12,
      disableDefaultUI: true
    });
  }

  setMarkers(data: { lat: number, lng: number }[]) {
    data.forEach((item) => new google.maps.Marker({
      position: item,
      map: this.map,
    }))
  }

  setGeocoder(adress: string) {
    this.geocoder.geocode({ 'address': adress }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(5);
      }
    });
  }
}