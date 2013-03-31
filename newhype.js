// Entry point. Ranks each of the sidebar links according to their topic ids.

$(document).ready(function() {
  var links = $('.sidemenu').find('a[href]');
  var maxID = 0;
  var topicLinks = [];
  links.each(function() {
    var link = $(this);
    var matches = link.attr("href").match(/topic_id=(\d+)/);
    if (matches) {
      var id = parseInt(matches[1], 10);
      maxID = Math.max(maxID, id);
      topicLinks.push({
        link: link,
        id: id
      });
    }
  });
  $.each(topicLinks, function() {
    this.rank = maxID - this.id;
    colorLink(this);
  });
});

// Colors the given link according to its forum id ranking.

function colorLink(topicLink) {
  var color;
  if (topicLink.rank < 20) {
    color = '#f00';
  } else if (topicLink.rank < 40) {
    color = '#a00';
  } else if (topicLink.rank < 80) {
    color = '#600';
  } else if (topicLink.rank < 160) {
    color = '#300';
  }
  topicLink.link.attr('style', 'color:' + color);
}