chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  var targets = $(msg.selector);
  var results = [];
  if (msg.attr){
    targets.each(function(i,o){
        results[i] = $(o).attr(msg.attr);
    });
  }
  else{
    targets.each(function(i,o){
        results[i] = $(o).text();
    });
  }
  sendResponse({content:results});
});

function get_selector(node) {
  var ind, parts, siblingsArr, str;
  parts = [];
  while (node.parentElement) {
      str = node.tagName;
     // if (node.id) {
     //       str += "#" + node.id;
     //       parts.unshift(str);
     //       break;
     //     }
      siblingsArr = Array.prototype.slice.call(node.parentElement.childNodes);
      ind = siblingsArr.filter(function(n) {
            return n.attributes != null;
          }).indexOf(node);
      parts.unshift(str + (":nth-child(" + (ind + 1) + ")"));
      node = node.parentElement;
    }
  return parts.join(' > ');
};

document.addEventListener("mousedown", function(event){
    if(event.button == 2) {
      var sel = get_selector(event.target);
      chrome.runtime.sendMessage({sel:sel});
    }
},
true);

$(window).load(function(){
    //chrome.runtime.sendMessage('hello from page', function(response){
     //   console.log('response ', response);
    //});
});
