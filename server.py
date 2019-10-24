from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():
    row_num = int(request.args.get('board-size', 10))
    col_num = 2 * row_num
    turn_num = int(request.args.get('turn-number', 5))
    start_cells = int(request.args.get('starting-cells', 4))
    return render_template('game.html', row_num=row_num, col_num=col_num, turn_num=turn_num, start_cells=start_cells)


if __name__ == '__main__':
    app.run(debug=True)
