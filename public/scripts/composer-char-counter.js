$(document).ready(function() {
  $(".new-tweet").on("keydown keyup","textarea", function() {
    
    // create stored variable to determine # chars left
    let $charInTweet = $(this).val();
    let $charRemain = 140 - $charInTweet.length;

    // traverse up and down the DOM to get character count
    let $counter = $(this).closest("form").find(".counter");
    $counter.text($charRemain);

    // make counter red when tweet > 140 chars
    if ($charRemain < 0) {
      $counter.addClass("overtweeted");
    }
  });
});
