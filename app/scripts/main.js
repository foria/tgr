// Header on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-56px";
  }
  prevScrollpos = currentScrollPos;
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
