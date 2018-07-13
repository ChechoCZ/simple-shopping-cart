function setConfig() {
  const texts = {
    'title': 'Shopping Cart'
  };

  document.title = texts.title;
  document.getElementById('navTitle').innerHTML = texts.title;
}

setConfig();