(function() {
  if (window.innerWidth < 550 || window.innerHeight < 580) {
    return;
  }
  // const About = document.getElementsByClassName('About')[0];
  const af = document.getElementById('about_flashes');
  // const xMid = window.innerWidth/2;

  /**
   * Sets the about page flashing random location
   * @param {object} el the element that flashes
   */
  function setAboutFlashesLocation(el) {
    const randy = Math.random()*(window.innerHeight-el.clientHeight);
    const randx = Math.random()*(window.innerWidth-el.clientWidth);

    el.style.opacity = 1;
    el.style.top = (randy)+'px';
    el.style.left = (randx)+'px';
  }

  /**
   * Sets the about page flashing random location
   * @param {object} el the element that flashes
   * @param {int} iTime the in time
   * @param {int} oTime the out time
   * @param {int} delay the hold after flashing in
   * @param {int} minHeight Don't think i used this...
   */
  function handleAboutFlashes( el, iTime, oTime, delay, minHeight = 0 ) {
    setAboutFlashesLocation(el);
    el.style.opacity = 0;

    let mode = 2; // 0: iTime, 1: oTime, 2: delay
    let elapsed = 0;
    iTime = iTime*1000/60;
    oTime = oTime*1000/60;
    delay = delay*1000/60;

    // Handles about page background "About Me" flashes
    setInterval(() => {
      if ( $router.location() !== 1 ) {
        return;
      }
      elapsed++;

      switch (mode) {
        case 0:
          el.style.opacity = elapsed/iTime;
          if (elapsed >= iTime) {
            elapsed = 0;
            mode = 3;
          }
          break;
        case 1:
          el.style.opacity = 1-elapsed/oTime;
          if (elapsed >= oTime) {
            elapsed = 0;
            mode = 2;
          }
          break;
        case 2:
          if (elapsed >= delay) {
            setAboutFlashesLocation(el);
            el.style.opacity = 0;
            elapsed = 0;
            mode = 0;
          }
          break;
        default:
          if (elapsed >= delay) {
            elapsed = 0;
            mode = 1;
          }
          break;
      }
    }, 1000/60);
  }

  /**
   * Starts the flashes and positions the element
   */
  function handleAboutDesc() {
    const el = document.getElementById('kf_about_desc');
    const ptop = el.offsetTop;
    const mid = ((window.innerHeight/2)-ptop)-(el.clientHeight/2);
    el.style.marginTop = (mid-ptop) + 'px';
  }

  /**
   * Once the component is loaded
   * @param {object} el the element that flashes
   * @param {function} callback what to do after the element is loaded
   */
  function componentDidLoad(el, callback) {
    const int = setInterval(() => {
      if (el.clientWidth !== 0) {
        el.style.width = el.clientWidth;
        clearInterval(int);
        if (callback && typeof callback == 'function') {
        callback(el);
        }
      }
    }, 10);
  }

  componentDidLoad(af, (el) => {
      handleAboutFlashes(el, 4, 4, 8);
      handleAboutDesc();
  });
}());
