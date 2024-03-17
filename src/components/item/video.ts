import { Component } from '../Component.js';

export class VideoComponent extends Component<HTMLElement> {
  constructor(title: string, srcUrl: string) {
    super(`<section class="video">
            <div class="video_player">
       <h3 class="video__title"></h3>
       <iframe class="video__iframe"></iframe>
    </div>
  </section>
  `);

    const $iframe = this.el.querySelector('.video__iframe')! as HTMLIFrameElement;
    $iframe.src = this.convertToEmbeddedURL(srcUrl);
    console.log(srcUrl);

    const $title = this.el.querySelector('.video__title')! as HTMLHeadingElement;
    $title.textContent = title;
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-_]{11}))|(?:youtu.be\/([a-zA-Z0-9-_]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    //0은 전체 1 은 순수 받았던거 2는 맞는부분
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
