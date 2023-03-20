function Addshrink() {
  if (!window) {
    return;
  } else {
    let RelBanner = document.querySelector('#banner');

    window.addEventListener('scroll', (e) => {
      if (window.pageYOffset > 86) {
        RelBanner.classList.add('shrink');
      } else {
        RelBanner.classList.remove('shrink');
      }
    });
  }
}

export { Addshrink };
