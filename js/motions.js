(function () {
  if (window.innerWidth < 550) {
    console.log('width lower than 550px... Shouldn\'t use this...');
  }
  const pages = document.querySelectorAll('.FullPage');
  const lastPage = pages.length-1;

  let currentPage = parseInt(window.location.pathname.substr(1)) || 0;
  if (currentPage > pages.length-1) { currentPage = pages.length-1; }
  let switchMode = false;
  window.history.pushState({}, '', `/${currentPage}` )

  const transitionPage = document.querySelector('.TransitionPage');
  transitionPage.style.display = 'none';

  pages[currentPage].style.display = 'block';
  pages[currentPage].style.opacity = 100;


  const keyframes = [
    [
      document.getElementById('name'),
      document.getElementById('title'),
      document.getElementById('scroll'),
    ],
    [
      document.getElementById('kf_about_titl'),
      document.getElementById('kf_about_desc'),
      document.getElementById('kf_about_recs'),
    ]
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
      keyframes[i][j].classList.add('dispNone');
    }
  }
  fireKeyFrames(currentPage);

  function router(next) {
    next = +next;
    if (next < 0)             { next = 0; }
    if (next >= pages.length) { next = pages.length-1; }
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
    if (Math.abs(e.deltaX) > 1) { return; }
    // console.log(e);

    if (e.deltaY < -1) {
      // Scroll Up
      if (!switchMode) {
        switchMode = true;
        window.history.pushState({}, '', `/${currentPage-1 >= 0?parseInt(currentPage)-1:0}` )
        router(currentPage-1);
      }
    } else if (e.deltaY > 1) {
      // Scroll Down
      if (!switchMode){
        switchMode = true;
        window.history.pushState({}, '', `/${currentPage+1 <= lastPage?parseInt(currentPage)+1:lastPage}` )
        router(currentPage+1);
      }
    }
  }

  window.onpopstate = function(e) {
    if (!switchMode) {
      router(window.location.pathname.substr(1));
    } else {
      setTimeout(()=> {
        router(window.location.pathname.substr(1));
      }, 2000)
    }
  };
  window.addEventListener('mousewheel', scrollHandler);
  window.addEventListener('DOMMouseScroll', scrollHandler);
}())
