chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.url){// 다른 페이지로 이동
    chrome.tabs.query({active:true, currentWindow:true},(tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: "page_moved"});
      console.log("page moved!",changeInfo);
    })

  }else{ // 새로고침
    chrome.tabs.query({active:true, currentWindow:true},(tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: "same_page"});
      console.log("same page",changeInfo);
    })
  }
});