(function(){
  let doneLoading = false;
  let bool = false;

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
  const current = messages;
  const other = usedMessages;

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
      let rng = Math.floor(Math.random()*messages.length)
      sent.innerHTML = messages[rng];
      other.push(messages[rng]);
      messages.splice(rng, 1);
      if (current.length == 0) {
        let tmp = current;
        current = other;
        other = tmp;
      }
    } else {
      clearInterval(msgInt);
    }
  }, 2500)



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