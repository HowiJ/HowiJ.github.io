(function() {
  if (window.innerWidth < 550 || window.innerHeight < 580) {
    return;
  }
  
  const projects = [
    {
      name: 'CodeBoard',
      img_url: './imgs/codeboard.png',
      site_url: 'http://codeboard.vkutuyev.com',
      description: 'An interactive online whiteboard application using socket.io with a NodeJS server and a AngularJS Frontend. Created rooms and lobby system for different online rooms. Created the chatroom as well as the code-sharing page.',
    },
    {
      name: 'NodeSC',
      img_url: './imgs/nodesc.png',
      site_url: 'https://npmjs.com/package/nodesc',
      description: 'NodeJS + ExpressJS server (with MongoDB integration) scaffold CLI tool written in Bash Script. Creates basic CRUD operations for each specified model. Creates full RESTful routes.',
    },
    {
      name: 'Demos',
      img_url: './imgs/demos.png',
      site_url: 'http://demos.howardjiang.com',
      description: 'Website containing video demos that I have created. Front-end uses ReactJS + React Router, Back-end uses NodeJS + ExpressJS with MongoDB. Was originally for Coding Dojo students but is currently being re-vamped to be for general viewing of my videos.',
    },
    {
      name: 'NodeSC',
      img_url: './imgs/letters4animals.png',
      site_url: 'http://letters4animals.org',
      description: 'A non-profit project using the Scrum Framework based on Agile Methodologies. Front-end: AngularJS, Back-end: NodeJS + ExpressJS + PostGREsql. Created many back-end algorithms for data retrieval from Google Civics API, as well as password resetting & email confirmation. Created front-end for password reset. Created a system to wipe users that have registered but have not confirmed their email after a certain time.',
    },
  ];
  const pd_name = document.getElementById('pd_name');
  const pd_img = document.getElementById('pd_img');
  const pd_url = document.getElementById('pd_url');
  const pd_desc = document.getElementById('pd_desc');

  const selectors = document.getElementsByClassName('project_selector');

  let active = 0;
  let mouseOver = false;
  handleSwitchActiveProject();

  setInterval(() => {
    if (mouseOver === true) {
      return;
    }
    let newActive = active;
    if (active+1 >= selectors.length) {
      newActive = 0;
    } else {
      newActive++;
    }
    handleActiveSelector(newActive);
  }, 10000);

  function handleSwitchActiveProject() {
    pd_name.innerHTML = projects[active].name;
    pd_img.src = projects[active].img_url;
    pd_url.href = projects[active].site_url;
    pd_url.innerHTML = projects[active].site_url.split('://')[1];
    pd_desc.innerHTML = projects[active].description;
  }
  function handleActiveSelector(newActiveSelectorIndex) {
    selectors[active].classList.remove('active');
    active = newActiveSelectorIndex;
    selectors[active].classList.add('active');
    handleSwitchActiveProject();
  }
  function handleMouseEnter(e) {
    mouseOver = true;
    handleActiveSelector(Array.prototype.indexOf.call(selectors,this));
  }
  function handleMouseOut(e) {
    mouseOver = false;
  }

  Array.prototype.forEach.call(selectors, function(el) {
    el.addEventListener('mouseenter', handleMouseEnter.bind(el));
    el.addEventListener('mouseout', handleMouseOut.bind(el));
  }, this);
}())