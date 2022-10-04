 <img src="https://github.com/BreaBang/100/raw/main/WTRW.gif">
 
# Write to Run Well
Write to Run Well is a full stack running web application where runners can log their training, races and goals. Users can create public or private journal entries and read public journal entries of other runners. 

## Tech Used
This app was created using Javascript, EJS, MongoDB, Mongoose, Bootstrap, Node.js, Express.js, Passport, BCRPYT and Render. 

## Lessons Learned
Building this application gave me a chance to dive deep into MVC architecture. I struggled a lot at first with setting up correct routes to my controllers and figuring out which routes needed to go to the main file and which needed to go into the specific function's route folder.

While building this application I learned to use Bootstrap for the first time. Bootstrap made it easy to have consistency across the pages. 

Other things I learned:

- What Passport is and how to use the local strategy for application logins.
- I got more practice using Mongoose Schema's and implementing them throughout the code to collect data to send to the MongoDB database.
- More practice rendering information from the database into the EJS views. 

## Things I'm Still Working on

I am still in the process of building out the following features:

- The ability to edit journal entries.
- The ability to mark goals and races as completed. 
- Indiviual public user profiles that show a user's public stories and a profile photo.
- Add the ability to search for users and add them to a "team" or "club" so that users who know eachother can see eachother's public entries.
- I'd like to add a few more Passport strategies so users could login with Twitter, Google, Facebook and other apps. 
- I want to make adding a photo to a post available but optional. In my original code I had the photo upload but it would not submit without the photo.
- An About section for the app.
