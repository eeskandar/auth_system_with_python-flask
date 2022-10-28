"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import os, bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)


@api.route('/sign-up', methods=['POST'])
def register_user():
    body = request.json
    unrefined_salt = bcrypt.gensalt()
    salt = unrefined_salt.decode()
    hashed_password = generate_password_hash(f'{body["password"]}{salt}')

    if not body.get("username"):
        return jsonify({
            "msg": "Invalid username"
        }), 400
    username_exist = User.query.filter_by(username = body["username"]).one_or_none()
    if username_exist:
        return jsonify({
            "msg": "Username already taken"
        }), 400
    
    if not body.get("email"):
        return jsonify({
            "msg": "Invalid email",
        }), 400
    email_exist = User.query.filter_by(email = body["email"]).one_or_none()
    if email_exist:
        return jsonify({
            "msg": "Invalid email",
        }), 400

    new_user = User(
        username = body["username"],
        email = body["email"],
        password = hashed_password,
        salt = salt,
        is_active = True
    )

    if not isinstance(new_user, User):
        return jsonify({
            "msg": "Server error"
        }), 500

    saved = new_user.add_and_commit()

    if saved is False:
        return jsonify()({
            "msg": "Data Base error"
        }), 500

    response_body = {
        "message": "New user created!",
        "username": new_user.username
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def log_user():
    body = request.json
    user = User.query.filter_by(email = body["email"]).one_or_none()
    if user is None:
        return jsonify({
            "msg": "Email or password invalid"
        }), 400

    valid_password = check_password_hash(user.password, f'{body["password"]}{user.salt}')
    if not valid_password:
        return jsonify({
            "msg": "Email or password invalid"
        }), 400

    access_token = create_access_token(identity=user.id)
    response_body = {
        "msg": "Welcome back, " + user.username,
        "id": user.id,
        "username": user.username,
        "token": access_token
    }

    return jsonify(response_body), 200


@api.route('/user/<int:userid>')
@jwt_required()
def get_user(userid):
    user = get_jwt_identity()
    get_user = User.query.get_or_404(userid)
    
    response_body = {
        "id": get_user.id,
        "username": get_user.username,
        "email": get_user.email
    }

    return jsonify(response_body), 200