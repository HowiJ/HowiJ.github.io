(function(){

  const Home = document.getElementsByClassName('Home')[0];
  const About = document.getElementsByClassName('About')[0];
  const Projects = document.getElementsByClassName('Projects')[0];
  const Contact = document.getElementsByClassName('Contact')[0];

  function handleLoadEvent (e) {
    console.log(this, e);
  }

  Home.addEventListener('load', handleLoadEvent.bind(Home));
  About.addEventListener('load', handleLoadEvent.bind(About));
  Projects.addEventListener('load', handleLoadEvent.bind(Projects));
  Contact.addEventListener('load', handleLoadEvent.bind(Contact));

  const dots = document.getElementById('lp_dot');
  let str = dots.innerText;
  setInterval(()=> {
    str+='.';
    if (str.length >= 4) {
      str = '.';
    }
    dots.innerHTML = str;
  }, 500);



  function init() {
    console.log('Everything Loaded');
    const lp = document.getElementById('LoadingPage');
    const stallTime = 60;
    const maxTime = 60;
    let elapsedTime = 0;
    let mode = false;

    var int = setInterval(() => {
      elapsedTime++;
      if (mode === false && elapsedTime >= stallTime) {
        mode = true;
        elapsedTime = 0;
        console.log('wtf');
      }

      if (mode === true) {
        if (parseFloat(lp.style.opacity) < 0) {
          clearInterval(int);
          lp.style.display = 'none';

        }
        lp.style.opacity = 1-elapsedTime/maxTime; 
      }
      // console.log(elapsedTime/maxTime)
    },1000/60)
  }
  const loaded = setInterval(() => {
    if (/loaded|complete/.test(document.readyState)) {
      clearInterval(loaded);
      init();
      document.getElementById('lp_title').innerHTML = 'Loaded';
      const pages = document.querySelectorAll('.FullPage');
      setTimeout(()=>{
        let currentPage = parseInt(window.location.pathname.substr(1)) || 0;
        pages[currentPage].style.display = 'block';
        pages[currentPage].style.opacity = 1;
      }, 1000)
    }
  }, 10);
}())