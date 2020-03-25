/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("DOM ready");

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

  $("#submit").submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    let text = data.split("=");
    if (text[1].length === 0) {
      alert("Please enter a tweet");
    } else if (text[1].length > 140) {
      alert("Character limit can't be exceeded");
    } else {
      $.ajax({ method: "POST", url: "/tweets", data })
        .done(function(result) {
          console.log(result);
        })
        .fail(function(error) {
          // Problem with the request
          console.log(`Error with the request: ${error.message}`);
        })
        .always(function() {
          // This will always run
          console.log("request completed");
        });
      setTimeout(() => {
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
      }, 50);
    }
  });

  // const data = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac"
  //     },
  //     content: {
  //       text:
  //         "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     created_at: 1461116232227
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd"
  //     },
  //     content: {
  //       text: "Je pense , donc je suis"
  //     },
  //     created_at: 1461113959088
  //   }
  // ];

  // renderTweets(data);
});
