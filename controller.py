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
            "record" : [], # str list
            "photo" : False,
            "note" : "" 
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
            "record" : [],
            "photo" : False, 
            "note" : ""
        }

def reset_all_tables():
    table_data = []
    for i in range(1, 41):
        b = reset_table(i)
        table_data.append(b)
    write_json_file('table.json',table_data)

def test_reset_all_tables():
    table_data = []
    for i in range(1, 21):
        b = test_reset_table(i)
        table_data.append(b)
    write_json_file('table.json',table_data)
    
#############################################################

### set table
def set_table(table_no, nums, gender):
    table_data = read_json_file(json_file)
    for i in range(0,len(table_data)):
        if table_data[i]['table_no'] == table_no:
            table_data[i]['nums'] = nums
            table_data[i]['gender'] = gender
            table_data[i]['active'] = True
            current_time = datetime.now()
            table_data[i]['start_time'] = current_time.strftime('%m-%d %H:%M')
            table_data[i]['end_time'] = (current_time + timedelta(hours=1.5)).strftime('%Y-%m-%d %H:%M')
            break
    write_json_file('table.json', table_data)

### get table number by token 
def get_table_no_by_token(token):
    with open('table_token.json', "r", encoding="utf-8") as f:
        qr_data = json.load(f)
    try:
        table_no = qr_data[token]
        return table_no
    except KeyError:
        return False

def get_table(table_no):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    for a in table_data:
        if a['table_no'] == table_no:
            return a
            
### filtering
def get_males_table():
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    try:
        filtered_data = [(a['table_no'], a['nums']) for a in table_data if a['gender'] == 'male' and a['join'] == False]
    except:
        filtered_data = []

    return filtered_data

def get_females_table():
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    try:
        filtered_data = [(a['table_no'], a['nums']) for a in table_data if a['gender'] == 'female' and a['join'] == False]
    except:
        filtered_data = []

    return filtered_data

def get_joined_table():
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    try:
        filtered_data = [a['table_no'] for a in table_data if a['join'] == True]
    except:
        filtered_data = []

    return filtered_data

def get_active_table():
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    try:
        filtered_data = [a['table_no'] for a in table_data if a['active'] == True]
    except:
        filtered_data = []

    return filtered_data

### send 
def send_like(my_table, received_table):
    with open('table.json', "r", encoding="utf-8") as f:
            table_data = json.load(f)

    if my_table != received_table and table_data[my_table-1]['remained_likes'] > 0 and table_data[received_table-1]['active'] == True and table_data[received_table-1]['gender'] != "group":

        print('my table :', table_data[my_table-1]['table_no'])
        print('received table :', table_data[received_table-1]['table_no'])

        table_data[my_table-1]['remained_likes'] -= 1
        table_data[my_table-1]['sent'].append(received_table)
        table_data[received_table-1]['received'].append(my_table)
        table_data[received_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 보냈습니다.', datetime.now().strftime('%H:%M')])

        write_json_file('table.json',table_data)

    return False

### join
def join_table(from_where, to_where):
    if from_where != to_where:
        with open('table.json', "r", encoding="utf-8") as f:
            table_data = json.load(f)

        ## 합석으로 인한 정보 변경
        table_data[to_where-1]['nums'] += table_data[from_where-1]['nums']
        table_data[to_where-1]['gender'] = "group"
        table_data[to_where-1]['join'] = True
        table_data[to_where-1]['end_time'] = table_data[to_where-1]['end_time'] if table_data[to_where-1]['end_time'] > table_data[from_where-1]['end_time'] else table_data[from_where-1]['end_time']

        table_data[from_where-1] = reset_table(from_where)

        write_json_file('table.json',table_data)

    return False

##########################################################
########################## test ##########################
##########################################################
# reset_all_tables()
# test_reset_table()