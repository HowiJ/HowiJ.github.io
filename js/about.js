(function() {
 const recs = [{ name: 'Anna Propas', title: 'Site Captain - Coding Dojo', content: 'I had the pleasure of working with Howard as a peer and later as his direct supervisor. Howard is a true self-starter. During his time at Coding Dojo Howard frequently identified areas of need and acted quickly and decisively to provide solutions. Howard was a pleasure to work with and he will be sorely missed. I am positive that Howard will be an asset to any team. I hope to be able to work with him again in the future.'},
 { name: 'Alyssa Langelier', title: 'Career Services - Coding Dojo', content: `Howard is a pleasure to work with. I've worked with him in the same facility (on different teams) for a total of about nine months now, and during the entire time he never failed to deliver excellent work ethic, compassion for our customers, and genuine joy to our workplace. Our students loved him, and our team felt no different. Howard is collaborative, and an overall team player. I will gladly continue to partner with Howard.`},
 { name: 'Chris Maddox', title: 'Scrum Master - FMFA, Inc.', content: `I had the pleasure of working with Howard on a scrum team while employed by FMFA, Inc. to develop a web site for a customer. Howard was instrumental in helping to complete the project on time and exceeded the customer's expectations by delivering a website that fully met their requirements. He worked collaboratively and efficiently with his scrum team and his abilities as a web developer were exemplary. Howard is very professional, smart and personable and so I can whole heartedly recommend him to anyone considering hiring him. I would welcome the opportunity to work with him again.`}]
  
  const About = document.getElementsByClassName('About')[0];
  const x_mid = window.innerWidth/2;

  function setAboutFlashesLocation (el) {
    const randy = Math.random()*(window.innerHeight-el.clientHeight);
    const randx = Math.random()*(window.innerWidth-el.clientWidth);

    el.style.opacity = 1;
    el.style.top = (randy)+'px';
    el.style.left = (randx)+'px';
  }

  function handleAboutFlashes ( el, iTime, oTime, delay, minHeight = 0 ) {
    setAboutFlashesLocation(el);

    let mode = 0; // 0: iTime, 1: oTime, 2: delay
    let elapsed = 0;
    iTime = iTime*1000/60;
    oTime = oTime*1000/60;
    delay = delay*1000/60;

    const int = setInterval(() => {
      if (parseInt(window.location.pathname.substr(1)) !== 1) { return; }
      elapsed++;

      switch (mode) {
        case 0:
          el.style.opacity = elapsed/iTime;
          if (elapsed >= iTime) {
            elapsed = 0;
            mode = 3;
          }
          break;
        case 1:
          el.style.opacity = 1-elapsed/oTime;
          if (elapsed >= oTime) {
            elapsed = 0;
            mode = 2;
          }
          break;
        case 2:
          if (elapsed >= delay) {
            setAboutFlashesLocation(el);
            el.style.opacity = 0;
            elapsed = 0;
            mode = 0;
          }
          break;
        default:
          if (elapsed >= delay) {
            elapsed = 0;
            mode = 1;
          }
          break;
      }
    }, 1000/60)
  }

  function handleAboutDesc () {
    const el = document.getElementById('kf_about_desc');
    const ptop = el.offsetTop;
    const mid = ((window.innerHeight/2)-ptop*2)-(el.clientHeight/2);
    el.style.marginTop = (mid-ptop) + 'px';

    console.log((window.innerHeight/2),(el.clientHeight/2),ptop);
  }


  componentDidLoad(() => {
      const af = document.getElementById('about_flashes');
      handleAboutFlashes(af, 4, 4, 8);
      handleAboutDesc();
  });




  function componentDidLoad (callback) {
    const el = document.getElementById('about_flashes');

    const int = setInterval(() => {
      if (el.clientWidth !== 0) {
        el.style.width = el.clientWidth;
        clearInterval(int);
        if (callback && typeof callback == 'function') { callback(); }
      }
    }, 10)
  }

  About.addEventListener('mousemove', e => {
    // console.log((e.clientX-x_mid)/(x_mid/2));
  })
}())