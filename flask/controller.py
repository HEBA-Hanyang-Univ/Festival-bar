import json
import os
from datetime import datetime, timedelta
import pytz

my_dir = os.path.dirname(__file__)
json_file = os.path.join(my_dir, 'table.json')
json_file2 = os.path.join(my_dir, 'admin.json')
json_file3 = os.path.join(my_dir, 'table_code.json')

def read_json_file(file_name):
    try:
        with open(file_name, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f)
    return data

def write_json_file(file_name, data, file_name2, data2, file_name3, data3):
    with open(file_name, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    with open(file_name2, "w") as f:
        json.dump(data2, f, ensure_ascii=False, indent=4)
    with open(file_name3, "w") as f:
        json.dump(data3, f, ensure_ascii=False, indent=4)

qr_data = read_json_file('table_token.json')
table_data = read_json_file('table.json')
admin = read_json_file('admin.json')
table_code_list = read_json_file('table_code.json')

def write_table_data():
    write_json_file(json_file, table_data, json_file2, admin, json_file3, table_code_list)

def reset(table_no):
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
            # "record" : [], # str list
            "photo" : False,
            "note" : "",
            "referrer" : "",
            "code" : 0
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
    table_data.clear()
    for i in range(1, 36):
        b = reset(i)
        table_data.append(b)

# def test_reset_all_tables():
#     table_data = []
#     for i in range(1, 21):
#         b = test_reset_table(i)
#         table_data.append(b)
    
#############################################################

### set table
def set_table(table_no, nums, gender, photo, note, referrer, random_code):
    try:
        index = table_no-1
        if table_data[index]['active'] == False:
            table_data[index]['nums'] = nums
            table_data[index]['gender'] = gender
            table_data[index]['photo'] = photo
            table_data[index]['note'] = note
            table_data[index]['referrer'] = referrer
            table_data[index]['active'] = True
            current_time = datetime.now()
            korea_tz = pytz.timezone('Asia/Seoul')
            korea_time = current_time.astimezone(korea_tz)
            table_data[index]['start_time'] = korea_time.strftime('%Y-%m-%d %H:%M:%S')
            table_data[index]['end_time'] = (korea_time + timedelta(hours=1.5)).strftime('%Y-%m-%d %H:%M:%S')
            table_data[index]['code'] = random_code
            table_code_list.insert(0,random_code)
            return table_data[index]['code']
        else:
            return "fail"
    except:
        return "fail"

def set_table_admin(dic):
    key_list = list(dic.keys())
    key_list.remove('token')
    index = dic['table_no']-1
    for key in key_list:
        table_data[index][key] = dic[key]
    return "ok"

### update table info
def update_info(table_no, male_count, female_count, note):
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

        return "ok"
    else:
        return "fail"

### get table number by token 
def get_table_no_by_token(token):
    table_no = qr_data.get(token)
    try :
        table_no = int(table_no)
    except Exception as e :
        pass

    return table_no

def get_table(table_no):
    if table_no == None:
        return None
    return table_data[table_no-1]

### send 
def send_like(my_table, received_table):
    try:
        if my_table != received_table:
            if my_table not in table_data[received_table-1]['received']:
                if table_data[my_table-1]['likes'] > 0:
                    if table_data[received_table-1]['active'] == True: 
                        if table_data[my_table-1]['gender'] != 'group' and table_data[received_table-1]['gender'] != "group":

                            # print('my table :', table_data[my_table-1]['table_no'])
                            # print('received table :', table_data[received_table-1]['table_no'])

                            table_data[my_table-1]['likes'] -= 1
                            table_data[my_table-1]['sent'].append(received_table)
                            table_data[received_table-1]['received'].append(my_table)
                            # table_data[received_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 보냈습니다.', datetime.now().strftime('%H:%M')])
                            
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
        # table_data[reject_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 거절했습니다.', datetime.now().strftime('%H:%M')])
        
        return "ok"
    else:
        return "fail"

### 직원 호출
def call(table_no, join):
    # current_time = datetime.now()
    # korea_tz = pytz.timezone('Asia/Seoul')
    # korea_time = current_time.astimezone(korea_tz)

    if len(admin['record']) == 20:
        admin['record'].pop()
    if not join:
        admin['record']['call'].insert(0, table_no)
        return "ok"
    else:
        admin['record']['join'].insert(0, table_no)
        return "ok"

##########################################################
########################## 관리자 ##########################
##########################################################

### 하트 충전
def add_likes(table_no, count):

    table_data[table_no-1]['likes'] += count

    return "ok"
 
### 시간 충전
def add_time(table_no, minutes):

    end_time = datetime.strptime(table_data[table_no-1]['end_time'], '%H:%M')
    new_end_time = end_time + timedelta(minutes=minutes)
    table_data[table_no-1]['end_time'] = new_end_time.strftime('%H:%M')  # datetime 객체를 문자열로 변환하여 저장

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
                    current_time = datetime.now()
                    korea_tz = pytz.timezone('Asia/Seoul')
                    korea_time = current_time.astimezone(korea_tz)
                    # table_data[to_where-1]['record'].insert(0, [f'{from_where}번 테이블과 성공적으로 매칭 되었습니다!',korea_time.strftime('%H:%M')])

                    table_data[from_where-1] = reset(from_where)

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
def reset_table(table_no):
    table_data[table_no-1] = reset(table_no)

    return "ok"


##########################################################
########################## test ##########################
##########################################################
# reset_all_tables()
# test_reset_table()
