(function(){
  let doneLoading = false;
  let loadComplete = false;
  let bool = false;

  // loadAboutBackground();
  // //About pre-load
  // function loadAboutBackground () {
  //   let x = new Image();
  //   x.src = '/imgs/raindrops.gif';
  //   x.onload = function(e) {
  //     const el = document.getElementsByClassName('About')[0]
  //     el.style.background = "url('/imgs/raindrops.gif')";
  //     el.style.backgroundSize = 'cover';
  //     delete x;
  //     console.log('About Loaded');
  //     loadComplete = true;
  //     loadProjectsBackground();
  //   }  
  // };

  // //Projects pre-load
  // function loadProjectsBackground () {
  //   let x = new Image();
  //   x.src = '/imgs/clouds.gif';
  //   x.onload = function(e) {
  //     const el = document.getElementsByClassName('Projects')[0]
  //     el.style.background = "url('/imgs/water.gif')";
  //     el.style.backgroundSize = 'cover';
  //     delete x;
  //     console.log('Projects Loaded');
  //     loadContactsBackground();
  //   }  
  // };

  // // Contact pre-load
  // function loadContactsBackground () {
  //   let x = new Image();
  //   x.src = '/imgs/clouds.gif';
  //   x.onload = function(e) {
  //     const el = document.getElementsByClassName('Contact')[0]
  //     el.style.background = "url('/imgs/clouds.gif')";
  //     el.style.backgroundSize = 'cover';
  //     delete x;
  //     console.log('Contacts Loaded');
  //   }  
  // }



  const messages = [
    'Answering some callbacks',
    'Creating a few objects',
    'Solving some algorithms',
    'Making some tea',
    'Playing some volleyball',
    'Taking a nap',
    'Surfing the web',
    'Changing your application state',
    'Listening to some events',
    'sudo rm -rf /'
  ];
  const usedMessages = [];
  let current = messages;
  let other = usedMessages;

  const dots = document.getElementById('lp_dot');
  const sent = document.getElementById('lp_txt');
  let str = dots.innerText;
  const dotInt = setInterval(()=> {
    if (doneLoading) { clearInterval(dotInt); }

    str+='.';
    if (str.length >= 4) {
      str = '.';
    }
    dots.innerHTML = str;
  }, 500);

  let rng = Math.floor(Math.random()*messages.length)
  sent.innerHTML = messages[rng];
  usedMessages.push(messages[rng]);
  messages.splice(rng, 1);
  const msgInt = setInterval(() => {
    if (!doneLoading) {
      let rng = Math.floor(Math.random()*current.length)
      sent.innerHTML = current[rng];
      other.push(current[rng]);
      current.splice(rng, 1);
      if (current.length == 0) {
        let tmp = current;
        current = other;
        other = tmp;
      }
    } else {
      clearInterval(msgInt);
    }
  }, 3000)



  function init() {
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
      }

      if (mode === true) {
        if (parseFloat(lp.style.opacity) < 0) {
          clearInterval(int);
          lp.style.display = 'none';

        }
        lp.style.opacity = 1-elapsedTime/maxTime; 
      }
    },1000/60)
  }
  const loaded = setInterval(() => {
    if (/loaded|complete/.test(document.readyState)) {
    // if (loadComplete) {
      clearInterval(loaded);
      init();
      document.getElementById('lp_title').innerHTML = 'Loaded';
      const pages = document.querySelectorAll('.FullPage');
      doneLoading = true;
      setTimeout(()=>{
        let currentPage = parseInt(window.location.pathname.substr(1)) || 0;
        pages[currentPage].style.display = 'block';
        pages[currentPage].style.opacity = 1;
      }, 1000)
    }
  }, 10);
}())