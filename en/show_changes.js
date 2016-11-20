
function whenAvailable(name, callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);
};

var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};

show_error = function() {
  download_done = true
  $("#latest-changes").html("unable to retrieve changes");
}

download_done = false

whenAvailable("$", function(t) {
  $("#latest-changes").html($('#progress_bar').html());
  $("#load_progress_bar").css("width", "0%");
	curwidth = 0

  update_bar = function() {
		bar = $("#load_progress_bar")
		if(! download_done) {
			console.info(curwidth)
			if(curwidth > 99) {
				show_error()		
			} else {
				curwidth = curwidth + 0.3;
				bar.css("width", curwidth+"%");
				window.setTimeout(update_bar, 100);
			}
		}
	};
  update_bar();
});

render_changes = function(jsonp) {
  console.info("begin")
  res = Mustache.to_html($('#simple').html(), jsonp);
  $("#latest-changes").html(res);
  console.info("end")
};


try_show_changes = function() { 
whenAvailable("Mustache", function(t) {
    //server = "http://127.0.0.1:5000/";
    server = "http://rover.teamdiana.org:3500/";
    endpoint = "changes";

    on_changes_received = function(changes) {
      console.info(changes);
      if($(changes).length < 1) {
        show_error()
        return
      }
      download_done = true
      render_changes(changes)
    };

    var tag = document.createElement("script");
    tag.src = server+endpoint+'?callback=on_changes_received';

    document.getElementsByTagName("head")[0].appendChild(tag);
  });
};

try_show_changes()

