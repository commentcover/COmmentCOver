var url = 'http://127.0.0.1:5000/test';
var comment = [];
var score = "";
var commentNum = 0;
var scoreNum = 0;
var commentLength = 0;
var refreshAlert = "refresh"
var observer_cnt = 0;
var observer = new MutationObserver((mutations) => {
  showComments(); // 감시하던 노드가 변경됐을 때 작업
})

function refresh(){
  comment = [];
  score = "";
  commentNum = 0;
  scoreNum = 0;
  commentLength = 0;
  observer_cnt = 0;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshAlert),
  })
  .then(refreshAlert => {
    console.log('Success:', refreshAlert);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// GET
async function getRequest() {
  const response = await fetch(url,
  {
    method: 'GET',
  }).then(response => response.text())
  .then(res=>{
    if (res.length%20 == 0){
      console.log('score\'s length can be divided 20');
    }
    else{
      console.log('score\'s length can\'t be divided 20');
    }
    score += res;
    console.log(score.length, score);
  })
}


// 감시자 인스턴스
function showComments() {
  console.log("dom 변경 감지");

  var commentList = document.getElementsByTagName('ytd-comment-thread-renderer');

  for( var i = commentNum; i < commentList.length; i++){
    var commentString = commentList[i].querySelector('#content-text').innerText;
    comment.push(commentString);
    commentNum++;
  }
  // 댓글 20개씩 보내기
  if ((comment.length % 20 == 0) && (comment.length > commentLength)){
    // POST
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment.slice(commentLength)),
    })
    .then(comment => {
      getRequest();
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    commentLength += 20;
  }
  
  // 예측값이 1인 댓글 가리기
  console.log('covering start', 'scoreNum:', scoreNum)
  for (var k = scoreNum; k < score.length; k++){
    if (score[k] == "1"){
      console.log(commentList[k].querySelector('#content-text').innerText);
      commentList[k].querySelector('#content-text').innerText = "";
      commentList[k].querySelector('#content-text').innerHTML = "<p>&#128052; ⓘ coco가 숨긴 댓글입니다! &#128062;</p>";
    }
    scoreNum++;
  }
  console.log('covering finish', 'scoreNum:', scoreNum)

}

// 기존의 버튼 on/off 상황 storage에서 읽어오기
async function getFromStorage(key){
  const p = new Promise((resolve, reject) => {
    try{
      chrome.storage.sync.get(key,function(value){
        resolve(value[key]);
      })
    }catch(ex){ reject (ex);}
  });
  return await p; // Promise 형태
}

function main(){
  var ext_p = getFromStorage('check_or_not');
  console.log('## setting of Extension is called ##');
  console.log(ext_p);
  const config ={
    attributes: true,
    childList: true,
    subtree: true
  };
  ext_p.then(function(ex_value) {
    if(ex_value){ // 이전에 버튼 on으로 끝냄
      console.log("기존 상태 :", ex_value); // true
      if(observer_cnt === 0){ // observer 시작
        console.log("observer 이제 시작");
        var target_xpath = "/html/body"
        var target = document.evaluate(
          target_xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      }else{ // observer 실행 중
        console.log("observer 실행 중");
        var target_xpath = "/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/ytd-comments/ytd-item-section-renderer/div[3]"
        var target = document.evaluate(
          target_xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      }
      observer.observe(target, config);
      observer_cnt += 1;
      console.log("---observer 초기 세팅 완료---");

      // 아이콘을 눌러서 on/off가 바뀌면
      chrome.storage.onChanged.addListener(function(changes, namespace){
        for (let [key,{oldValue,newValue}] of Object.entries(changes)){
          if(newValue == true){ // 크롬 확장 프로그램 활성화됨
            refresh();
            target_xpath = "/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/ytd-comments/ytd-item-section-renderer/div[3]"
            target = document.evaluate(
              target_xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            
            observer.observe(target, config);
            observer_cnt += 1;
            console.log("~~ observer 시작 ~~");
          }else{ // 크롬 확장 프로그램 비활성화됨
            observer.disconnect();
            observer_cnt -= 1;
            refresh();
            (location || window.location || document.location).reload(); // 새로고침
            console.log("~~ observer 종료 ~~");
          } 
        }
      });
    }else{ // 이전에 버튼 OFF로 끝낸 상태
      console.log("기존 상태 :", ex_value); // false
      chrome.storage.onChanged.addListener(function(changes, namespace){
        for (let [key,{oldValue,newValue}] of Object.entries(changes)){
          if(ex_value!=true && newValue==true){ // 크롬 확장 프로그램 활성화됨
            refresh();
            const target_xpath = "/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/ytd-comments/ytd-item-section-renderer/div[3]"
            const target = document.evaluate(
              target_xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            
            observer.observe(target, config);
            observer_cnt += 1;
            console.log("ㅁㅁ observer 시작 ㅁㅁ");
          }else{ // 크롬 확장 프로그램 비활성화됨
            observer.disconnect();
            observer_cnt -= 1;
            refresh();
            (location || window.location || document.location).reload(); // 새로고침
            console.log("ㅁㅁ observer 종료 ㅁㅁ");
          }
        }
      });
    }
  })
}


function receive_message(){
  var rcv_same_num = 0; // 여러 번 중복 메시지 받는 것 인식x
  chrome.runtime.onMessage.addListener(function (message,sender,sendResponse){
    switch(message.type){ // 기존 페이지 그대로 새로고침
      case 'same_page':
        rcv_same_num += 1;
        if(rcv_same_num > 1){ // 'same_page' 메시지 여러번 받으면 1로 초기화
          rcv_same_num = 1;
        }else{
          console.log("@@ same page @@");
          // 작동되는 observer가 없을 때만 실행
          refresh();
          main();
          rcv_same_num -= 1;
        }
        break;
      case 'page_moved': // 새로운 페이지로 이동
        console.log("!! page moved !!");
        observer.disconnect(); // 기존의 observer 끄고
        (location || window.location || document.location).reload(); // 새로고침
        refresh();
        console.log("!! 기존 observer 종료 !!");
        break;
    }
  });
}


// 페이지 로드되면 자동 실행
if(document.readyState !== 'loading'){ // document 감지
  console.log('document is already ready');
  receive_message();
}else{ // document 아직 안 열림
  document.addEventListener("DOMContentLoaded",function(){
    console.log('document was not ready...');
    receive_message();
  })
}