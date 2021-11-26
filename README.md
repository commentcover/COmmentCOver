# &#128526; Comment Cover
### &#10024; 자연어처리 및 AI를 활용한 유튜브 악성 댓글 블라인드 자동 처리 시스템 &#10024;

### &#127751; **Chrome Extension**
- background.js
- manifest.json
- popup.html
- popup.js
- script.js
- toggle.css


### &#127875; **Web Server**
- __init__.py
- tokenizer.pickle
- LSTM_model.h5
- requirement.txt

Web Server 폴더의 파일 다운로드</br>
파이썬 3.9.7 다운로드</br>
가상 환경 제작(https://wikidocs.net/81041 - 점프 투 플라스크 참조)</br>
가상 환경 폴더에 아래 내용을 포함한 프로젝트명.cmd 파일 생성</br>

'''
@echo off
cd c:/projects/myproject
set FLASK_APP=pybo
set FLASK_ENV=development
c:/venvs/myproject/scripts/activate
'''

명령 프롬프트를 열어 프로젝트명 입력 - Enter</br>
프로젝트에 포함된 패키지 다운로드</br>
