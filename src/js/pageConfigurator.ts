import { PageConfigParams } from '../assets/types/types';
import { PAGES } from '../assets/constants/constants';

export class PageConfigurator {

  private setPageConfig = ({ HOME = () => { }, COUNTRY = () => { }, GALLERY = () => { } }: PageConfigParams) => {

    switch (window.location.pathname) {
      case PAGES.HOME:
        HOME!();
        break;
      case PAGES.COUNTRY:
        COUNTRY!();
        break;
      case PAGES.GALLERY:
        GALLERY!();
        break;
      default:
        HOME!();
        break;
    }
  }

  configHomePage = (param: () => void) => {
    const config = {
      HOME: param,
    }
    this.setPageConfig(config)
  }

  configCountryPage = (param: () => void) => {
    const config = {
      COUNTRY: param,
    }
    this.setPageConfig(config)
  }

  configGalleryPage = (param: () => void) => {
    const config = {
      GALLERY: param,
    }
    this.setPageConfig(config)
  }
}

