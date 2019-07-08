import { windowScroll } from './components/scrollto';

class App {
  constructor() {
    this.init()
  }
  init() {
    const navlinks = document.getElementById('navlist');
    this.goto = this.goto.bind(this);
    navlinks.addEventListener('click', this.goto);
  }
  goto(e) {
    const link = e.target.closest('a');
    if (!link) return;

    e.preventDefault();

    const target = link.hash.slice(1);
    const section = document.getElementById(target);
    if(!section) return;

    const offset = section.getBoundingClientRect().top + window.pageYOffset;
    windowScroll(offset);
  }
}

new App;
