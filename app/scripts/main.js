// Header on scroll
var prevScrollpos = window.pageYOffset;
var topbarHeight_D = "-56px";
var topbarHeight_M = "-25px";

// Breakpoints
var md_bp = 768;
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

// Multiple items carousel
function overflowMultipleCarousel(elementID) {
  var hasPaginator = false;

  // Check if there is a paginator
  if( $(elementID).parent().find('.paginator').length ){
    hasPaginator = true;

    var $index = $(elementID).parent().find('.paginator').find('.paginator--index');
    var $total = $(elementID).parent().find('.paginator').find('.paginator--total');

    var index = 3;
    var total = $(elementID).children('div').children().length;

    $index.html(index);
    $total.html(total);
  }

  $(elementID).on('slide.bs.carousel', function (e) {
      //console.log(e.direction);
      $(this).find('.carousel-item-first').removeClass('carousel-item-first');
      $(this).find('.carousel-item-before-first').removeClass('carousel-item-before-first');
      if(e.direction == 'right') {
        $(this).find('.active').prev().prev().addClass('carousel-item-first');
        $(this).find('.active').prev().prev().prev().addClass('carousel-item-before-first');

        if(hasPaginator){
          index--;
          $index.html(index);
        }
      } else {
        $(this).find('.active').addClass('carousel-item-first');
        $(this).find('.active').prev().addClass('carousel-item-before-first');

        if(hasPaginator){
          index++;
          $index.html(index);
        }
      }
  });

  $(elementID).on('slid.bs.carousel', function (e) {
      if( $(this).find('.carousel-item:first-child').hasClass('active') ){
        $(this).find('.carousel-control-prev').addClass('d-none');
      } else {
        $(this).find('.carousel-control-prev').removeClass('d-none');
      }
      if( $(this).find('.carousel-item:nth-last-child(3)').hasClass('active') ){
        $(this).find('.carousel-control-next').addClass('d-none');
      } else {
        $(this).find('.carousel-control-next').removeClass('d-none');
      }
  });

  $(elementID).carousel({
    interval: false
  });
}

// Swipe cards function
function swipeCards() {
    var stack;
    var $index = $('#prod-list').parent().find('.paginator').find('.paginator--index');
    var $total = $('#prod-list').parent().find('.paginator').find('.paginator--total');

    var index = 1;
    var total = $('#prod-list').children('div').children().length;

    $index.html(index);
    $total.html(total);

    stack = window.swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack > div'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    stack.on('throwout', function (e) {
        //console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

        //e.target.classList.remove('in-deck');
        e.target.remove();

        index++;
        $index.html(index);
    });

    stack.on('throwin', function (e) {
        //console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');

        e.target.classList.add('in-deck');
    });
};

// Trigger events on page scroll
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
    if ( $('#hero-slider').length ) {
      $('#hero-slider').carousel({
        interval: false
      });
    }

    // HIGHLIGHTS CAROUSEL
    if ( $('.highlights-list').length ) {
      if ( window.innerWidth < md_bp ) {
        $('.highlights-list .row').addClass('carousel');
        $('.highlights-list .highlight').addClass('carousel-item');
        $('.highlights-list .carousel').carousel({
          interval: false,
          swipe: 30
        });
      }
    }

    // MEDIA GALLERY PLAY BUTTON
    if ( $('.media-gallery').length ) {
      var tag = document.createElement('script');
      tag.id = 'iframe-demo';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var mgVideo;
      function onYouTubeIframeAPIReady() {
        mgVideo = new YT.Player('media-gallery--video', {
            events: {
              'onReady': onPlayerReady
            }
        });
      }

      function onPlayerReady(event) {
        $('.media-gallery--item__preview').on('click', function() {
          $(this).addClass('d-none');
          mgVideo.playVideo();
        });
      }
    };

    // PRODUCTS GALLERY CAROUSEL
    var prodListEl = $('#prod-list');

    if ( $('.prod-gallery').length ) {
      if ( window.innerWidth >= lg_bp ) {
        $('.prod-gallery #prod-list').addClass('carousel');
        $('.prod-gallery #prod-list .stack').addClass('carousel-inner');
        $('.prod-gallery .prod-gallery--item').addClass('carousel-item');

        overflowMultipleCarousel(prodListEl);

      } else {
        // Products gallery swipe animation on mobile
        swipeCards();
      }
    }

    // PRODUCTS GALLERY FILTER
    if ( $('.dropdown-filter').length ) {

      // If it's a carousel save the elements to reinitialize it after filtering
      var $filterList = $('.dropdown-filter--list');
      var filterListHTML;

      if($filterList.hasClass('carousel-multiple') ){
        filterListHTML = $filterList.html();
      }

      $('.dropdown-filter .dropdown-item').on('click', function(){

        var filter = $(this).data('filter');
        $('.dropdown-filter .dropdown-item.d-none').removeClass('d-none');
        $(this).addClass('d-none');
        $('.dropdown-filter .dropdown-toggle').html($(this).html());

        if($filterList.hasClass('carousel-multiple') ){
          $filterList.html(filterListHTML);
        }

        $filterList.find('.dropdown-filter--item').each(function(){
          if($(this).data('cat') != filter){
            $(this).remove();
          }
        })

        if($filterList.hasClass('carousel-multiple') ) {
          if ( window.innerWidth >= lg_bp ) {
            $filterList.find('.dropdown-filter--item:eq(0)').addClass('active');
            overflowMultipleCarousel('#'+$filterList.attr('id'));
          } else {
            // Products gallery swipe animation on mobile
            swipeCards();
          }
        }

      })
    }

    // NEWS FEED CAROUSEL ON MOBILE
    if ( $('.news-list').length ) {
      if ( window.innerWidth < md_bp && $('.news-list--wrapper .container').children().length > 1 ) {
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

            overflowMultipleCarousel('#instafeed');
          }
        },
        error: function(data){
          console.log(data); // send the error notifications to console
        }
      });
    }

})

// MEDIA GALLERY PLAY BUTTON
if ( $('.media-gallery').length ) {
  var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var mgVideo;
  function onYouTubeIframeAPIReady() {
    mgVideo = new YT.Player('media-gallery--video', {
        events: {
          'onReady': onPlayerReady
        }
    });
  }

  function onPlayerReady(event) {
    $('.media-gallery--item__preview').on('click', function() {
      $(this).addClass('d-none');
      mgVideo.playVideo();
    });
  }
};
