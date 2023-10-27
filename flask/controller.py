import json
import os
from datetime import datetime, timedelta

my_dir = os.path.dirname(__file__)
json_file = os.path.join(my_dir, 'table.json')

def read_json_file(file_name):
    try:
        with open(file_name, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f)
    return data

def write_json_file(file_name, data):
    with open(file_name, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

global qr_data
qr_data = read_json_file('table_token.json')
global table_data
table_data = read_json_file('table.json')

def write_table_data():
    write_json_file(json_file, table_data)

def reset_table(table_no):
    return {
            "table_no" : table_no, # int
            "active" : False,
            "nums" : 0, 
            "gender" : "", 
            "join" : False,
            "likes" : 3, # default 3
            "sent" : [], # int list
            "received" : [], # int list
            "rejected" : [],
            "record" : [], # str list
            "photo" : False,
            "note" : "",
            "referrer" : "" 
        }

def test_reset_table(table_no):
    return {
            "table_no" : table_no, 
            "active" : True,
            "nums" : 3, 
            "gender" : "male", 
            "join" : False,
            "likes" : 3, 
            "sent" : [],
            "received" : [],
            "rejected" : [],
            "record" : [],
            "photo" : False, 
            "note" : "",
            "referrer" : ""
        }

def reset_all_tables():
    table_data = []
    for i in range(1, 35):
        b = reset_table(i)
        table_data.append(b)

def test_reset_all_tables():
    table_data = []
    for i in range(1, 21):
        b = test_reset_table(i)
        table_data.append(b)
    
#############################################################

### set table
def set_table(table_no, nums, gender, photo, note, referrer):
    try:
        table_data = read_json_file(json_file)
        index = table_no-1
        if table_data[index]['active'] == False:
            table_data[index]['nums'] = nums
            table_data[index]['gender'] = gender
            table_data[index]['photo'] = photo
            table_data[index]['note'] = note
            table_data[index]['referrer'] = referrer
            table_data[index]['active'] = True
            current_time = datetime.now()
            table_data[index]['start_time'] = current_time.strftime('%m-%d %H:%M')
            table_data[index]['end_time'] = (current_time + timedelta(hours=1.5)).strftime('%m-%d %H:%M')
            write_json_file('table.json', table_data)
            return "ok"
        else:
            return "fail"
    except:
        return "fail"

### update table info
def update_info(table_no, male_count, female_count, note):
    table_data = read_json_file(json_file)
    index = table_no-1

    if table_data[index]['active'] == True:
        table_data[index]['note'] = note

        if male_count and not female_count:
            table_data[index]['gender'] = 'male'
            table_data[index]['nums'] = male_count
        
        if female_count and not male_count:
            table_data[index]['gender'] = 'female'
            table_data[index]['nums'] = female_count

        if male_count and female_count:
            table_data[index]['gender'] = 'group'
            table_data[index]['nums'] = male_count + female_count
        
        write_json_file('table.json', table_data)

        return "ok"
    else:
        return "fail"

### get table number by token 
def get_table_no_by_token(token):
    table_no = qr_data.get(token)
    return table_no

def get_table(table_no):
    if table_no == None:
        return None
    return table_data[table_no-1]
            
### filtering
# def get_males_table():
#     with open('table.json', "r", encoding="utf-8") as f:
#         table_data = json.load(f)
#     try:
#         filtered_data = [(a['table_no'], a['nums']) for a in table_data if a['gender'] == 'male' and a['join'] == False]
#     except:
#         filtered_data = []

#     return filtered_data

# def get_females_table():
#     with open('table.json', "r", encoding="utf-8") as f:
#         table_data = json.load(f)
#     try:
#         filtered_data = [(a['table_no'], a['nums']) for a in table_data if a['gender'] == 'female' and a['join'] == False]
#     except:
#         filtered_data = []

#     return filtered_data

# def get_joined_table():
#     with open('table.json', "r", encoding="utf-8") as f:
#         table_data = json.load(f)
#     try:
#         filtered_data = [a['table_no'] for a in table_data if a['join'] == True]
#     except:
#         filtered_data = []

#     return filtered_data

# def get_active_table():
#     with open('table.json', "r", encoding="utf-8") as f:
#         table_data = json.load(f)
#     try:
#         filtered_data = [a['table_no'] for a in table_data if a['active'] == True]
#     except:
#         filtered_data = []

#     return filtered_data

### send 
def send_like(my_table, received_table):
    try:
        if my_table != received_table:
            if my_table not in table_data[received_table-1]['received']:
                if table_data[my_table-1]['likes'] > 0:
                    if table_data[received_table-1]['active'] == True: 
                        if table_data[received_table-1]['gender'] != "group":

                            # print('my table :', table_data[my_table-1]['table_no'])
                            # print('received table :', table_data[received_table-1]['table_no'])

                            table_data[my_table-1]['likes'] -= 1
                            table_data[my_table-1]['sent'].append(received_table)
                            table_data[received_table-1]['received'].append(my_table)
                            table_data[received_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 보냈습니다.', datetime.now().strftime('%H:%M')])
                            
                            return "ok"
                        else:
                            return "fail"
                    else:
                        return "fail"
                else:
                    return "fail"
            elif received_table not in table_data[my_table-1]['rejected']:
                return "fail"
            else:
                return "fail"
        else:
            return "fail"
    except:
        return "fail"

### reject
def reject(my_table, reject_table):

    if reject_table in table_data[my_table-1]['received']:
        table_data[reject_table-1]['rejected'].insert(0, my_table)
        table_data[reject_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 거절했습니다.', datetime.now().strftime('%H:%M')])
        
        return "ok"
    else:
        return "fail"

### 직원 호출
def call(table_no, join, likes_count=None, minutes=None):
    # if table_no and not likes_count and not minutes:
    #     if not os.path.exists('admin.json'):
    #         initial_data = {'record': [[f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')]]}
    #         with open('admin.json', 'w') as f:
    #             json.dump(initial_data, f,ensure_ascii=False, indent=4)
    #         return {"success" : "call"}
    #     else:
    #         data = read_json_file('admin.json')
    #         if len(data['record']) == 20:
    #             data['record'].pop()
    #             data['record'].insert(0, [f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')])
    #             write_json_file('admin.json',data)
    #             return {"success" : "call"}
    #         else:
    #             data['record'].insert(0, [f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')])
    #             write_json_file('admin.json',data)
    #             return {"success" : "call"}
    # if table_no and likes_count:
    #     if not os.path.exists('admin.json'):
    #         initial_data = {'record': [[f'[ 하트 충전 ] {table_no}번 테이블에 하트 {likes_count}개 충전해주세요',datetime.now().strftime('%H:%M')]]}
    #         with open('admin.json', 'w') as f:
    #             json.dump(initial_data, f,ensure_ascii=False, indent=4)
    #         return {"success" : "call"}
    #     else:
    #         data = read_json_file('admin.json')
    #         data['record'].insert(0, [f'[ 하트 충전 ] {table_no}번 테이블에 하트 {likes_count}개 충전해주세요',datetime.now().strftime('%H:%M')])
    #         write_json_file('admin.json',data)
    #         return {"success" : "call"}
    # if table_no and minutes:
    #     if not os.path.exists('admin.json'):
    #         initial_data = {'record': [[f'[ 시간 추가 ] {table_no}번 테이블에 시간 {minutes}분 추가해주세요',datetime.now().strftime('%H:%M')]]}
    #         with open('admin.json', 'w') as f:
    #             json.dump(initial_data, f,ensure_ascii=False, indent=4)
    #         return {"success" : "call"}
    #     else:
    #         data = read_json_file('admin.json')
    #         data['record'].insert(0, [f'[ 시간 추가 ] {table_no}번 테이블에 시간 {minutes}분 추가해주세요',datetime.now().strftime('%H:%M')])
    #         write_json_file('admin.json',data)
    #         return {"success" : "call"}
    try:
        if not join:
            if not os.path.exists('admin.json'):
                initial_data = {'record': [[f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')]]}
                with open('admin.json', 'w') as f:
                    json.dump(initial_data, f,ensure_ascii=False, indent=4)
                return "ok"
            else:
                data = read_json_file('admin.json')
                if len(data['record']) == 20:
                    data['record'].pop()
                    data['record'].insert(0, [f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')])
                    write_json_file('admin.json',data)
                    return "ok"
                else:
                    data['record'].insert(0, [f'[ 직원 호출 ] {table_no}번 테이블에서 직원을 호출합니다',datetime.now().strftime('%H:%M')])
                    write_json_file('admin.json',data)
                    return "ok"
        else:
            if not os.path.exists('admin.json'):
                initial_data = {'record': [[f'[ 합석 요청 ] {table_no}번 테이블의 합석 처리를 진행해주세요',datetime.now().strftime('%H:%M')]]}
                with open('admin.json', 'w') as f:
                    json.dump(initial_data, f,ensure_ascii=False, indent=4)
                return "ok"
            else:
                data = read_json_file('admin.json')
                if len(data['record']) == 20:
                    data['record'].pop()
                    data['record'].insert(0, [f'[ 합석 요청 ] {table_no}번 테이블의 합석 처리를 진행해주세요',datetime.now().strftime('%H:%M')])
                    write_json_file('admin.json',data)
                    return "ok"
                else:
                    data['record'].insert(0, [f'[ 합석 요청 ] {table_no}번 테이블의 합석 처리를 진행해주세요',datetime.now().strftime('%H:%M')])
                    write_json_file('admin.json',data)
                    return "ok"
    except:
        return "ok"

##########################################################
########################## 관리자 ##########################
##########################################################

### 하트 충전
def add_likes(table_no, count):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)

    table_data[table_no-1]['likes'] += count

    return "ok"
 
### 시간 충전
def add_time(table_no, minutes):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)

    end_time = datetime.strptime(table_data[table_no-1]['end_time'], '%m-%d %H:%M')
    new_end_time = end_time + timedelta(minutes=minutes)
    table_data[table_no-1]['end_time'] = new_end_time.strftime('%m-%d %H:%M')  # datetime 객체를 문자열로 변환하여 저장

    return "ok"

### 합석 처리
def join_table(from_where, to_where):
    try:
        if from_where != to_where:
            if table_data[from_where-1]['active'] and table_data[to_where-1]['active']:
                if table_data[from_where-1]['gender'] != 'group' and table_data[to_where-1]['gender'] != 'group':

                    # 합석으로 인한 정보 변경
                    table_data[to_where-1]['nums'] += table_data[from_where-1]['nums']
                    table_data[to_where-1]['gender'] = "group"
                    table_data[to_where-1]['join'] = True
                    table_data[to_where-1]['end_time'] = table_data[to_where-1]['end_time'] if table_data[to_where-1]['end_time'] > table_data[from_where-1]['end_time'] else table_data[from_where-1]['end_time']
                    table_data[to_where-1]['note'] = ""

                    table_data[from_where-1] = reset_table(from_where)

                    return "ok"
                else:
                    return "fail"
            else:
                return "fail"
        else:
            return "fail"
    except:
        return "fail"

### 테이블 비우기
def reset_table_2(table_no):
    table_data[table_no-1] = reset_table(table_no)

    write_json_file('table.json',table_data)
    return "ok"


##########################################################
########################## test ##########################
##########################################################
# reset_all_tables()
# test_reset_table()
