from flask_app import *
import managers
import clients
import controller
import atexit

def save_datas():
    controller.write_table_data()
    print('All datas are saved safely.')


def create_app():
    atexit.register(save_datas)
    print('start server')
    #sio.run(app, host='0.0.0.0')
    return app

if __name__ == '__main__':
    create_app().run(host='0.0.0.0')
    # create_app().run(debug=True)
