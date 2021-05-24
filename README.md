# Assignment2
# Project Title
```
eCommerce Web Application
 
```
## Description
```
This web application using nodejs, mongodb and vue,
user have account and can create and manage phonelisting
user can buy phone and sell phone
user can search phone and add to the cart
 
```

## Getting Started
### How to setup project
```
After installing the source code, open it in the IDE, change the directory to login server and run npm install
open another terminal and type npm install.

```
### How to run project 
```
Open IDE, change the directory to login server and type command node app.js, so the server will be run. 
Then open a new terminal, type command npm run serve and then open localhost//8080.
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### realize the userpage profile function by node+express+CloudMongoDB and html as an optional method
```
after pull the userpage branch
you can start install the node packge by run teminal and commond node install.js

then you can star the back-end service 
first switch to controller catogory using commond:
cd controller
and then start router by using common:
node routerController.js 
the default listen port is:8080

then you can start the front end, and it is recommon to star and split new terminal and using commond :
live-server 

if success you can see a web browser pomt out and the address is loalhost:8080

this part of function did not connect to the main page function which is supposed to storage the userID
in sesstion storage, therefore we need to track the UserId manually

for testing, you can choose UserId from database for example the User Holli Moore's UserId is 5f5237a4c1beb1523fa3da03
you can paste the "5f5237a4c1beb1523fa3da03" to the first text bar and click go button, and the onclick function will trigger router function 
to load user profile information from cloud MongoDB, so this may take sometime as it will use mongo findone function to 
track user data from cloud, and then, shows user's default infromation: first name, last name and email.

if you want to update the user profile information, just type the new profile infor in the testbar you want to change 
and click "Update Profile" and the broswer will prompt the text bar to require the current user password, this is realize by using 
if statement to check prompt.value whether it match the MD5 value of password which is storaged in seesion in load user profile function

you can change password by click password button, and it will load change password.html in the same page
and you can text your current and new password in the textbar which is password type
then click the update password to confirm, if your previous password is correct it will alert success feedback.

these User profile functions follows the MVC model
the load user profile function and change passwrod function have relevant router and share the same modle:
EditProfileMode.js as the communication with mogodb is in the similar way, it returen the object UserInform
then render the UserInfromation in each html page follow the relevant controllor.

```
