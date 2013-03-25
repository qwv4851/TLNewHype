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
  if (topicLink.rank < 25) {
    color = '#f00';
  } else if (topicLink.rank < 75) {
    color = '#a00';
  } else if (topicLink.rank < 150) {
    color = '#600';
  } else if (topicLink.rank < 250) {
    color = '#200';
  }
  topicLink.link.attr('style', 'color:' + color);
}