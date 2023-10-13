import json
import os

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
            "nums" : 0, # int
            "gender" : None, # str
            "join" : False,
            "remained_likes" : 3, # max 3
            "blocks" : [],
            "received" : [],
            "sent" : []
        }

# def reset_all_tables():
#     table_data = []
#     for i in range(1, 41):
#         b = reset_table(i)
#         table_data.append(b)
#     write_json_file('table.json',table_data)

#############################################################

### set table
def set_table(table_no, nums, gender):
    table_data = read_json_file(json_file)
    for i in range(0,len(table_data)):
        if table_data[i]['table_no'] == table_no:
            table_data[i]['nums'] = nums
            table_data[i]['gender'] = gender
            table_data[i]['active'] = True
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
        print('Invalid token value')

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
    for i in range(0,len(table_data)):
        if table_data[i]['table_no'] == my_table and table_data[i]['active'] == True:
            if table_data[i]['remained_likes'] > 0:
                table_data[i]['remained_likes'] -= 1
            else:
                return 'no likes left'
            break
    for j in range(0,len(table_data)):
        if table_data[j]['table_no'] == received_table and table_data[j]['active'] == True:
            table_data[j]['received'].append(my_table)
            break
    
    write_json_file('table.json',table_data)

# def send_like(my_table, table_list): # table_list = table numbers (list)
#     with open('table.json', "r", encoding="utf-8") as f:
#         table_data = json.load(f)
#     if table_list != []:
#         for i in range(0,len(table_data)):
#             if table_data[i]['table_no'] == my_table and table_data[i]['active'] == True:
#                 if table_data[i]['remained_likes'] > 0:
#                     table_data[i]['remained_likes'] -= 1
#                 else:
#                     return 'no likes left'
#                 break
#         for table in table_list:
#             for j in range(0,len(table_data)):
#                 if table_data[j]['table_no'] == table and table_data[j]['active'] == True:
#                     table_data[j]['received'].append(my_table)
#                     break
    
#     write_json_file('table.json',table_data)

### block
def block_table(my_table, received_table):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    for i in range(0,len(table_data)):
        if table_data[i]['table_no'] == my_table and table_data[i]['active'] == True:
            table_data[i]['blocks'].append(received_table)
            break
    
    write_json_file('table.json',table_data)

### join
def join_table(from_where, to_where):
    with open('table.json', "r", encoding="utf-8") as f:
        table_data = json.load(f)
    for i in range(0,len(table_data)):
        if table_data[i]['table_no'] == from_where:
            table_data[i] = reset_table(table_data[i]['table_no'])
            break   
    for j in range(0,len(table_data)):
        if table_data[j]['table_no'] == to_where:
            table_data[j]['join'] = True
            break

    write_json_file('table.json',table_data)