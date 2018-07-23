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

// Instagram carousel init
function igCarousel() {
  if ( window.innerWidth < lg_bp ) {

    $('#instafeed').carousel({
      interval: false,
      swipe: 30
    });

  } else {

    $('#instafeed').on('slide.bs.carousel', function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });

    $('#instafeed').on('slid.bs.carousel', function (e) {
        if( $('#instafeed .carousel-item:first-child').hasClass('active') ){
          $('#instafeed .carousel-control-prev').addClass('hide');
        } else {
          $('#instafeed .carousel-control-prev').removeClass('hide');
        }
        if( $('#instafeed .carousel-item:last-child').hasClass('active') ){
          $('#instafeed .carousel-control-next').addClass('hide');
        } else {
          $('#instafeed .carousel-control-next').removeClass('hide');
        }
    });

    $('#instafeed').carousel({
            interval: false
    });

  }
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
    if ( $('#hero-slider').length ) {
      $('#hero-slider').carousel({
        interval: false
      });
    }

    // HIGHLIGHTS CAROUSEL
    if ( $('.highlights-list').length ) {
      if ( window.innerWidth < lg_bp ) {
        $('.highlights-list .row').addClass('carousel');
        $('.highlights-list .highlight').addClass('carousel-item');
        $('.highlights-list .carousel').carousel({
          interval: false,
          swipe: 30
        });
      }
    }

    // PRODUCTS CAROUSEL
    if ( $('.prod-gallery').length ) {
      if ( window.innerWidth >= lg_bp ) {
        $('.prod-gallery #prod-list').addClass('carousel');
        $('.prod-gallery #prod-list .stack').addClass('carousel-inner');
        $('.prod-gallery .prod-gallery--item').addClass('carousel-item');

        $('#prod-list').on('slide.bs.carousel', function (e) {
            //console.log(e.direction);
            $('#prod-list .carousel-item-first').removeClass('carousel-item-first');
            $('#prod-list .carousel-item-before-first').removeClass('carousel-item-before-first');
            if(e.direction == 'right') {
              $('#prod-list .active').prev().prev().addClass('carousel-item-first');
              $('#prod-list .active').prev().prev().prev().addClass('carousel-item-before-first');
            } else {
              $('#prod-list .active').addClass('carousel-item-first');
              $('#prod-list .active').prev().addClass('carousel-item-before-first');
            }
        });

        $('#prod-list').on('slid.bs.carousel', function (e) {
            if( $('#prod-list .carousel-item:first-child').hasClass('active') ){
              $('#prod-list .carousel-control-prev').addClass('hide');
            } else {
              $('#prod-list .carousel-control-prev').removeClass('hide');
            }
            if( $('#prod-list .carousel-item:nth-last-child(3)').hasClass('active') ){
              $('#prod-list .carousel-control-next').addClass('hide');
            } else {
              $('#prod-list .carousel-control-next').removeClass('hide');
            }
        });

        $('#prod-list').carousel({
          interval: false
        });
      }
    }

    // NEWS FEED CAROUSEL ON MOBILE
    if ( $('.news-list').length ) {
      if ( window.innerWidth < lg_bp && $('.news-list--wrapper .container').children().length > 1 ) {
        $('.news-list--wrapper').addClass('carousel');
        //$('.news-list .container').addClass('carousel-inner');
        $('.news-list article').addClass('carousel-item');
        $('.news-list--wrapper').carousel({
          interval: false,
          swipe: 30
        });
      }
    }

    // INSTAGRAM FEED
    if ( $('.instagram-feed').length ) {
      var token = '2028953712.2f33361.5b3693c0272042c0b5158872ad97d716', // learn how to obtain it below
      userid = 2028953712, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
      num_photos = 10, // how much photos do you want to get
      itemClass;

      $.ajax({
        url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
          //console.log(data);
          for( x in data.data ){
            if(x == 0){
              itemClass = ' active first-child';
            } else {
              itemClass = '';
            }
            $('#instafeed .carousel-inner').append('<figure class="carousel-item col-md-4 instagram-pic'+itemClass+'"><img class="d-block" src="'+data.data[x].images.standard_resolution.url+'"><figcaption><p>'+data.data[x].caption.text+'</p></figcaption></figure>');
            // data.data[x].images.low_resolution.url - URL of image, 306х306
            // data.data[x].images.thumbnail.url - URL of image 150х150
            // data.data[x].images.standard_resolution.url - URL of image 612х612
            // data.data[x].link - Instagram post URL

            igCarousel();
          }
        },
        error: function(data){
          console.log(data); // send the error notifications to console
        }
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
