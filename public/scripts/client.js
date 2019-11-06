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
        ${tweet.content.text}
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
})