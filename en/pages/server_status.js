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

download_done = false

show_error = function() {
  var master_error = "Seems down. Check manually with ssh. May affect other server connections"
  var slave_error = "Unable to contact master server. May be alive, though. Check manually with ssh" 
  var jsonp = {
    'servers' : [
      {'name': 'rpy2', 'on': false, 'desc': master_error },
      {'name': 'tk1', 'on': false, 'desc': slave_error },
      {'name': 'udoo', 'on': false, 'desc': slave_error }
    ]
  };
  download_done = true
  render_status(jsonp)
}


whenAvailable("$", function(t) {
  timeout_fail = function() {
    if(!download_done) {
      show_error()
    }
  }
  window.setTimeout(timeout_fail, 5000);
});

render_status = function(jsonp) {
  res = Mustache.to_html($('#simple').html(), jsonp);
  $("#server_status").html(res);
  for (i in jsonp['servers']) {
    server = jsonp['servers'][i]
    line = $("#"+server['name'])
    if(server['on']) {
      line.addClass('label-success')
    } else {
      line.addClass('label-danger')
    }
  }
};


try_show_stat = function() { 

$("#server_status").html("Loading server status...");

whenAvailable("Mustache", function(t) {
    //server = "http://127.0.0.1:5000/";
    server = "http://rover.teamdiana.org:3500/";
    endpoint = "server_status";

    on_stat_received = function(stat) {
      if($(stat).length < 1) {
        show_error()
        return
      }
      download_done = true
      render_status(stat)
    };

    var tag = document.createElement("script");
    tag.src = server+endpoint+'?callback=on_stat_received';

    document.getElementsByTagName("head")[0].appendChild(tag);
  });
};

try_show_stat()

