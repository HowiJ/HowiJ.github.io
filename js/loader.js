(function(){
  const dots = document.getElementById('lp_dot');
  const sent = document.getElementById('lp_txt');

  if (window.innerWidth < 550 || window.innerHeight <= 580) {
    console.log('Screen too small');
    sent.innerHTML = '<p>.Use a bigger window for a better experience.</p>';
    const x = document.createElement('div');
    const p = document.createElement('p');
    const attr = document.createAttribute('style');
    attr.value = 'font-size: 1.5rem';
    const text = document.createTextNode('me@howardjiang.com . github.com/HowiJ . linkedin/in/howijiang');

    dots.innerHTML = '';

    p.appendChild(text);
    p.setAttributeNode(attr);
    x.appendChild(p);

    sent.appendChild(document.createElement('br'));
    sent.appendChild(x);
    return;
  }

  let doneLoading = false;
  let loadComplete = false;
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
  let current = messages;
  let other = usedMessages;

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