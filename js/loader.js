(function(){
  function init() {
    console.log('Everything Loaded');
  }
  const loaded = setInterval(() => {
    if (/loaded|complete/.test(document.readyState)) {
      clearInterval(loaded);
      init();
    }
  }, 1000);
}())