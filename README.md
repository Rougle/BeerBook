# BeerBook

    BeerBook is a beer rating app. Visitors are free to view beers, comments and ratings, while registered users are also able to rate and comment those beers. Right now only admins have right to add new beers to the service.

    By selecting "Beers" from the top navigation, you can list all beers. By clicking one beer from the list, you'll be able to view the description and comments and ratings left by users. From the navigation bar at the top of the page you can register or login. If you are already logged in you can also view and edit your profile.

    Authentication is done using passport.js and jwt tokens. Passwords are hashed using crypto. Additional security has been added with helmet. If the app is to be deployed, it would be smart to enable helmets content security policy. Also one should set secrets in app.js and user model to something else than "secret".

    Admins are able to delete comments and CRUD beers and users. To make admin account you'll need to stab the profile into the database or POST it to server API. 

    BeerBook was developed using MongoDB (and Mongoose), Express.js, AngularJS and Node.js. It also uses various plugins like ngFileUpload, angular-translate and angular-feeds. 
