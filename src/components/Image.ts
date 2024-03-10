export class ImageComponent {
  private el: HTMLElement;

  constructor(src: string, title: string) {
    // 코드상의 innterHTML은 상관없지만 사용자의값을 받아서 바로쓰는것은 sanitize가 필요 그래서 필요한 부분만 업데이트

    const template = document.createElement('template');
    template.innerHTML = `<section class="img_section">
    <div class="img_wrapper">
      <img class='img_thumbnail' src="" alt="" />
      <p class="img_title"></p>
    </div>
  </section>`;

    this.el = template.content.firstElementChild! as HTMLElement;

    const imgEl = this.el.querySelector('.img_thumbnail')! as HTMLImageElement;
    imgEl.src = src;

    const uniqueElId = crypto.randomUUID();

    imgEl.alt = `${title} ${uniqueElId}`;

    const titleEl = this.el.querySelector('.img_title')! as HTMLParagraphElement;
    titleEl.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.el);
  }
}