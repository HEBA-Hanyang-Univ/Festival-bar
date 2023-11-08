from flask_app import *
from flask import request
import controller
from datetime import timedelta



##########################################################
########################## 관리자 ##########################
##########################################################



### 하트 충전
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/add-likes -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1, "count":2}'
@app.route('/admin/add-likes', methods=["POST"])
def add_likes():
    output = dict()
    data = request.get_json()

    token = data.get('token')
    if controller.get_table_no_by_token(token) != 'admin':
        output['result'] = 'fail'
        return output

    count = data.get('count')
    table_list = data.get('table_list')
    result = {}
    for t in table_list :
        try :
            table_no = int(t)
            if controller.get_table(table_no).get('active') :
                result[table_no] = controller.add_likes(table_no, count)
        except :
            pass

    output['result'] = result
    return output



### 시간 추가
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/add-time -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1, "minutes":10}'
@app.route('/admin/add-time', methods=["POST"])
def add_time():
    output = dict()
    data = request.get_json()

    token = data.get('token')
    if controller.get_table_no_by_token(token) != 'admin':
        output['result'] = 'fail'
        return output

    mins = data.get('mins')
    table_list = data.get('table_list')
    result = {}
    for t in table_list :
        try :
            table_no = int(t)
            if controller.get_table(table_no).get('active') :
                result[table_no] = controller.add_time(table_no, mins)
        except :
            pass

    output['result'] = result
    return output


### 합석 처리 
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/join -d '{"from_where":1, "to_where":2, "token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70"}'
@app.route('/admin/join', methods=["POST"])
def join_table():
    output = dict()
    data = request.get_json()
    token = data.get('token')
    if controller.get_table_no_by_token(token) == 'admin':
        from_where = data.get('from_where')
        to_where = data.get('to_where')
        
        output['result'] = controller.join_table(from_where, to_where)
        return output
    
    output['result'] = "fail"
    return output



### 퇴장 처리
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/reset-table -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1}'
@app.route('/admin/reset-table', methods=["POST"])
def reset_table():
    output = dict()
    data = request.get_json()

    token = data.get('token')
    if controller.get_table_no_by_token(token) != 'admin' :
        output['result'] = "fail"
        return output

    table_list = data.get('table_list')
    result = {}
    for t in table_list :
        try :
            table_no = int(t)
            if controller.get_table(table_no).get('active') :
                result[table_no] = controller.reset_table(table_no)
        except :
            pass

    output['result'] = result
    return result

### 알림 처리
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/del-record -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "notice_index":1}' 
@app.route('/admin/del-record', methods=['POST'])
def delete_record() :
    output = dict()
    data = request.get_json()

    token = data.get('token')
    if controller.get_table_no_by_token(token) != 'admin' :
        output['result'] = "fail"
        return output

    notice_index = data.get('notice_index')
    try :
        notice_index = int(notice_index)
    except :
        pass

    [controller.admin['record'].remove(noti) for noti in controller.admin['record'] if noti['index'] == notice_index]
    
    output['result'] = "ok"
    return output

