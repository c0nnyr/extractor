var backgroundObj = chrome.extension.getBackgroundPage();
if(backgroundObj){
  if (backgroundObj.cur_sel){
      backgroundObj.last_sel = backgroundObj.cur_sel;
      backgroundObj.last_attr = '';
  }
  $('#selector').val(backgroundObj.last_sel);
  $('#attr').val(backgroundObj.last_attr);
  $('#confirm').click(function(){
    var sel = $('#selector').val();
    backgroundObj.last_sel = sel;
    var get_attr = $('#attr').val();
    backgroundObj.last_attr = get_attr;
    $('#target').html('');
    backgroundObj.sendMessage({selector:sel, attr:get_attr}, function(msg){
        for (var i = 0; i < msg.content.length; i++){
            var t = $('<p></p>').text(msg.content[i]);
            $('#target').append(t);
        }
        var content = msg.content.join('\n');
        $('#content').val(content);
    });
  });
  $('#next').click(function(){
      var s = backgroundObj.last_sel;
      var content = $('#content').val();
      if (content){
        var start = s.lastIndexOf(':nth-child');
        if (start != -1){
            var end = s.indexOf(')', start);
            if (end != -1){
                s = s.substring(0, start) + s.substring(end + 1);
            }
        }
        $('#selector').val(s);
      }
      $('#confirm').click();
  });
}

