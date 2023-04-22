function changeImage() {
    const image = document.querySelector('img');
    if (image.src.endsWith('deltoides.png')) {
      image.src = 'soleo.png';
    } else {
      image.src = 'pectoral.png';
    }
  }