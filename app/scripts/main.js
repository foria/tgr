// Header on scroll
var prevScrollpos = window.pageYOffset;
var topbarHeight_D = "-56px";
var topbarHeight_M = "-25px";

// Breakpoints
var lg_bp = 992;

// Scroll to top functions
// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.getElementById("backtotop").style.display = "block";
    } else {
        document.getElementById("backtotop").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $('html, body').animate({scrollTop: 0}, 500);
}

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
    if (currentScrollPos == 0) {
        document.getElementById("header").className = "d-transparent";
    }
  } else {
    document.getElementById("header").className = "";

    if ( window.innerWidth >= lg_bp ) {
        document.getElementById("header").style.top = topbarHeight_D;
    } else {
        document.getElementById("header").style.top = topbarHeight_M;
    }
  }
  prevScrollpos = currentScrollPos;

  scrollFunction();
}

$(document).ready(function(){

    // Mobile menu togggle
    $('.navbar-toggler').on('click', function(){
        $('.mobile-navigation').addlass('show');
    })
    $('.toggler-close').on('click', function(){
        $('.mobile-navigation').removeClass('show');
    })

    // HERO-IMAGE CAROUSEL
    $('#hero-slider').carousel({
      interval: false
    });

    // HIGHLIGHTS CAROUSEL
    if ( window.innerWidth >= lg_bp ) {

      //$('.highlights-list .carousel').carousel('dispose');

    } else {
      $('.highlights-list .row').addClass('carousel');
      $('.highlights-list .highlight').addClass('carousel-item');
      $('.highlights-list .carousel').carousel({
        interval: false,
        swipe: 30
      });
    }

})

if ( window.innerWidth < lg_bp ) {
  document.addEventListener('DOMContentLoaded', function () {
      var stack;

      stack = window.swing.Stack();

      [].forEach.call(document.querySelectorAll('.stack > div'), function (targetElement) {
          stack.createCard(targetElement);

          targetElement.classList.add('in-deck');
      });

      stack.on('throwout', function (e) {
          console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

          //e.target.classList.remove('in-deck');
          e.target.remove();
      });

      stack.on('throwin', function (e) {
          console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');

          e.target.classList.add('in-deck');
      });
  });
}
