(function(){
  function init() {
    console.log('Everything Loaded');
    const lp = document.getElementById('LoadingPage');
    const maxTime = 60;
    let elapsedTime = 0;

    var int = setInterval(() => {
      elapsedTime++;
      if (parseFloat(lp.style.opacity) < 0) {
        clearInterval(int);
        lp.style.display = 'none';

      }
      lp.style.opacity = 1-elapsedTime/maxTime; 
      // console.log(elapsedTime/maxTime)
    },1000/60)
  }
  const loaded = setInterval(() => {
    if (/loaded|complete/.test(document.readyState)) {
      clearInterval(loaded);
      init();
      const pages = document.querySelectorAll('.FullPage');
      setTimeout(()=>{
        let currentPage = parseInt(window.location.pathname.substr(1)) || 0;
        pages[currentPage].style.display = 'block';
        pages[currentPage].style.opacity = 1;
      }, 100)
    }
  }, 10);
}())