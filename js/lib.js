const _ = (function() {
  function _ (element) {
    class _ {
      constructor() {
        this.el       = element;
        this.rotating = false;
        this.rotation = 0;
      }
      popAndFade (time, c) {
        if (this.rotating) { return; }

        this.rotating = true;
        
        const maxTime = time/60;
        let elapsed = 0;
        let rotation = this.rotation;
        const int = setInterval( () => {
          elapsed++;
          rotation += 1;
          this.el.style.transform = `rotate(${rotation}deg)`;
          this.el.style.opacity = 1-elapsed/maxTime;

          if (elapsed >= maxTime) {
            
            this.rotating = false;
            this.rotation = rotation;
            clearInterval(int);
            if (c && typeof c === 'function') { c(); }
            return;
          }
        }, 1000/60);
      }
      click (c) {
        this.el.addEventListener('click', c);
      }
      replace (ele, c) {
        const tmp = this.el.cloneNode(true);
        this.el.parentElement.insertBefore(tmp, this.el.parentElement.childNodes[0]);
        this.el.parentElement.removeChild(this.el);

        if (c && typeof c === 'function') {
          c();
        }
      }
    }

    return new _();
  }
  return _;
}())