(function() {
  class Recommendation {
    constructor (name, title, description) {
      if (!Recommendation.prototype.recs) { Recommendation.prototype.recs = [];}
      Recommendation.prototype.recs.push(this);

      this.name = name;
      this.title = title;
      this.description = description;
    }
    // Instance Methods
    _nameToHtml () {
      return 
      `
      <div class="columns twelve">
        <h4 class="recs_name">${this.name}</h4>
      </div>
      `;
    }
    _titleToHtml () {
      return 
      `
      <div class="columns twelve">
        <p class="recs_title">${this.title}</p>
      </div>
      `;
    }
    _descriptionToHtml () {
      console.log(this);
      return 
      `
      <div class="columns twelve">
        <p class="recs_description">${this.description}</p>
      </div>
      `;
    }
    renderComponent () {
      return `
      <div class="rec">
        <div class="row">
          <div class="columns five offset-by-one">
            <h4 class="recs_name">${this.name}</h4>
          </div>
          <div class="columns six">
            <p class="recs_title">${this.title}</p>
          </div>
        </div>
        <div class="row">
          <div class="columns twelve">
            <p class="recs_description">${this.description}</p>
          </div>
        </div>
      </div>`;
    }

    // Class Methods
    render () {
      let str = '';
      Recommendation.prototype.recs.forEach(rec => {
        console.log(rec);
        str+=rec.renderComponent();
      });
      return str;
    }
  }
  new Recommendation('Anna Propas', 'Site Captain - Coding Dojo', ' I had the pleasure of working with Howard as a peer and later as his direct supervisor. Howard is a true self-starter. During his time at Coding Dojo Howard frequently identified areas of need and acted quickly and decisively to provide solutions. Howard was a pleasure to work with and he will be sorely missed. I am positive that Howard will be an asset to any team. I hope to be able to work with him again in the future.');
  new Recommendation('Alyssa Langelier', 'Career Services - Coding Dojo', `Howard is a pleasure to work with. I've worked with him in the same facility (on different teams) for a total of about nine months now, and during the entire time he never failed to deliver excellent work ethic, compassion for our customers, and genuine joy to our workplace. Our students loved him, and our team felt no different. Howard is collaborative, and an overall team player. I will gladly continue to partner with Howard.`);
  new Recommendation('Chris Maddox', 'Scrum Master - FMFA, Inc.', `I had the pleasure of working with Howard on a scrum team while employed by FMFA, Inc. to develop a web site for a customer. Howard was instrumental in helping to complete the project on time and exceeded the customer's expectations by delivering a website that fully met their requirements. He worked collaboratively and efficiently with his scrum team and his abilities as a web developer were exemplary. Howard is very professional, smart and personable and so I can whole heartedly recommend him to anyone considering hiring him. I would welcome the opportunity to work with him again.`);
  
  document.getElementById('kf_about_recs').innerHTML = '<div id="recs_box">'+Recommendation.prototype.render()+'</div>';

  const About = document.getElementsByClassName('About')[0];
  const x_mid = window.innerWidth/2;

  About.addEventListener('mousemove', e => {
    // console.log((e.clientX-x_mid)/(x_mid/2));
  })
}())