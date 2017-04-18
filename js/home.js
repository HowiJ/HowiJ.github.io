(function() {
  const Home = document.getElementsByClassName('Home')[0];
  const Logo = document.getElementById('Logo');

  const c = { x:window.innerWidth/2, y:window.innerHeight/2 };
  const intensity = 0.01;
  const reset = { x: 0, y: 0, pad: 0 };


  function resetLogo () {
    c.x = window.innerWidth/2;
    c.y = window.innerHeight/2;

    const l_height = Logo.clientHeight;
    const l_width = Logo.clientWidth;
    reset.pad = window.innerHeight*0.1;
    reset.x =  ((window.innerWidth/2)-(l_width/2));
    reset.y =  ((window.innerHeight/2)-(l_height/2)-reset.pad);

    Logo.style.left = reset.x+'px';
    Logo.style.top  = reset.y+'px';
  }


  function handleMouseMove(e) {
    if (parseInt(window.location.pathname.substr(1)) !== 0) { return; }

    const l_height = Logo.clientHeight;
    const l_width = Logo.clientWidth;

    const diff_x = (e.clientX-c.x)*intensity;
    const diff_y = (e.clientY-c.y)*intensity;

    Logo.style.left = (reset.x+diff_x)+'px';
    Logo.style.top  = (reset.y+diff_y)+'px';
  }

  function handleLogoLoad () {
    resetLogo();

    document.addEventListener('mousemove', handleMouseMove);
  }

  function onLogoLoad () {
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
  })
}())