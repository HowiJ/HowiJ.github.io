(function () {
  // If screen is too small, don't want any of this to happen.
  if (window.innerWidth < 550 || window.innerHeight < 580) {
    return;
  }

  // Scroll Up or down Routing. 
  // Doesn't affect scrolling left and right
  function scrollHandler(e) {
    if ( Math.abs(e.deltaX) > 1 ) { return; }

    if (e.deltaY < -1) {
      // Scroll Up
      $router.prev();
    } else if (e.deltaY > 1) {
      // Scroll Down
      $router.next();
    }
  }

  // Up & Down Key Routing
  function onKeyPress (e) {
    switch (e.keyCode) {
      case 40: // Down
        $router.next();
        break;
      case 38: // Up
        $router.prev();
        break;
    }
    return;
  }

  // Navigation Links Routing
  document.querySelectorAll('.nav-links').forEach(ele => {
    const linkTo = +ele.dataset.link || 0;

    ele.addEventListener('click', () => {
      $router.location(linkTo);
    })
  })

  // Back/Forward Button Routing
  window.onpopstate = function(e) {
    const int = setInterval(()=> {
      if (!$router.switchMode) {
        clearInterval(int);

          $router._setLocation(window.location.pathname.substr(1));
        return;
      }
    }, 20)
  };

  document.addEventListener('keydown', onKeyPress);
  window.addEventListener('mousewheel', scrollHandler);
  window.addEventListener('DOMMouseScroll', scrollHandler);
  Array.prototype.forEach.call(document.getElementsByClassName('logo'), logo => { logo.addEventListener('click', ()=>{ $router.location(0); }) }, this);
}())
