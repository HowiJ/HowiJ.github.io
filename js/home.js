(function() {
  if (window.innerWidth < 550 || window.innerHeight < 580) {
    return;
  }
  document.querySelector('.scrollContinue').classList.add('animThree');
  const Logo = document.getElementById('Logo');

  const c = {x: window.innerWidth/2, y: window.innerHeight/2};
  const intensity = 0.01;
  const reset = {x: 0, y: 0, pad: 0};

  /**
   * Resets the Logo to the middle
   */
  function resetLogo() {
    c.x = window.innerWidth/2;
    c.y = window.innerHeight/2;

    const lHeight = Logo.clientHeight;
    const lWidth = Logo.clientWidth;
    reset.pad = window.innerHeight*0.1;
    reset.x = ((window.innerWidth/2)-(lWidth/2));
    reset.y = ((window.innerHeight/2)-(lHeight/2)-reset.pad);

    Logo.style.left = reset.x+'px';
    Logo.style.top = reset.y+'px';
  }

  /**
   * Handles the mouse moving for moving the logo
   * @param {object} e event object for mousemove
   */
  function handleMouseMove(e) {
    if (parseInt(window.location.pathname.substr(1)) !== 0) {
      return;
    }

    const diffX = (e.clientX-c.x)*intensity;
    const diffY = (e.clientY-c.y)*intensity;

    Logo.style.left = (reset.x+diffX)+'px';
    Logo.style.top = (reset.y+diffY)+'px';
  }

  /**
   * Handles the logo loading, sets the event listener for mousemove
   */
  function handleLogoLoad() {
    resetLogo();

    document.addEventListener('mousemove', handleMouseMove);
  }

  /**
   * Once logo loads up, star tup the handleLogoLoad.
   */
  function onLogoLoad() {
    const int = setInterval(() => {
      if (Logo.clientWidth !== 0) {
        clearInterval(int);
        handleLogoLoad();
        Logo.style.opacity = 0.6;
      }
    }, 10);
  }
  onLogoLoad();

  window.addEventListener('resize', () => {
    resetLogo();
  });
}());
