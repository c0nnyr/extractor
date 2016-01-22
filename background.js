var cur_sel = null;
var tmp_sel = null;
var time_handler = null;
function sendMessage(msg, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, callback);
  });
}

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    //sendResponse({});
    if (msg.sel){
        tmp_sel = msg.sel;
    }
});


function copy_selector_click(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

chrome.contextMenus.create({
    "title": "copy selector",
    "id":"selector",//"onclick": copy_selector_click
    "contexts":["all"]
});
//http://stackoverflow.com/questions/26245888/adding-context-menu-item-on-a-non-persistent-background-script
//必须监听，不能onclick，因为not persistent
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "selector") { // here's where you'll need the ID
        if (time_handler){
            clearTimeout(time_handler);
        }
        if (tmp_sel) {
          cur_sel = tmp_sel;
          time_handler = setTimeout(reset_cur_sel, 10000);
        }
    }
});

function reset_cur_sel(){
    tmp_sel = null;
    cur_sel = null;
    time_handler = null;
}
