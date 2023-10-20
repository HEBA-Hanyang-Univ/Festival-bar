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
            "rejected" : [],
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
            "rejected" : [],
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
def set_table(table_no, nums, gender, photo, note):
    table_data = read_json_file(json_file)
    try:
        index = table_no-1
        table_data[index]['nums'] = nums
        table_data[index]['gender'] = gender
        table_data[index]['photo'] = photo
        table_data[index]['note'] = note
        table_data[index]['active'] = True
        current_time = datetime.now()
        table_data[index]['start_time'] = current_time.strftime('%m-%d %H:%M')
        table_data[index]['end_time'] = (current_time + timedelta(hours=1.5)).strftime('%m-%d %H:%M')
        write_json_file('table.json', table_data)
        return {'success': f'Table {table_no} active'}
    except Exception as e:
        return {'error' : f'{e}'}

### update table info
def update_info(table_no, male_count, female_count, note):
    try:
        table_data = read_json_file(json_file)
        index = table_no-1

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

        return {"success" : "Update success"}

    except Exception as e:
        return {"error" : f"{e}"}

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
    return table_data[table_no-1]
            
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
    try:
        with open('table.json', "r", encoding="utf-8") as f:
                table_data = json.load(f)

        if my_table != received_table:
            if my_table not in table_data[received_table-1]['received']:
                if table_data[my_table-1]['likes'] > 0:
                    if table_data[received_table-1]['active'] == True: 
                        if table_data[received_table-1]['gender'] != "group":
                            if my_table not in table_data[received_table-1]['rejected']:

                                print('my table :', table_data[my_table-1]['table_no'])
                                print('received table :', table_data[received_table-1]['table_no'])

                                table_data[my_table-1]['likes'] -= 1
                                table_data[my_table-1]['sent'].append(received_table)
                                table_data[received_table-1]['received'].append(my_table)
                                table_data[received_table-1]['record'].insert(0,[f'{my_table}번 테이블에서 하트를 보냈습니다.', datetime.now().strftime('%H:%M')])

                                write_json_file('table.json',table_data)
                            
                                return {"success" : "Good"}
                            else:
                                return {"fail" : "Rejected"}
                        else:
                            return {"fail" : "Already group"}
                    else:
                        return {"fail" : "Received table active False"}
                else:
                    return {"fail" : "No likes left"}
            else:
                return {"fail" : "Already sent"}
        else:
            return {"fail" : "Same table"}
    except Exception as e:
        return {"error" : f'{e}'}

### reject
def reject(my_table, reject_table):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)

    if reject_table in table_data[my_table-1]['received']:
        table_data[my_table-1]['rejected'].append(reject_table)

        write_json_file('table.json',table_data)
        
        return {"success" : f"Reject {reject_table} table"}
    else:
        return {"fail" : "?"}

##########################################################
########################## 관리자 ##########################
##########################################################

### 하트 충전
def add_likes(table_no, count):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)

    table_data[table_no-1]['nums'] += count

    write_json_file('table.json',table_data)

    return {"success" : f"Add {count} likes on Table {table_no}"}
 
### 시간 충전
def add_time(table_no, minutes):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)

    end_time = datetime.strptime(table_data[table_no-1]['end_time'], '%m-%d %H:%M')
    new_end_time = end_time + timedelta(minutes=minutes)
    table_data[table_no-1]['end_time'] = new_end_time.strftime('%m-%d %H:%M')  # datetime 객체를 문자열로 변환하여 저장

    write_json_file('table.json',table_data)

    return {"success" : f"Add {minutes} minutes on Table {table_no}"}

### 합석 처리
def join_table(from_where, to_where):
    try:
        if from_where != to_where:
            with open('table.json', "r", encoding="utf-8") as f:
                table_data = json.load(f)
            if table_data[from_where-1]['gender'] != 'group' and table_data[to_where-1]['gender'] != 'group':
                if table_data[from_where-1]['active'] and table_data[to_where-1]['active']:
                    ## 합석으로 인한 정보 변경
                    table_data[to_where-1]['nums'] += table_data[from_where-1]['nums']
                    table_data[to_where-1]['gender'] = "group"
                    table_data[to_where-1]['join'] = True
                    table_data[to_where-1]['end_time'] = table_data[to_where-1]['end_time'] if table_data[to_where-1]['end_time'] > table_data[from_where-1]['end_time'] else table_data[from_where-1]['end_time']
                    table_data[to_where-1]['note'] = ""

                    table_data[from_where-1] = reset_table(from_where)

                    write_json_file('table.json',table_data)

                    return {"success" : "Create group"}
                else:
                    return {"fail" : "Active False"}
            else:
                return {"fail" : "Already group"}
        else:
            return {"fail" : "My table"}
    except Exception as e:
        return {"error" : f"{e}"}

def reset_table_2(table_no):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    table_data[table_no-1] = reset_table(table_no)

    write_json_file('table.json',table_data)
    return {"success" : f"Reset Table {table_no}"}


##########################################################
########################## test ##########################
##########################################################
# reset_all_tables()
# test_reset_table()