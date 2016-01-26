var backgroundObj = chrome.extension.getBackgroundPage();
var sep = ',';
if(backgroundObj){
  backgroundObj.contents = new Array();
  if (backgroundObj.cur_sel){
      backgroundObj.last_sel = backgroundObj.cur_sel;
      backgroundObj.last_attr = '';
  }
  $('#selector').val(backgroundObj.last_sel);
  $('#attr').val(backgroundObj.last_attr);
  $('#sep').val('\\n');
  $('#update').click(function(){
    var sel = $('#selector').val();
    backgroundObj.last_sel = sel;
    var get_attr = $('#attr').val();
    backgroundObj.last_attr = get_attr;
    $('#target>tbody').html('');
    backgroundObj.sendMessage({selector:sel, attr:get_attr}, function(msg){
        var row_count = $('#target>tbody>tr').length;
        var max_count = row_count > msg.content.length ? row_count : msg.content.length;
        for (var i = 0; i < max_count; i++){
            if (i >= row_count){
                $('#target>tbody').append('<tr><th scope=row>' + (i + 1) +
                    '</th><td>' + msg.content[i] + '</td></tr>');
            }
            else{
                $('#target>tbody>tr:nth-child(' + (i+1) + ')>td').text(msg.content[i]);
            }

            //var splits = backgroundObj.contents[i].split(sep);
            //if (!splits.length){
            //    splits = new Array(item_count);
            //splits.append(msg.content[i]);
            //backgroundObj.contents[i] = splits.join(sep);
        }
        backgroundObj.contents = msg.content;
        var sep = $('#sep').val();
        switch (sep){
            case '\\n':sep='\n';break;
            case '\\t':sep='\t';break;
        }
        var content = backgroundObj.contents.join(sep);
        $('#content').val(content);
    });
  });
  $('#next').click(function(){
      if($('#target>tbody>tr').length){
          var s = backgroundObj.last_sel;
          var start = s.lastIndexOf(':nth-child');
          if (start != -1){
              var end = s.indexOf(')', start);
              if (end != -1){
                  s = s.substring(0, start) + s.substring(end + 1);
              }
          }
          $('#selector').val(s);
      }
      $('#update').click();
  });
}

