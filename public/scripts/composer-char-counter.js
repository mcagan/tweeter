$(document).ready(function() {
  console.log("DOM ready");

  $("textarea").on("keyup", function() {
    const $counter = $(this)
      .parent()
      .find(".counter");
    let remainingChars = 140 - $(this).val().length;
    console.log(remainingChars);
    if (remainingChars < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
    $counter.text(remainingChars);
  });
});
