### generate table token
# import uuid
# import json
# tokens = {}

# def generate_token(user_data):
#     token = str(uuid.uuid4())
#     tokens[token] = user_data

# for i in range(1,41):
#     generate_token(i)

# with open('table_token.json', "w", encoding="utf-8") as f:
#     json.dump(tokens, f)

### generate qr code
# import qrcode
# def create_qc(token):

#     url = f"http://www.heba/table/{token}"

#     # QR 코드 생성
#     qr = qrcode.QRCode()
#     qr.add_data(url)
#     qr.make(fit=True)

#     # 이미지 파일로 저장
#     image = qr.make_image()
#     image.save("qrcode.png")

#########################################################

from flask import Flask, request, render_template, session, redirect
import json
import os
import controller
from datetime import timedelta

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
# app.permanent_session_lifetime = timedelta(minutes=90)

with open('table_token.json', "r", encoding="utf-8") as f:
    qr_data = json.load(f)

@app.route('/table/<token>') 
def handle_token(token):
    table_info = controller.get_table(controller.get_table_no_by_token(token))

    if table_info['active']:
        return render_template('index.html', token=token, table_info=table_info)
    else:
        return render_template('input.html', token=token, table_info=table_info)    

@app.route('/hunting', methods=["POST"])
def input():
    if not request.form.get('gender'):
        token = request.form.get('token')
        table_info = controller.get_table(controller.get_table_no_by_token(token))

        if table_info['active']:
            return render_template('hunting.html', table_info=table_info)
        else:
            return render_template('input.html', token=token)    
    else:
        token = request.form.get('token')
        table_no = controller.get_table_no_by_token(token)
        count = int(request.form.get('count'))
        gender = request.form.get('gender')

        controller.set_table(table_no, count, gender)

        # session[str(table_no)] = token
        # session.permanent = True
        # print(session)

        table_info = controller.get_table(table_no)
        
        return render_template('hunting.html', table_info=table_info)

if __name__ == '__main__':
    app.run(debug=True)
