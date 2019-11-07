/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  
  $('#tweets-container').empty();
  
  // loop through tweets
  for (let tweet of tweets) {

    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);

    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
}

const createTweetElement = function (tweet) {
  let $date = Math.floor((Date.now() - tweet.created_at) / 86400000);

  let $tweet = (
    `<article class="tweet">
        <header>
          <div class="tweet-author">
            <div class="user-pic">
              <img src="${tweet.user.avatars}">
            </div>
            <div class="name">
              ${tweet.user.name}
            </div>
          </div>
          <div class="handle">${tweet.user.handle}
          </div>
        </header>

        <div class="tweet-text">
        ${escape(tweet.content.text)}
        </div>

        <footer>
          <div>${$date} days ago</div>

          <div>
            flag
            retweet
            like
          </div>

        </footer>

      </article>`);
  return $tweet;
}

// add document ready function 
$(document).ready(function() {
  renderTweets(tweetData)

  // activate form submission button
  $(".new-tweet form").submit(function() {
    event.preventDefault();   

    if ($("#tweetText").val() === '' || $("#tweetText").val() === null || $("#tweetText").val().length > 140) {
      alert("Please enter a valid tweet.")
    } else {
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $(this).serialize(),
      success: () => {
        loadtweets()
      }
    })
  }})

  // fetch tweets
  const loadtweets = () => {
    $.ajax("/tweets/", {method: "GET"})
    .then(function (data) {
      renderTweets(data)
    }
    )}
});


//add escape function to prevent cross-site scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}