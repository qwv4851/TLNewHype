var idRankMap = [];

// Entry point. Loads each of the subforms then ranks and colors their links.

$(document).ready(function() {
  var pageIds = [1, 37, 56, 29, 19, 36, 34, 44, 45, 18];
  var onPageLoad = function(data) {
    rankThreads(data);
    colorLinks();
  };
  $.each(pageIds, function(index, id) {
    $.get('http://www.teamliquid.net/forum/index.php?show_part=' + id + '&sort=post', onPageLoad);
  });
});

function colorLinks() {
  $('.sidemenu').find('a').each(function() {
    colorLink($(this));
  });
}

function colorLink(link) {
  var url = link.attr("href");
  if (url !== undefined) {
    var matches = url.match(/topic_id=(\d+)/);
    if (matches) {
      var id = parseInt(matches[1], 10);
      var rank = idRankMap[id];
      if (rank !== undefined) {
        var color;
        if (rank < 2) {
          color = 'f00';
        } else if (rank < 5) {
          color = 'a00';
        } else if (rank < 10) {
          color = '600';
        } else {
          color = '200';
        }
        link.attr('style', 'color:#' + color);
      }
    }
  }
}

// Given a subforum, ranks each of the topics by date posted.

function rankThreads(data) {
  $(data).find('.forumindex').find('a').each(function(index) {
    var url = $(this).attr("href");
    var id = parseInt(url.match(/topic_id=(\d+)/)[1], 10);
    idRankMap[id] = index;
  });
}