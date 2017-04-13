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