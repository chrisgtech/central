from flask import Flask, jsonify, render_template
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost:5777/centraldb' 
#db = SQLAlchemy(app)

@app.route('/')
@app.route('/index')
def index():
    return render_template('main.html', title='Redirect')


@app.route('/data')
def names():
    data = {
        "first_names": ["John", "Jacob", "Julie", "Jenny"]
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
