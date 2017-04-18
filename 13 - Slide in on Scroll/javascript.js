
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    //position half way
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    //position bottom of image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShow = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if(isHalfShow && isNotScrolledPast) {
      sliderImage.classList.add('active');
    }/* else {
      sliderImage.classList.remove('active');
    }  kind of not needed like for me.*/
  });
}

window.addEventListener('scroll', debounce(checkSlide));
