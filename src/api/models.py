from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), unique=False, nullable=False)
    salt = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def add_and_commit(self):
        try:
            db.session.add(self)
            db.session.commit() 
            return True
        except error:
            db.session.rollback()
            return False

    @classmethod
    def create(cls, body):
        try:
            if not body.get("username"):
                raise Exception({
                    "msg": "You must set a username",
                    "status": 400
                })
            username_exist = cls.query.filter_by(username = body["username"]).one_or_none()
            if username_exist:
                raise Exception({
                    "msg": "This username is already taken. Try another one",
                    "status": 400
                })
            
            if not body.get("email"):
                raise Exception({
                    "msg": "You must write a valid email",
                    "status": 400
                })
            email_exist = cls.query.filter_by(email = body["email"]).one_or_none()
            if email_exist:
                raise Exception({
                    "msg": "You must write a valid email",
                    "status": 400
                })
            new_user = cls(username= body["username"], email= body["email"])
        except Exception as error:
            return ({
                "msg": "Something went wrong"
            })
