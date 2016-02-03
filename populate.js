db = connect("localhost:27017/guitarshop") 
user = { name : "Zaky", role : "user" }

db.users.insert( user )
