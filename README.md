# &#128526; Comment Cover
### &#10024; 자연어처리 및 AI를 활용한 유튜브 악성 댓글 블라인드 자동 처리 시스템 &#10024;

### &#127751; **Chrome Extension**
- background.js
- manifest.json
- popup.html
- popup.js
- script.js
- toggle.css

Chrome Extension 폴더의 파일 다운로드</br>
chrome://extensions/ 접속</br>
[ 압축해제된 확장 프로그램을 로드합니다. ] 클릭</br>
다운받은 파일이 포함된 폴더 선택</br>
확장 프로그램 로드 완료</br>
크롬 웹 브라우저 상단 탭에서 확장 프로그램 선택하여 활성화되는지 확인</br>
확장 프로그램 아이콘 클릭 후 토글 버튼 on/off로 사용 가능</br>

---------

### &#127875; **Web Server**
- __init__.py
- tokenizer.pickle
- LSTM_model.h5
- requirement.txt

Web Server 폴더의 파일 다운로드</br>
파이썬 3.9.7 다운로드</br>
가상 환경 제작(https://wikidocs.net/81041 - 점프 투 플라스크 참조)</br>
가상 환경 폴더에 아래 내용을 포함한 프로젝트명.cmd 파일 생성</br>

```
@echo off
cd c:/projects/myproject
set FLASK_APP=pybo
set FLASK_ENV=development
c:/venvs/myproject/scripts/activate
```

명령 프롬프트를 열어 프로젝트명 입력 - Enter</br>
requirement.txt를 참조하여 프로젝트에 포함된 패키지 다운로드</br>

---------

### &#129412; **Model**
- LSTM, BiLSTM
- GRU
- BERT
