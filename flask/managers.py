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
    if controller.get_table_no_by_token(token) == 'admin':
        table_no = data.get('table_no')
        count = data.get('count')

        output['result'] = controller.add_likes(table_no, count)
        return output
    else:
        output['result'] = {"fail" : "Invalid token"}
        return output





### 시간 추가
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/add-time -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1, "minutes":10}'
@app.route('/admin/add-time', methods=["POST"])
def add_time():
    output = dict()
    data = request.get_json()

    token = data.get('token')

    if controller.get_table_no_by_token(token) == 'admin':
        table_no = data.get('table_no')

        if controller.get_table(table_no)['active'] == True:
            minutes = data.get('minutes')

            output['result'] = controller.add_time(table_no, minutes)
            return output
        else:
            output['result'] = {"fail" : f"Table {table_no} active False"}
            return output
    else:
        output['result'] = {"fail" : "Invalid token"}
        return output





### 퇴장 처리
# curl -X POST -H 'Content-type:application/json' http://127.0.0.1:5000/admin/reset-table -d '{"token":"5ea91197-09ef-42e9-9bd9-d1d183b6db70", "table_no":1}'
@app.route('/admin/reset-table', methods=["POST"])
def reset_table():
    output = dict()
    data = request.get_json()

    token = data.get('token')

    if controller.get_table_no_by_token(token) == 'admin':
        table_no = data.get('table_no')
        output['result'] = controller.reset_table_2(table_no)
        return output
    else:
        output['result'] = {"fail" : "Invalid token"}
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
    
    output['result'] = {"fail" : "Invalid token"}
    return output

