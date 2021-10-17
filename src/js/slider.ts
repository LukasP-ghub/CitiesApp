export class Slider {
  private slider_body: HTMLUListElement | null;
  private itemLiveCollection: HTMLCollection | undefined;
  private transitionRange: number;

  constructor(sliderBody: HTMLUListElement | null) {
    this.slider_body = sliderBody;
    this.itemLiveCollection = this.setItemCollection();
    this.transitionRange = 0;
  }

  setTransitionRange() {
    const element = this.itemLiveCollection![0] as HTMLElement;
    this.transitionRange = element.offsetWidth;
  }

  shift(e: any) {
    if (!this.itemLiveCollection || this.itemLiveCollection.length === 0) return;
    this.setTransitionRange();
    if (e.target.getAttribute('data-slider-arrow') === 'left') {
      this.itemLiveCollection![0].addEventListener('transitionend', () => {
        for (let i = 0; i < this.itemLiveCollection!.length; i++) {
          const element = this.itemLiveCollection![i] as HTMLElement;
          element.style.transition = `none`;
          element.style.removeProperty('transform');
          setTimeout(() => {
            element.style.removeProperty('transition');
            this.slider_body!.style.removeProperty('transform');
          });
        }
        this.slider_body!.appendChild(this.itemLiveCollection![0]);
      }, { once: true });

      this.slider_body!.style.transform = `translateX(0)`;
      for (let i = 0; i < this.itemLiveCollection!.length; i++) {
        const element = this.itemLiveCollection![i] as HTMLElement;
        element.style.transform = `translateX(-${this.transitionRange}px)`;
      }

    } else {
      const element = this.itemLiveCollection![this.itemLiveCollection!.length - 1];
      this.slider_body!.insertBefore(element, this.slider_body!.firstElementChild);
      for (let i = 0; i < this.itemLiveCollection!.length; i++) {
        this.itemLiveCollection![i].classList.toggle('translate');
        setTimeout(() => {
          this.itemLiveCollection![i].classList.toggle('translate');
        });
      }
    }
  }

  setItemCollection() {
    return this.itemLiveCollection = this.slider_body?.children;
  }
}