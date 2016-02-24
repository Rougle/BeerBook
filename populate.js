db = connect("localhost:27017/guitarshop") 
user = { username : "Zaky", password : "secret" role : "user" }

db.users.insert( user )
