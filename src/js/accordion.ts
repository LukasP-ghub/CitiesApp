import { UiSelectors } from './uiSelectors';

interface IAccordionParams {
  container: Element,
  data: {}[],
  fieldKeys: string[],
  title: string,
}

interface IAccordionClass {
  handleExpandTab: (e: any) => boolean;
}

export class Accordion extends UiSelectors implements IAccordionClass {
  data: {}[];
  template: HTMLTemplateElement;
  container: Element;
  fieldKeys: string[];
  title: string;
  eventHandler: (e: any) => void;


  constructor({ container, data, fieldKeys, title }: IAccordionParams) {
    super();
    this.data = data;
    this.container = container;
    this.fieldKeys = fieldKeys;
    this.title = title;
    this.template = this.accordion_template;
    this.eventHandler = () => { };
    this.create();
    this.addEventCallback();
    this.container.addEventListener('click', (e) => { this.eventHandler(e) });
  }

  cloneAccordionElements() {
    const heading = this.template!.content.querySelector(this.UiSelectors.accordion_heading_attr)!.cloneNode(true) as HTMLHeadingElement;
    const accordion = this.template!.content.querySelector(this.UiSelectors.accordion_accordion_attr)!.cloneNode(false) as HTMLDivElement;
    const tab = this.template!.content.querySelector(this.UiSelectors.accordion_tab_attr)!.cloneNode(false) as HTMLDivElement;
    const tabHead = this.template!.content.querySelector(this.UiSelectors.accordion_tabHead_attr)!.cloneNode(false) as HTMLInputElement;
    const tabTitle = this.template!.content.querySelector(this.UiSelectors.accordion_tabTitle_attr)!.cloneNode(false) as HTMLLabelElement;
    const tabContent = this.template!.content.querySelector(this.UiSelectors.accordion_tabContent_attr)!.cloneNode(false) as HTMLDivElement;
    const contentKey = this.template!.content.querySelector(this.UiSelectors.accordion_contentKey_attr)!.cloneNode(false) as HTMLSpanElement;
    const contentValue = this.template!.content.querySelector(this.UiSelectors.accordion_contentValue_attr)!.cloneNode(false) as HTMLSpanElement;
    const image = this.template!.content.querySelector(this.UiSelectors.accordion_image_attr)!.cloneNode(false) as HTMLImageElement;

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

  create() {
    if (this.container!.children.length) {
      Array.from(this.container!.children).forEach(item => {
        item.remove();
      })
    }
    const { heading, accordion } = this.cloneAccordionElements();

    this.data.forEach((item: any, index: number) => {
      const { tab, tabContent, tabHead, tabTitle } = this.cloneAccordionElements();
      tabHead.setAttribute('name', item.name);
      tabHead.setAttribute('id', `tab-head-${index + 1}`);
      tabHead.setAttribute('aria-controls', `tab-content-${index + 1}`);
      tabHead.setAttribute('aria-expanded', "false");
      tabHead.setAttribute('data-code', item.code ?? 'none');
      tabTitle.setAttribute('for', item.name);
      tabTitle.textContent = item.name;
      tabContent.setAttribute('id', `tab-content-${index + 1}`);
      tabContent.setAttribute('aria-labelledby', `tab-head-${index + 1}`);

      this.fieldKeys.forEach((key: string) => {
        const { contentKey, contentValue } = this.cloneAccordionElements();
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

    heading.textContent = this.title;
    this.container!.appendChild(heading);
    this.container!.appendChild(accordion);
  }

  addFields(data: any, fieldKeys: string[]) {
    const contentContainer = this.container.querySelector(this.UiSelectors.accordion_tabContent_attr)!;
    fieldKeys.forEach((key: string) => {
      const { contentKey, contentValue, image } = this.cloneAccordionElements();
      if (key === 'flagImageUri') {
        image.setAttribute('src', data[key]);
        image.setAttribute('alt', `Flag of ${data.name}`);
        contentContainer.appendChild(image);
        return;
      }
      contentKey.textContent = key;
      contentValue.textContent = typeof data[key] === 'object' && data[key] ? data[key].join(', ') : data[key];
      contentContainer.appendChild(contentKey);
      contentContainer.appendChild(contentValue);
    })
  }

  handleExpandTab = (e: any) => {
    if (e.target.getAttribute('type') !== 'checkbox') return true;
    e.target.setAttribute('aria-expanded', e.target.getAttribute('aria-expanded') === "false" ? "true" : "false");
    return false;
  }

  addEventCallback = (callback = (e: any) => { }) => {
    this.eventHandler = (e: any) => {
      if (this.handleExpandTab(e)) return;
      callback(e);
    }
  }
}