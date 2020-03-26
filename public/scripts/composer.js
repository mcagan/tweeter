//Toggle tweet submission form
$(document).ready(function() {
  $("#write-tweet").click(function() {
    $("#new-tweet").slideToggle();
  });
});

//Scroll to the top of the page
$(document).ready(function() {
  const id = "#go-top";
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      // 300px from top
      $(id).fadeIn();
    } else {
      $(id).fadeOut();
    }
  });
  $(id).click(function() {
    $("html, body").animate({ scrollTop: 0 }, 800);
    $("#new-tweet").slideDown();
    return false;
  });
});
