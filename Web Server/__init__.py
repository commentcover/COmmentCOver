from flask import Flask
from tensorflow import keras
from pykospacing import Spacing
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask import request, jsonify, render_template
from flask_cors import CORS
from flask_restful import Api
import re
import pickle

app = Flask(__name__)
model_path = "C:\\projects\\COCO\\LSTM_model.h5"  # 모델 파일 경로
loaded_model = keras.models.load_model(model_path)

CORS(app)
api = Api(app)

comments = ""
predict_value_str = ""


# 유튜브 댓글 데이터 받아오고 + Flask 서버로 전달
@app.route('/test', methods=['GET', 'POST'])
def test():
    global comments, predict_value_str
    # POST request
    if request.method == 'POST':
        comments = ""
        comments = request.get_json()

        # 댓글 20개씩 도착하는 것 확인
        print(comments, len(comments))

        predict_value_list = []
        predict_value_str = ""

        if comments == "refresh":
            predict_value_list = []
            predict_value_str = ""
            print(predict_value_list, predict_value_str)
        else:
            comments = only_korean(comments)  # 전처리 - 한글 외 제거
            for comment in comments:
                predict_value_list.append(sentiment_predict(comment))
            predict_value_str = ''.join(predict_value_list)
            print("predict_value_str", predict_value_str)
        return 'Success', 200
    # GET request
    elif request.method == 'GET':
        return predict_value_str

# 전처리 - 한글 외 제거
def only_korean(data):
    new_data = []
    for i in data:
        text = re.sub("[^가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9 ]", "", i).strip()  # 한글+숫자 정규표현식
        new_data.append(text)
    return new_data


# 악성댓글 여부 예측
def sentiment_predict(new_sentence):
    okt = Okt()
    spacing = Spacing()
    stopwords = ['이', '듯', '으로', '고', '인', '와', '하다', '의', '한', '다,', '은', '를', '가', '좀',
                 '자', '게', '도', '과', '네', '들', '는', '지', '잘', '에', '을', '걍', '임', '하']

    with open('C:\\projects\\COCO\\tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    max_len = 80
    new_sentence = spacing(new_sentence)                                     # 띄어쓰기
    new_sentence = okt.morphs(new_sentence, stem=True)                       # 토큰화
    new_sentence = [word for word in new_sentence if not word in stopwords]  # 불용어 제거
    encoded = tokenizer.texts_to_sequences([new_sentence])                   # 정수 인코딩
    pad_new = pad_sequences(encoded, maxlen=max_len)                         # 패딩
    score = float(loaded_model.predict(pad_new))                             # 예측
    if score > 0.8:
        return '1'
    else:
        return '0'

if __name__ == "__init__":
    app.run(debug=True)