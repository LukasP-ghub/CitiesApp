import { TUiSelectors } from '../assets/types/types';

export class UiElements {
  private countryList: string[];
  private accordionTemplate: HTMLTemplateElement | null;
  uiSelectors: TUiSelectors;

  constructor(params: any) {
    this.countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    this.accordionTemplate = params.accordion_template;
    this.uiSelectors = params.uiSelectors;
  }

  getDataList(data: string[] = this.countryList) {
    return data;
  }

  cloneAccordionElements(template: HTMLTemplateElement | null) {
    const heading = template!.content.querySelector(this.uiSelectors.accordion_heading_attr)!.cloneNode(true) as HTMLHeadingElement;
    const accordion = template!.content.querySelector(this.uiSelectors.accordion_accordion_attr)!.cloneNode(false) as HTMLDivElement;
    const tab = template!.content.querySelector(this.uiSelectors.accordion_tab_attr)!.cloneNode(false) as HTMLDivElement;
    const tabHead = template!.content.querySelector(this.uiSelectors.accordion_tabHead_attr)!.cloneNode(false) as HTMLInputElement;
    const tabTitle = template!.content.querySelector(this.uiSelectors.accordion_tabTitle_attr)!.cloneNode(false) as HTMLLabelElement;
    const tabContent = template!.content.querySelector(this.uiSelectors.accordion_tabContent_attr)!.cloneNode(false) as HTMLDivElement;
    const contentKey = template!.content.querySelector(this.uiSelectors.accordion_contentKey_attr)!.cloneNode(false) as HTMLSpanElement;
    const contentValue = template!.content.querySelector(this.uiSelectors.accordion_contentValue_attr)!.cloneNode(false) as HTMLSpanElement;
    const image = template!.content.querySelector(this.uiSelectors.accordion_image_attr)!.cloneNode(false) as HTMLImageElement;

    return {
      heading,
      accordion,
      tab,
      tabHead,
      tabTitle,
      tabContent,
      contentKey,
      contentValue,
      image,
    }
  }

  createAccordion(container: Element | null, data: {}[], fieldKeys: string[], title: string) {
    if (container!.children.length) {
      Array.from(container!.children).forEach(item => {
        item.remove();
      })
    }
    const { heading, accordion } = this.cloneAccordionElements(this.accordionTemplate);
    data.forEach((item: any) => {
      const { tab, tabContent, tabHead, tabTitle } = this.cloneAccordionElements(this.accordionTemplate);
      tabHead.setAttribute('name', item.name);
      tabHead.setAttribute('id', item.name);
      tabHead.setAttribute('data-code', item.code ?? 'none');
      tabTitle.setAttribute('for', item.name);
      tabTitle.textContent = item.name;

      fieldKeys.forEach((key: string) => {
        const { contentKey, contentValue } = this.cloneAccordionElements(this.accordionTemplate);
        contentKey.textContent = key;

        if (key === 'latitude' || key === 'longitude') {
          contentValue.textContent = parseFloat(item[key]).toFixed(3);
        } else {
          contentValue.textContent = typeof item[key] === 'object' ? item[key].join(', ') : item[key];
        }

        tabContent.appendChild(contentKey);
        tabContent.appendChild(contentValue);
      });

      tab.appendChild(tabHead);
      tab.appendChild(tabTitle);
      tab.appendChild(tabContent);
      accordion.appendChild(tab);
    });

    heading.textContent = title;
    container!.appendChild(heading);
    container!.appendChild(accordion);
  }

  createDatalist(container: HTMLDivElement | null, input: HTMLInputElement | null, data: string[]) {
    const fragment = document.createDocumentFragment();
    const dataList = document.createElement('datalist');
    dataList.setAttribute('id', `${input!.getAttribute('list')}`);

    data.forEach(item => {
      const dataListOption = document.createElement('option');
      dataListOption.setAttribute('value', item);
      dataList.appendChild(dataListOption);
    });
    fragment.appendChild(dataList);
    container!.appendChild(fragment);
  }

  addFields(container: Element, data: any, fieldKeys: string[]) {
    fieldKeys.forEach((key: string) => {
      const { contentKey, contentValue, image } = this.cloneAccordionElements(this.accordionTemplate);
      if (key === 'flagImageUri') {
        image.setAttribute('src', data[key]);
        image.setAttribute('alt', `Flag of ${data.name}`);
        container.appendChild(image);
        return;
      }
      contentKey.textContent = key;
      contentValue.textContent = typeof data[key] === 'object' && data[key] ? data[key].join(', ') : data[key];
      container.appendChild(contentKey);
      container.appendChild(contentValue);
    })
  }

  addMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.APP_GOOGLE_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }

}