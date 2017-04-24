// Component which handles all of the custom page switching.
class Route {
  constructor () {
    this.page = parseInt(window.location.pathname.substr(1)) || 0;
    this.pages = document.querySelectorAll('.FullPage');
    this.tran_page = document.querySelector('.TransitionPage');
    this.switch = false;

    this._init();
  }
  // Minor initializing of certain properties and window states.
  _init () {
    if (this.page > this.pages.length-1) { this.page = this.pages.length-1; }
    else if (!+this.page || this.page < 0) { this.page = 0; }
    window.history.pushState({}, '', `/${this.page}` );

    this.pages[this.page].style.opacity = 1;
  }
  // Begins the switching. (This assumes the window state is already changed)
  _setLocation (next) {
    this.switchMode = true;
    next = +next;

    document.getElementById('title_next').innerHTML = this.pages[next].dataset.page;

    this.tran_page.style.display = 'block';

    this._fadeTranPage(next);
  }
  // Fades the Transition Page in and then out.
  _fadeTranPage (next) {
    const max = 150;
    const middle = max/2;
    let time = 0;
    let subTime = 0;
    // Fade in or out
    let mode = true;

    const inter = setInterval(() => {
      /////////////////////////////////////////
      time++;
      // Last Page || first page || Done
      if (time >= max) {
        this.tran_page.style.opacity = 0;
        clearInterval(inter); 
        this.switchMode = false; 

        this.tran_page.style.display = 'none';
        return;
      } 
      /////////////////////////////////////////

      /////////////////////////////////////////
      subTime++;
      if (mode && subTime < middle) {
        // Fade In
        this.tran_page.style.opacity = (subTime/middle)*2;
      }
      if (!mode && subTime < middle) {
        // Fade Out
        this.tran_page.style.opacity = (1-subTime/middle)*2;
      }

      if ((mode && subTime >= middle) || (!mode && subTime >= middle)) {
        mode = !mode;
        subTime = 0;

        this.pages[this.page].style.opacity = 0;
        this.pages[this.page].style.display = 'none';
        this.page = next;
        this.pages[this.page].style.display = 'block';
        this.pages[this.page].style.opacity = 1;
      }
      
    }, 1000/60);
  }
  // For Up/Down keys & Scroll Up/Down
  // Handles Window History State
  location (page) {
    if (page === undefined) { return this.page; }

    // Transition page
    if (this.switchMode === true) { return; }

    if (page < 0)                  { page = 0 }
    if (page >= this.pages.length) { page = this.pages.length-1 }

    if (page === this.page) { this.switchMode = false; return; }

    window.history.pushState( {}, '', `/${page}` );
    this._setLocation(page);
  }

  next() { $router.location($router.location()+1); }
  prev() { $router.location($router.location()-1); }
}

const $router = new Route();
