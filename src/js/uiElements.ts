export class UiElements {
  countryList: string[];

  constructor() {
    this.countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  }

  createAccordion(container: Element | null, data: {}[], fieldKeys: string[], title: string) {
    const fragment = document.createDocumentFragment();
    const tabsContainer = document.createElement('div');
    const hTitle = document.createElement('h2');
    tabsContainer.classList.add('app__accordion');
    hTitle.classList.add('app__heading');
    hTitle.textContent = title;

    data.forEach((item: any, index: number) => {
      const tab = document.createElement('div');
      const input = document.createElement('input');
      const label = document.createElement('label');
      const tabContent = document.createElement('div');

      fieldKeys.forEach((key: string) => {
        const field = document.createElement('span');
        const fieldValue = document.createElement('span');
        field.classList.add('item');
        fieldValue.classList.add('item');
        fieldValue.classList.add('item-value');
        field.textContent = key;
        fieldValue.textContent = typeof item[key] === 'object' ? item[key].join(', ') : item[key];
        tabContent.appendChild(field);
        tabContent.appendChild(fieldValue);
      })

      tab.classList.add('tab');
      input.classList.add('tab-head');
      label.classList.add('tab-title');
      tabContent.classList.add('tab-content');
      tabContent.setAttribute('data-tab-content', '');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', item.name);
      input.setAttribute('id', item.name);
      input.setAttribute('data-code', item.code ?? 'none');
      label.setAttribute('for', item.name);
      label.textContent = item.name;
      tab.appendChild(input);
      tab.appendChild(label);
      tab.appendChild(tabContent);
      tabsContainer.appendChild(tab);
    });

    if (container?.children) {
      Array.from(container.children).forEach(item => {
        item.remove();
      })
    }
    fragment.appendChild(hTitle);
    fragment.appendChild(tabsContainer);
    container?.appendChild(fragment);
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
    const fragment = document.createDocumentFragment();
    fieldKeys.forEach((key: string) => {
      if (key === 'flagImageUri') {
        const img = document.createElement('img');
        img.classList.add('item-img');
        img.setAttribute('src', data[key]);
        img.setAttribute('alt', `Flag of ${data.name}`);
        fragment.appendChild(img);
        return;
      }
      const field = document.createElement('span');
      const fieldValue = document.createElement('span');
      field.classList.add('item');
      fieldValue.classList.add('item');
      fieldValue.classList.add('item-value');
      field.textContent = key;
      fieldValue.textContent = typeof data[key] === 'object' && data[key] ? data[key].join(', ') : data[key];
      fragment.appendChild(field);
      fragment.appendChild(fieldValue);
    })
    container.appendChild(fragment);
  }

  addMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.APP_GOOGLE_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  }

}