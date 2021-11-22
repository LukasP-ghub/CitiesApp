# cities-app
 Fetch cities near location coords or countries to get few basic statistics from GeoDB Cities API and use Goggle Maps to locate them.

## Stack
- HTML
- SCSS, BEM
- TypeScript
- Parcel

## Live
https://cities-app-ts.netlify.app/

## Building and running on localhost

Clone project

```sh
git clone https://github.com/LukasP-ghub/CitiesApp.git
```

Install dependencies:

```sh
npm install
```

Run

```sh
npm start
```

## Description
### JS files:
```sh
index: Contains app initialization class which is responsible for handling main app features, binding events etc. 
```
```sh
uiSelectors: Store Class for DOM elements and selectors. Inherited by main AppInit class for readability.
```
```sh
uiElements: Delivers methods that are creating dynamic DOM elements.
```
```sh
userLocation: Delivers method to get user location coords.
```
```sh
fetchData: Setting url, handling fetch.
```
```sh
googleMap: Handle google map- geocoding, setting markers.
```
```sh
pageConfigurator: Deliver methods to initialize page features like listeners etc. depends on current app page.
```
```sh
slider: Handle infinite carousel gallery.
```

## Credits

Made with [createapp.dev](https://createapp.dev/)

