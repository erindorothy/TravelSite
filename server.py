from flask import Flask, request, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    location = request.form.get('location')
    interests = request.form.get('interests')

    with open('results.txt', 'a') as f:
        f.write(f'Location: {location}\nInterests: {interests}\n\n')

    return 'Success'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
