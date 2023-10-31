from flask_app import *
from flask import request, session
import controller
import random
import copy

table_data = controller.table_data
table_code_list = controller.table_code_list

@app.route('/<token>')
def index(token):
    table_no = controller.get_table_no_by_token(token)
    if type(table_no) == int:
        session['token'] = token
        session['table_info'] = controller.get_table(controller.get_table_no_by_token(token))

        return app.send_static_file('index.html')


### 전체 테이블 조회
### 플라스크를 통한 호출이 아닌 직접 호출 시 매개변수 체크 필수
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/get-all -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb"}'
@app.route('/get-all', methods=['POST'])
def get_all(check_token=True):
    output = dict()
    data = request.get_json()
    
    if check_token == True:
        token = data.get('token')
        if controller.get_table(controller.get_table_no_by_token(token)) == None:
            output['result'] = "fail"
            return output

    output['result'] = table_data
    return output


### 테이블 정보 조회
### client ###
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/get-table -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb"}'

### admin ### param --> +) admin_token
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/get-table -d '{"admin_token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb"}'
@app.route('/get-table', methods=['POST'])
def get_table():
    output = dict()

    data = request.get_json()  
    token = data.get('token')
    admin_token = data.get('admin_token')
    table_info = controller.get_table(controller.get_table_no_by_token(token))

    if table_info:
        if not admin_token:
            output['result'] = copy.copy(table_info)
            del output['result']['code']
            return output
        else:
            output['result'] = table_info
            return output
    else:
        output['result'] = "fail"
        return output

### 테이블 인증 (토큰 + 코드 4자리)
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/check-code -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "code":4147}'
@app.route('/check-code', methods=['POST'])
def check_code():
    output = dict()

    data = request.get_json()  
    token = data.get('token')
    code = data.get('code')
    table_info = controller.get_table(controller.get_table_no_by_token(token))
    if table_info['code'] == code:
        output['result'] = "ok"
        return output
    else:
        output['result'] = "fail"
        return output

### 입력값 저장
### client ###
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/set-table -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "gender":"male", "nums":3, "note":"남자 셋", "photo":false, "referrer":"이유빈"}' 

### admin ### param --> admin token, table_no / + 바꾸려는 값들
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/set-table -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1, "active":true}' 
@app.route('/set-table', methods=["POST"])
def set_table():
    output = dict()
    data = request.get_json()
    token = data.get('token')
    table_no = controller.get_table_no_by_token(token)

    if type(table_no) == int:
        gender = data.get('gender')
        nums = data.get('nums')
        note = data.get('note')
        photo = data.get('photo')
        referrer = data.get('referrer')
        while True:
            random_code = random.randint(100000, 999999)
            if random_code not in table_code_list:
                break
        
        result = controller.set_table(table_no, nums, gender, photo, note, referrer, random_code)  
        output['result'] = result
        return output

    if table_no == 'admin':
        result = controller.set_table_admin(data)
        output['result'] = result
        return output
                
    else:
        output['result'] = "fail"
        return output




### 테이블 정보 수정
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/update-info -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb","m_count":3,"f_count":4,"note":"ccc"}'
@app.route('/update-info', methods=["POST"])
def update_info():
    try:
        output = dict()
        data = request.get_json()

        token = data.get('token')
        table_no = controller.get_table_no_by_token(token)

        m_count = data.get('m_count')
        f_count = data.get('f_count')
        note = data.get('note')

        output['result'] = controller.update_info(table_no, m_count, f_count, note)        
        return output
    except Exception as e:
        return "fail"





### 하트 보내기
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/send-like -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "received_table":2}'
@app.route('/send-like', methods=["POST"])
def send_like():
    output = dict()
    data = request.get_json()

    token = data.get('token')
    received_table = data.get('received_table')
    
    output['result'] = controller.send_like(controller.get_table_no_by_token(token), received_table)

    return output





### 하트 거절
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/reject -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "reject":2}'
@app.route('/reject', methods=["POST"])
def reject():
    output = dict()
    data = request.get_json()

    token = data.get('token')
    table_no = controller.get_table_no_by_token(token)
    if type(table_no) == int:
        reject_table = data.get('reject')
        output['result'] = controller.reject(table_no, reject_table)
        return output
    else:
        output['result'] = "fail"
        return output





### 직원 호출 / 합석 처리 요청 ( 일단 시간 추가 요청, 하트 충전 요청 없음 )
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/call -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "join":false}'
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/call -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "join":true}'

# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/call -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "likes_count":2}'
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/call -d '{"token":"0b79fdd4-8cf8-4a5f-8506-904d1207e9fb", "minutes":10}'
@app.route('/call', methods=["POST"])
def call():
    output = dict()
    data = request.get_json()
    token = data.get('token')
    join = data.get('join')
    table_no = controller.get_table_no_by_token(token)

    if type(table_no) == int:
        output['result'] = controller.call(table_no, join)
        return output
    else:
        output['result'] = "fail"
        return output