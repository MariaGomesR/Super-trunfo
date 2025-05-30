from flask import Flask, redirect, render_template, request, jsonify
import random

app = Flask(__name__)

cartas = [
    {"nome": "Sailor Moon", "imagem": "/static/assets/carta.png", "ataque": 80, "defesa": 70, "magia": 90},
    {"nome": "Sailor Mercury", "imagem": "/static/assets/sailor_4.png", "ataque": 60, "defesa": 85, "magia": 75},
    {"nome": "Sailor Mars", "imagem": "/static/assets/sailor_3.png", "ataque": 90, "defesa": 65, "magia": 80},
]


@app.route('/')
def incio():
    return render_template('index.html')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/hist')
def som():
    return render_template('hist.html')

@app.route('/play')
def play():
    return render_template('play.html')

@app.route('/sortear_cartas')
def sortear_cartas():
    random.shuffle(cartas)
    jogador = cartas[:3]
    computador = cartas[3:6]
    return jsonify({"jogador": jogador, "computador": computador})



app.run(host='000.0.0.0', port=5000, debug=True) 