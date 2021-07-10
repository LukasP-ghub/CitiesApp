export class Slider {
  slider_body: HTMLUListElement | null;
  itemLiveCollection: HTMLCollection | undefined | any;
  transition: number;

  constructor(sliderBody: HTMLUListElement | null) {
    this.slider_body = sliderBody;
    this.itemLiveCollection = this.setItemCollection();
    this.transition = 0;
  }

  shift(e: any) {
    this.transition = this.itemLiveCollection![0].clientWidth;
    if (e.target.getAttribute('data-slider-arrow') === 'left') {

      this.itemLiveCollection[0].addEventListener('transitionend', () => {
        for (let i = 0; i < this.itemLiveCollection.length; i++) {
          this.itemLiveCollection[i].style.transition = `none`;
          this.itemLiveCollection[i].style.removeProperty('transform');
          setTimeout(() => {
            this.itemLiveCollection[i].style.removeProperty('transition');
            this.slider_body!.style.removeProperty('transform');
          });
        }
        this.slider_body!.appendChild(this.itemLiveCollection[0]);
      }, { once: true });

      this.slider_body!.style.transform = `translateX(0)`;
      for (let i = 0; i < this.itemLiveCollection.length; i++) {
        this.itemLiveCollection[i].style.transform = `translateX(-${this.transition}px)`;
      }
    } else {
      const element = this.itemLiveCollection[this.itemLiveCollection.length - 1];
      this.slider_body!.insertBefore(element, this.slider_body!.firstElementChild);
      for (let i = 0; i < this.itemLiveCollection.length; i++) {
        this.itemLiveCollection[i].classList.toggle('translate');
        setTimeout(() => {
          this.itemLiveCollection[i].classList.toggle('translate');
        });
      }
    }
  }

  setItemCollection() {
    return this.itemLiveCollection = this.slider_body?.children;
  }
}