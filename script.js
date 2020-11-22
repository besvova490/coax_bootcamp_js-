let interval_id;
const images = [
  'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060',
  'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560',
  'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
  'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500',
  'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400',
  'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260',
  'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];

createImages(images);

const slides = document.getElementsByClassName("screenSaverImg");
screenSaver(10000, ImagesSlideshow, slides, 5000);

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand) > 0 ? Math.floor(rand): 0;
}

function screenSaver(time, func, slides, interval) {
    wait = setTimeout(func, Math.abs(time - interval), slides, interval);
    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
        clearInterval(interval_id);
        clearTimeout(wait);
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.opacity = 0;
        }
        wait = setTimeout(func, Math.abs(time - interval), slides, interval);
    }
}

function createImages(urls, transition) {
  parent = document.getElementById('container');
  for (url in urls) {
    img = document.createElement('img');
    img.setAttribute('class', 'screenSaverImg');
    img.setAttribute('id', url);
    img.style.opacity = 0;
    if (transition) {
      img.style.transition = transition + 's';
    }
    img.src = images[url];
    parent.append(img);
  }
}

function rundomImgPosition(img_el) {
  window_height = window.innerHeight;
  window_width = window.innerWidth;

  image_height = img_el.clientHeight;
  image_width = img_el.clientWidth;

  avail_space_v = window_height - image_height;
  avail_space_h = window_width - image_width;

  random_v = randomInteger(0, avail_space_v);
  random_h = randomInteger(0, avail_space_h);
  img_el.style.top = random_v + "px";
  img_el.style.left = random_h + "px";
}

function ImagesSlideshow(slides, interval) {
  pre_rendom_img = 0;
  current = 0;
  interval_id = setInterval(function() {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
    }
    random_img = randomInteger(0, slides.length - 1)
    if (random_img == pre_rendom_img) {
      random_img ++;
    }
    pre_rendom_img = random_img;
    rundomImgPosition(slides[random_img]);
    slides[random_img].style.opacity = 1;
    current = (current != slides.length - 1) ? current + 1 : 0;
  }, interval);
}
