(function () {
  if (window.innerWidth < 550 || window.innerHeight < 580) {
    return;
  }
  
  const pages = document.querySelectorAll('.FullPage');
  const links = document.querySelectorAll('.nav-links');

  const lastPage = pages.length-1;

  let currentPage = parseInt(window.location.pathname.substr(1)) || 0;
  if (currentPage > pages.length-1) { currentPage = pages.length-1; }
  let switchMode = false;
  window.history.pushState({}, '', `/${currentPage}` )

  const transitionPage = document.querySelector('.TransitionPage');
  const LoadingPage = document.getElementById('LoadingPage');
  transitionPage.style.display = 'none';

  pages[currentPage].style.opacity = 1;

  const keyframes = [
    [
      false,
      false,
      document.getElementById('scroll'),
    ],
  ]
  function fireKeyFrames(page) {
    if (keyframes[page]) {
      if (keyframes[page][0]) {
        keyframes[page][0].classList.remove('dispNone');
        keyframes[page][0].classList.add('animOne');
      }
      if (keyframes[page][1]) {
        keyframes[page][1].classList.remove('dispNone');
        keyframes[page][1].classList.add('animTwo');
      }
      if (keyframes[page][2]) {
        keyframes[page][2].classList.remove('dispNone');
        keyframes[page][2].classList.add('animThree');
      }
    }
  }

  for (let i in keyframes) {
    for (let j in keyframes[i]) {
      if (keyframes[i][j]) {
        keyframes[i][j].classList.add('dispNone');
      }
    }
  }
  fireKeyFrames(currentPage);

  function handlePageSwitch(page) {
      switchMode = true;
      window.history.pushState({}, '', `/${page}` );
      router(page);
  }

  function router(next) {
    next = +next;
    if (next < 0)             { next = 0; window.history.pushState({}, '', `/${next}`);}
    if (next >= pages.length) { next = pages.length-1; window.history.pushState({}, '', `/${next}`); }
    if (next === currentPage) { switchMode = false; return; }
    document.getElementById('title_next').innerHTML = pages[next].dataset.page;

    transitionPage.style.display = 'block';
    const max = 150;
    const middle = max/2;

    let time = 0;
    let subTime = 0;
    let mode = true;


    const inter = setInterval(() => {
      /////////////////////////////////////////
      time++;
      // Last Page || first page || Done
      if (time >= max) {
        transitionPage.style.opacity = 0;
        clearInterval(inter); 
        switchMode = false; 

        transitionPage.style.display = 'none';
        fireKeyFrames(currentPage); 
        return;
      } 
      /////////////////////////////////////////

      /////////////////////////////////////////
      subTime++;
      if (mode && subTime < middle) {
        // Fade In
        transitionPage.style.opacity = (subTime/middle)*2;
      }
      if (!mode && subTime < middle) {
        // Fade Out
        transitionPage.style.opacity = (1-subTime/middle)*2;
      }

      if ((mode && subTime >= middle) || (!mode && subTime >= middle)) {
        mode = !mode;
        subTime = 0;


        pages[currentPage].style.opacity = 0;
        pages[currentPage].style.display = 'none';
        currentPage = next;
        pages[currentPage].style.display = 'block';
        pages[currentPage].style.opacity = 1;
      }
      
    }, 1000/60);
    return;
  }

  function scrollHandler(e) {
    if (switchMode === true || Math.abs(e.deltaX) > 1) { return; }

    if (e.deltaY < -1) {
      // Scroll Up
      handlePageSwitch(currentPage-1);
    } else if (e.deltaY > 1) {
      // Scroll Down
      handlePageSwitch(currentPage+1);
    }
  }

  function onKeyPress (e) {
    if (switchMode === true) { return; }

    switch (e.keyCode) {
      case 40: // Down
      handlePageSwitch(currentPage+1);
        break;
      case 38: // Up
      handlePageSwitch(currentPage-1);
        break;
    }
    return;
  }

  links.forEach(ele => {
    const linkTo = +ele.dataset.link || 0;

    ele.addEventListener('click', () => {
      handlePageSwitch(linkTo);
    })
  })

  window.onpopstate = function(e) {
    if (!switchMode) {
      switchMode = true;
      router(window.location.pathname.substr(1));
    } else {
      const int = setInterval(()=> {
        if (!switchMode) {
          clearInterval(int);
          switchMode = true;
          router(window.location.pathname.substr(1));
          return;
        }
      }, 20)
    }
  };
  // Keycodes
  // 40 is down
  // 38 is up

  document.addEventListener('keydown', onKeyPress);
  window.addEventListener('mousewheel', scrollHandler);
  window.addEventListener('DOMMouseScroll', scrollHandler);
  Array.prototype.forEach.call(document.getElementsByClassName('logo'), logo => { logo.addEventListener('click', ()=>{ handlePageSwitch(0); }) }, this);
}())
