/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("DOM ready");
  $("#new-tweet").slideUp();

  const createTweetElement = function(tweetObj) {
    const $postArticle = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $div = $("<div>").addClass("header");
    $("<img>")
      .addClass("avatar")
      .attr("src", tweetObj.user.avatars)
      .appendTo($div);
    $("<span>")
      .text(tweetObj.user.name)
      .appendTo($div);
    $div.appendTo($header);
    $("<a>")
      .attr("href", "#")
      .text(tweetObj.user.handle)
      .appendTo($header);
    const $text = $("<p>").text(tweetObj.content.text);
    const $footer = $("<footer>");
    $("<span>")
      .addClass("posted-on")
      .text(tweetObj.created_at)
      .appendTo($footer);
    const $icons = $("<div>").addClass("icons");
    $("<span>")
      .addClass("material-icons")
      .text("flag")
      .appendTo($icons);
    $("<span>")
      .addClass("material-icons")
      .text("repeat")
      .appendTo($icons);
    $("<span>")
      .addClass("material-icons")
      .text("favorite")
      .appendTo($icons);
    $icons.appendTo($footer);
    $header.appendTo($postArticle);
    $text.appendTo($postArticle);
    $footer.appendTo($postArticle);
    return $postArticle;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  let loadtweets = () => {
    $.ajax({ method: "GET", url: "/tweets" })
      .done(function(result) {
        $("#tweets-container").empty();
        renderTweets(result);
      })
      .fail(function(error) {
        console.log(`Error with the request: ${error.message}`);
      })
      .always(function() {
        console.log("request completed");
      });
  };

  loadtweets();

  $("#submit").submit(function(event) {
    event.preventDefault();
    $("#error").empty();
    let tweetLength = $("textarea").val().length;
    let data = $(this).serialize();
    if (tweetLength === 0) {
      $("#error").text("⚠️ Please enter a tweet");
    } else if (tweetLength > 140) {
      $("#error").text("⚠️ Character count can't exceed maximum");
    } else {
      $.ajax({ method: "POST", url: "/tweets", data })
        .done(function(result) {
          loadtweets(result);
        })
        .fail(function(error) {
          // Problem with the request
          console.log(`Error with the request: ${error.message}`);
        })
        .always(function() {
          // This will always run
          console.log("request completed");
        });
    }
  });
});
