import json
import os
from datetime import datetime, timedelta
import pytz

my_dir = os.path.dirname(__file__)
json_file = os.path.join(my_dir, 'table.json')
json_file2 = os.path.join(my_dir, 'admin.json')

def read_json_file(file_name):
    try:
        with open(file_name, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []
        with open(json_file, "w", encoding="utf-8") as f:
            json.dump(data, f)
    return data


def write_json_file(file_name, data, file_name2, data2):
    with open(file_name, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    with open(file_name2, "w") as f:
        json.dump(data2, f, ensure_ascii=False, indent=4)


qr_data = read_json_file('table_token.json')
table_data = read_json_file('table.json')
admin = read_json_file('admin.json')

if not isinstance(admin, dict):
    admin = {}
    admin['record'] = []
    admin['record_idx'] = 0,

if not isinstance(admin['record'], list) :
    admin['record'] = []

if not isinstance(admin['record_idx'], int) :
    admin['record_idx'] = 0

with open('name_list.txt', 'r') as name_file :
    referrer_list = [line.strip() for line in name_file]

def write_table_data():
    write_json_file(json_file, table_data, json_file2, admin)
    current = set_time().strftime('%Y-%m-%d_%H%M%S')
    table_history = open(f'logs/table_history_{current}.log', 'a')
    json.dump(table_data, table_history, ensure_ascii=False, indent=4)
    table_history.write('\n\n')
    table_history.close()

def set_time():
    current_time = datetime.now()
    korea_tz = pytz.timezone('Asia/Seoul')
    korea_time = current_time.astimezone(korea_tz)
    
    return korea_time


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
            "record" : [], # dic list
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
    for i in range(1, 31):
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
        if table_data[index]['active'] == True:
            print(f'Already enabled table : {table_no}')
            return "fail"

        reset(table_no)
        table_data[index]['nums'] = nums
        table_data[index]['gender'] = gender
        table_data[index]['photo'] = photo
        table_data[index]['note'] = note
        table_data[index]['referrer'] = ""
            
        if referrer and referrer != "" and referrer.startswith('H') and referrer[1:] in referrer_list:
            table_data[index]['referrer'] = referrer[1:]
            
        table_data[index]['active'] = True
        korea_time = set_time()
        table_data[index]['start_time'] = korea_time.strftime('%Y-%m-%d %H:%M:%S')
        table_data[index]['end_time'] = (korea_time + timedelta(hours=1.5)).strftime('%Y-%m-%d %H:%M:%S')
        table_data[index]['code'] = random_code
        print(f'{table_no} has activated with code: {random_code}, agree: {photo}')
        return table_data[index]['code']
        
    except Exception as e:
        print(e)
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

    if table_data[index]['active'] == False:
        print(f'cannot update inactive table : {table_no}')
        return "fail"
    
    table_data[index]['note'] = note

    if male_count and not female_count:
        table_data[index]['gender'] = 'male'
        table_data[index]['nums'] = male_count
        
    if female_count and not male_count:
        table_data[index]['gender'] = 'female'
        table_data[index]['nums'] = female_count

    if male_count and female_count:
        table_data[index]['gender'] = 'mixed'
        table_data[index]['nums'] = male_count + female_count
    print(f'{table_no} updated info, {table_data[index]["gender"]}, {table_data[index]["nums"]}')
    return "ok"


### get table number by token 
def get_table_no_by_token(token):
    table_no = qr_data.get(token)
    if table_no == 'admin' :
        return table_no

    try :
        table_no = int(table_no)
    except Exception as e :
        pass

    return table_no


def get_table(table_no):
    if isinstance(table_no, int):
        return table_data[table_no-1]
    return {}


### send 
def send_like(my_table, received_table):
    try:
        if check_available(my_table, received_table) == False :
            print(f'{my_table} tried to send a like to {received_table}, but unavailable')
            return "fail"

        if received_table in table_data[my_table-1]['sent'] :
            print(f'{my_table} already sent to {received_table}')
            return "fail"

        # reply don't use a like
        if my_table not in table_data[received_table-1]['sent'] :
            if table_data[my_table-1]['likes'] <= 0 :
                print(f'{my_table} has no likes')
                return "fail"
            else :
                table_data[my_table-1]['likes'] -= 1
        table_data[my_table-1]['sent'].append(received_table)
        table_data[received_table-1]['received'].append(my_table)

        current_time = set_time().strftime('%Y-%m-%d %H:%M:%S')

        if my_table not in table_data[received_table-1]['sent'] :
            table_data[received_table-1]['record'].insert(0, { \
                    "type" : "received", \
                    "from" : int(my_table), \
                    "time" : current_time, \
                    "index" : len(table_data[received_table-1]['record'])})
            print(f'{my_table} sent a like to {received_table}')
        else :
            table_data[my_table-1]['record'].insert(0, { \
                    "type" : "matched", \
                    "from" : int(received_table), \
                    "time" : current_time, \
                    "index" : len(table_data[my_table-1]['record'])})
            table_data[received_table-1]['record'].insert(0, { \
                    "type" : "matched", \
                    "from" : int(my_table), \
                    "time" : current_time, \
                    "index" : len(table_data[received_table-1]['record'])})
            admin['record'].insert(0, { \
                    "type" : "join", \
                    "from" : int(my_table), \
                    "to" : int(received_table), \
                    "time" : current_time, \
                    "index" : admin['record_idx'] + 1})
            admin['record_idx'] += 1
            print(f'{my_table} and {received_table} sent likes to each other')

        return "ok"

    except Exception as e:
        print(e)
        return "fail"


### reject
def reject(my_table, reject_table):
    if check_available(my_table, reject_table) == False:
        print(f'unable to reject : {my_table}, {reject_table}')
        return "fail"

    if reject_table not in table_data[my_table-1]['received']:
        print(f'rejected already : {my_table}, {reject_table}')
        return "fail"
    
    table_data[reject_table-1]['rejected'].insert(0, my_table)
    table_data[my_table-1]['rejected'].insert(0, reject_table)

    table_data[reject_table-1]['record'].insert(0, { \
            "type" : "rejected", \
            "from" : my_table, \
            "time": set_time().strftime('%Y-%m-%d %H:%M:%S')})
    print(f'{my_table} rejected {reject_table}')
        
    return "ok"


### 직원 호출
def call(table_no):
    admin['record'].insert(0, { \
            "type" : "call", \
            "from" : table_no, \
            "time" : set_time().strftime('%Y-%m-%d %H:%M:%S'), \
            "index" : admin['record_idx'] + 1})
    admin['record_idx'] += 1
    print(f'{table_no} called worker')

    return "ok"


##########################################################
########################## 관리자 ##########################
##########################################################

### 하트 충전
def add_likes(table_no, count):

    table_data[table_no-1]['likes'] += count
    print(f'add {count} like(s) to {table_no}')
    return "ok"


### 시간 충전
def add_time(table_no, minutes):

    end_time = datetime.strptime(table_data[table_no-1]['end_time'], '%Y-%m-%d %H:%M:%S')
    new_end_time = end_time + timedelta(minutes=minutes)
    table_data[table_no-1]['end_time'] = new_end_time.strftime('%Y-%m-%d %H:%M:%S')  

    print(f'add {minutes}min(s) to {table_no}')
    return "ok"


### 합석 처리
def join_table(from_where, to_where):
    try:
        if check_available(from_where, to_where) == False :
            print(f'join {from_where} to {to_where} is unavailable')
            return "fail"
        # find who's table has more time
        influent = table_data[to_where-1] \
                if datetime.strptime(table_data[to_where-1]['end_time'], '%Y-%m-%d %H:%M:%S') \
                > datetime.strptime(table_data[from_where-1]['end_time'], '%Y-%m-%d %H:%M:%S') \
                else table_data[from_where-1]

        # 합석으로 인한 정보 변경
        table_data[to_where-1]['nums'] += table_data[from_where-1]['nums']
        table_data[to_where-1]['gender'] = "mixed"
        table_data[to_where-1]['join'] = True
        table_data[to_where-1]['end_time'] = influent['end_time']
        if table_data[to_where-1]['referrer'] == "" :
            table_data[to_where-1]['referrer'] = table_data[from_where-1]['referrer']
        elif table_data[to_where-1]['referrer'] != "" :
            table_data[to_where-1]['referrer'] = influent['referrer']
        table_data[to_where-1]['note'] = ""

        remove_like(to_where)        
        # table_data[from_where-1] = reset(from_where)
        reset_table(from_where)
        table_data[to_where-1]['received'] = []
        table_data[to_where-1]['sent'] = []
        table_data[to_where-1]['rejected'] = []
        print(f'{from_where} joined to {to_where}')
        return "ok"
    except Exception as e:
        print(e)
        return "fail"


### 테이블 비우기
def reset_table(table_no):
    try :
        remove_like(table_no)
        remove_record(table_no)
    except Exception as e:
        print(e)
        pass
    
    table_data[table_no-1] = reset(table_no)
    print(f'reset {table_no}')
    return "ok"


#########################################################
###################### utility ##########################
#########################################################
def check_available(me, opponent) :
    if me == opponent :
        return False
    if not table_data[opponent-1]['active'] or not table_data[me-1]['active'] :
        return False
    if me in table_data[opponent-1]['rejected'] :
        return False
    if table_data[opponent-1]['join'] or table_data[me-1]['join'] :
        return False
    if table_data[opponent-1]['gender'] == 'mixed' or table_data[me-1]['gender'] == 'mixed' :
        return False
    if table_data[opponent-1]['gender'] == table_data[me-1]['gender'] :
        return False

    return True

def remove_like(table_no) :
    if table_data[table_no-1]['sent'] != []:
        for sent_no in table_data[table_no-1]['sent'][:]:
            #for rec in table_data[sent_no-1]['record'] :
            #    if rec['from'] == sent_no :
            #        table_data[sent_no-1]['record'].remove(rec)
            table_data[sent_no-1]['received'].remove(table_no)

    if table_data[table_no-1]['rejected'] != []:
        for reject_no in table_data[table_no-1]['rejected'][:]:
            table_data[reject_no-1]['rejected'].remove(table_no)

    if table_data[table_no-1]['received'] != []:
        for received_no in table_data[table_no-1]['received'][:]:
            table_data[received_no-1]['sent'].remove(table_no)


def remove_record(table_no) :
    for rec in admin['record'][:]:
        if rec.get('from') == table_no :
            admin['record'].remove(rec)
        elif rec.get('to') == table_no :
            admin['record'].remove(rec)
        

##########################################################
########################## test ##########################
##########################################################
# reset_all_tables()
# test_reset_all_tables()
