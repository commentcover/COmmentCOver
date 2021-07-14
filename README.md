# &#128526; Comment Cover
### 자연어처리 및 AI를 활용한 유튜브 악성 댓글 블라인드 자동 처리 시스템

&#9989; 21/7/2 FRI
- atom, git, github 사용법 학습
- 유튜브 api 활용 및 댓글 크롤링
- Youtube Api 활용 및 댓글 크롤링

&#9989; 21/7/5 MON
- 한글 맞춤법 & 띄어쓰기 교정(pykospacing, <strike>hanspell</strike>)
- 신조어 & 반복 문자 정제(Soynlp)
- 형태소 분석(Okt, Komoran, Hannanum, Kkma, Khaiii 테스트 후 Okt 선정)
- 유튜브 인기 급상승 동영상 50개 댓글 크롤링(Youtube Api 활용)

&#9989; 21/7/7 WED
- 악성댓글 데이터 수집(유튜브 검색 - 정치)

&#9989; 21/7/8 THU
- 악성댓글 데이터 수집(https://github.com/kocohub/korean-hate-speech - hate)
- 악성댓글 데이터 수집(유튜브 채널 <엠빅뉴스> - 재생목록 엠빅트렌드 상위 30개)
- 수집한 댓글 라벨링(악성댓글: 1, 일반댓글: 0, 판별 불가: -1)

&#128293; 숙제
- 0 ~ 9(지은), 10 ~ 19(예희), 20 ~ 29(재은)
- 악성댓글(1) >= 1000 개
- 영상 하나 당 0, 1 포함해서 5백 개 이하만 라벨링

&#9989; 21/7/12 MON
- 악플 정리본 띄어쓰기 등 전처리
- 단어/문장 임베딩 비교 테스트(word2vec, doc2vec, glove, tf-idf, fastText)
- 벡터화 기법으로 Glove 최종 선정(클러스터링 용도)

&#9989; 21/7/14 WED
- Glove 사용하여 클러스터링(Kmeans, DBSCAN) 시도 후 기각 -> 프로젝트 방향성에 맞지 않음
- LSTM, BiLSTM, GRU, KoBert, Bert 시작

&#9989; 21/7/15 THU
- TODO
