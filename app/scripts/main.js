// Header on scroll
var prevScrollpos = window.pageYOffset;
var topbarHeight_D = "-56px";
var topbarHeight_M = "-25px";

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

    if (window.innerWidth > 991) {
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

    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
           $('.x-masthead').removeClass('nav-up').addClass('nav-down');
       } else {
          $('.x-masthead').removeClass('nav-down').addClass('nav-up');
       }
       lastScrollTop = st;
    });

})
