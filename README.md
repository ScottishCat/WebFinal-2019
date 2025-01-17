# Project Report

## Project Name : Yummy, a Yelp clone

## Team Member :

Zhiyu Shen ([zhs56@pitt.edu](mailto:zhs56@pitt.edu)), Tong Wang ([tow19@pitt.edu](mailto:tow19@pitt.edu)), Wenting Wang ([wew77@pitt.edu](mailto:wew77@pitt.edu)), Sweta Bhupendra Rawal ([swr22@pitt.edu](mailto:swr22@pitt.edu))

## 1. Introduction

This is a web application called “Yum, a yelp clone” which has two different version (Customer & Business). It provides service for users to search for business and create reviews on businesses, also allows business holders to create a new business, update or delete it, and check customer reviews for its business.

## 2. Objective

### 2.1 User (Customer) Version:
=======
## Team Member : 

Zhiyu Shen (zhs56@pitt.edu), Tong Wang (tow19@pitt.edu), Wenting Wang (wew77@pitt.edu), Sweta Bhupendra Rawal (swr22@pitt.edu)

## 1. Introduction

This is a web application called “Yum, a yelp clone” which has two different version (Customer & Business). It provides service for users to search for business and create reviews on businesses, also allows business holders to create a new business, update or delete it, and check customer reviews for its business. 

## 2. Objective

### 2.1 User (Customer) Version: 
>>>>>>> e543c850970ee7ecb6c15a01b486a2adb64d2d58

There are some functions for customer version.

- Search businesses by name;
- Browse businesses those have top 5 review counts by city
- Sign up/login in
- User login in with Google OAuth
- Browse the business and its reviews
- Create, or delete a review for a specific business, update the user review count, business review counts, business stars at the same time

### 2.2 User (not Customer) Version:

- Browse its reviews

## 3. Team member's contributions

### 3.1 User Frontend (Zhiyu Shen)

- There are 2 kind of uers, member user and not member user. This two kind of users user different pattern on our website
<<<<<<< HEAD
- Choosing mobile first strategy to design web page. Start sketching and prototyping the smallest screen first and work our way up to larger screens.

#### 3.1.1 Login in/ Sign in Page

- Email validation
- User Token used to retrieve user indentity

#### 3.1.2 Main page

- Main page includes search bar, gallery and top business by city
- For visitors and users, the top bar shows in different way

#### 3.1.3 Search page

- Searching business by name (Note: Fuzzy search is not supported, you have to type in business name correctly, I provided a list of business for test below)
- testing lists:

1. tara (few reviews, good example for testing the effect of reviews on business average stars)
2. The UPS Store
3. Baby Cakes
4. Taco Bell
5. Marco's Pizza

#### 3.1.4 Detail page

- Show business information like name, ratings, address, hours and recommended reviews for this business
- Google Map API is used for locating business

#### 3.1.5 Profile page

- Users can browse all reviews they made and delete them

#### 3.1.5 Review page

- Visitors can only browse reviews.
- Users can write reviews after login.

### 3.2 User Backend (Tong Wang)

#### 3.2.1 APIs for user

- POST(‘/login’) : user login and validation identity
- POST(‘/signup’) : user signin, save new user into databse
- POST(‘/byBname’) : userpage search business by business name

#### 3.2.2 APIs for photo

(real photo is not used in the submitted version for Glitch does not support batch upload of images)

- POST(‘/photoId’) : find photoId by business_id
- GET(‘/photo/:photo_id’) : get photo by photoID
- GET(/photo/:business_id): Get all photos for a specific Business
- POST(photo): Create a new phone for a specific photo
- PUT(/photo/:id): Update a specific photo
- DELETE(/photo/:id): Delete a specific photo

#### 3.2.3 APIs for review

- GET(/review/business/:business_id): get Reviews by a specific business
- GET(/review/user/:uid): get Reviews by a specific user
- GET(/review/id/:rid): reviews by a review_id
- POST(newReview): create a new review, update user review count and business review count
- DELETE(/reviewD/:rid): user delete a review and update the review count in user review_counts and business review_counts

### 3.3 User(not member) (Wenting Wang)

#### 3.3.1 Apis for business

- POST(/cityB): Find 5 business by city name, sort by review counts
- GET(/business): GET all business information, limit 5
- GET(/business/id/:business_id): GET a specific business, Business Login System
- PUT(/business): UPDATE a specific business, just name, address, city, state, hour, is_open could be updated

### 3.4 Frontend(Sweta Bhupendra Rawal)

## 4. Technical Architecture

### 4.1 Front-end

#### 4.1.1 Customized interface and service for different users

Visitors should not have the permission to write reviews. Users who signed in should be able to view the reviews they made through profile pages.

#### 4.1.2 Web forms for signup, login, and allow user to create review

The signup/login page, and the page for user to write a review are listed above.

#### 4.1.3 React

We used React as our front-end framework and use Axios to fetch data from database through RESTful web service API.

#### 4.1.4 Material-UI

In order to get responsive and consistent design, we chose Material-UI(Similar to Bootstrap). We can create responsive pages easily with predefined React Components in Material-UI

#### 4.1.5 Populate with application with data

User can search a specific business with business name, and also, users can browse businesses categorized by cities.

### 4.2 Backend

#### 4.2.1 MVC structure using Node

We seperate the web application into 3 parts: model, view and controller. We chose MongoDB as our database to save data, React for the view part, and Node.js for the controller. We sets different api endpoints to call functions. All endpoints are listed above.

#### 4.2.2 MongoDB (Database)

Our database is 8 GB. We uploaded to MongoDB cloud. We created 4 data models in Mongoose:

- BusinessSchema
- PhotoSchema
- ReviewSchema
- UserSchema

We used yelp dataset which contains 6,685,900 reviews, 192,609 businesses and 200,000 pictures links to the dataset: <https://www.yelp.com/dataset>

*Reference: Yelp stars images are used in our project. Links: https://www.yelp.com/developers/display_requirements*

#### 4.2.3 Log-in and Sign-up

How we deal with login & signup:

```
router.post('/login', function(req, res){
   User.findOne({email : req.body.email}, function(err, u) {
   const reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!reg.test(req.body.email)) {
    res.json({ ret_code: 2, msg: "invalid email" });
  }
        //console.log(req.body)
        if (err){
            res.json({err:err})
        } 
        else if (u){
            let id = u['_id']
            if (u.password === req.body.password) {
                console.log(id)
                res.cookie('userId', id,{
                    maxAge: 6*100000,
                    httpOnly: false
                }).json({ret_code: 0, id : id})
            }
            else res.json({ret_code: 1, ret_msg: 'password is not correct, try again!'});
        }
        else{
            res.json({ret_code: 2, msg: 'Invalid Email!'})
        }
      })
});
```

#### 4.2.5 Session management capabilities for managing

After logining the system as user, we saved user_id in cookie, and transfer it between pages.

#### 4.2.6 RESTful Web Service API for CRUD operations

We created lots of RESTful Web Service API for 4 models: business, photo, user and review. All API are listed above.

## 5. Challenges

### 5.1 Deploy Client Side and Server Side on different Computer

We use Cross-origin resource sharing (CORS) to allow Client side on one computer to request data from server side on another computer.

### 5.2 Read Pics from Local Storage

For the Yelp dataset, the pics of business are saved in a file. Thus, we have to read pics from the local storage. The name of pics are the same with photo_id in photo collection. Thus, we need to set:

```
router.get('/photo/:photo_id', function(req, res){
    const PATH = '/Users/tongw/Downloads/yelp_photos/photos/'
     res.sendFile(`${PATH}${req.params.photo_id}.jpg`)
     console.log(req.params.photo_id)
})
```

## 6. Future Work

There are still a lot of work for us to do. For example, we need to Integrate Google OAuth in the System. We just get email address in our cookie, what we should do next is to compare the email in the cookie with email in our user collection. If the email exists in our user collection, we will respond with all information of this user. While the email does not exist in our data, we will create a new customer in our user collection with information: name, emails. And when this new customer login in with Google OAuth next time, we will respond with all previous information of this user.

## 7. Conclusion

### 7.1 React is a good choice for the front end but not easy to use

For the front-end UI design, React is a good choice. It facilitates the overall process of writing components. Web application is composed of different components. React divided components into different pages, which makes every component to be manageable. At the same time, react is not easy for fresher since learners have to be more familiar with the structure of react file.

### 7.2 CORS

In the creation, We used CORS to deploy different cross-site HTTP requests, and use fetch APIs for our front end. In this way, front-end and backend could develop at the same time on different computers. This is a good way for web application distributed development.

## 8. Documentation

- Alex B., Eve P. (2017), Learning React: Functional Web Development with React and Redux. Retrieved from <https://www.imel.ba/edukacija/learningreact1.pdf>.
- Fetching API Data with React.JS. (2017, August). Retrieve December 10, 2019, from <https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2>.
- How to fetch data in React. (2018, July). Retrieve December 10, 2019, from <https://www.robinwieruch.de/react-fetching-data>.
- React: A JavaScript library for building user interfaces. (2019, December). Retrieve December 10, 2019, <https://reactjs.org/>.
- Subbu A. (2010), RESTful Web Services Cookbook. Retrieved from <http://webapps.me.uk/download.php?f=restful-web-services-cookbook.pdf>.
=======
- Choosing mobile first strategy to design web page. Start sketching and prototyping the smallest screen first and work our way up to larger screens. 

#### 3.1.1 Login in/ Sign in Page 
- Email validation
- User Token used to retrieve user indentity

#### 3.1.2 Main page
- Main page includes search bar, gallery and top business by city
- For visitors and users, the top bar shows in different way
#### 3.1.3 Search page
- Searching business by name (Note: Fuzzy search is not supported, you have to type in business name correctly, I provided a list of business for test below)
- testing lists: 
1. tara (few reviews, good example for testing the effect of reviews on business average stars)
2. The UPS Store
3. Baby Cakes
4. Taco Bell
5. Marco's Pizza
#### 3.1.4 Detail page
- Show business information like name, ratings, address, hours and recommended reviews for this business
- Google Map API is used for locating business
#### 3.1.5 Profile page
- Users can browse all reviews they made and delete them
#### 3.1.5 Review page
- Visitors can only browse reviews. 
- Users can write reviews after login.

### 3.2 User Backend (Tong Wang)

#### 3.2.1 APIs for user 

- POST(‘/login’) : user login and validation identity
- POST(‘/signup’) : user signin, save new user into databse
- POST(‘/byBname’) : userpage search business by business name

#### 3.2.2 APIs for photo 
(real photo is not used in the submitted version for Glitch does not support batch upload of images)

- POST(‘/photoId’) : find photoId by business_id
- GET(‘/photo/:photo_id’) : get photo by photoID
- GET(/photo/:business_id): Get all photos for a specific Business
- POST(photo): Create a new phone for a specific photo
- PUT(/photo/:id): Update a specific photo
- DELETE(/photo/:id): Delete a specific photo

#### 3.2.3 APIs for review

- GET(/review/business/:business_id): get Reviews by a specific business
- GET(/review/user/:uid): get Reviews by a specific user
- GET(/review/id/:rid): reviews by a review_id
- POST(newReview): create a new review, update user review count and business review count 
- DELETE(/reviewD/:rid): user delete a review and update the review count in user review_counts and business review_counts

### 3.3 User(not member) (Wenting Wang)

#### 3.3.1 Apis for business

- POST(/cityB): Find 5 business by city name, sort by review counts
- GET(/business): GET all business information, limit 5
- GET(/business/id/:business_id): GET a specific business, Business Login System
- PUT(/business): UPDATE a specific business, just name, address, city, state, hour, is_open could be updated


### 3.4 Frontend(Sweta Bhupendra Rawal)


## 4. Technical Architecture

### 4.1 Front-end

#### 4.1.1 Customized interface and service for different users

Visitors should not have the permission to write reviews. Users who signed in should be able to view the reviews they made through profile pages.

#### 4.1.2 Web forms for signup, login, and allow user to create review

The signup/login page, and the page for user to write a review are listed above.

#### 4.1.3 React

We used React as our front-end framework and use Axios to fetch data from database through RESTful web service API.

#### 4.1.4 Material-UI

In order to get responsive and consistent design, we chose Material-UI(Similar to Bootstrap).
We can create responsive pages easily with predefined  React Components in Material-UI

#### 4.1.5 Populate with application with data

User can search a specific business with business name, and also, users can browse businesses categorized by cities.

### 4.2 Backend

#### 4.2.1 MVC structure using Node

We seperate the web application into 3 parts: model, view and controller. We chose MongoDB as our database to save data, React for the view part, and Node.js for the controller.
We sets different api endpoints to call functions. All endpoints are listed above.

#### 4.2.2 MongoDB (Database)


Our database is 8 GB. We uploaded to MongoDB cloud. We created 4 data models in Mongoose:

- BusinessSchema
- PhotoSchema
- ReviewSchema
- UserSchema

We used yelp dataset which contains 6,685,900 reviews, 192,609 businesses and 200,000 pictures
links to the dataset: https://www.yelp.com/dataset

*Reference: Yelp stars images are used in our project. Links: https://www.yelp.com/developers/display_requirements*

#### 4.2.3 Log-in and Sign-up 

How we deal with login & signup:

```
router.post('/login', function(req, res){
   User.findOne({email : req.body.email}, function(err, u) {
   const reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!reg.test(req.body.email)) {
    res.json({ ret_code: 2, msg: "invalid email" });
  }
        //console.log(req.body)
        if (err){
            res.json({err:err})
        } 
        else if (u){
            let id = u['_id']
            if (u.password === req.body.password) {
                console.log(id)
                res.cookie('userId', id,{
                    maxAge: 6*100000,
                    httpOnly: false
                }).json({ret_code: 0, id : id})
            }
            else res.json({ret_code: 1, ret_msg: 'password is not correct, try again!'});
        }
        else{
            res.json({ret_code: 2, msg: 'Invalid Email!'})
        }
      })
});
```

#### 4.2.5 Session management capabilities for managing

After logining the system as user, we saved user_id in cookie, and transfer it between pages.

#### 4.2.6 RESTful Web Service API for CRUD operations

We created lots of RESTful Web Service API for 4 models: business, photo, user and review. All API are listed above.

## 5. Challenges

### 5.1 Deploy Client Side and Server Side on different Computer

We use Cross-origin resource sharing (CORS) to allow Client side on one computer to request data from server side on another computer.

### 5.2 Read Pics from Local Storage

For the Yelp dataset, the pics of business are saved in a file. Thus, we have to read pics from the local storage. The name of pics are the same with photo_id in photo collection. Thus, we need to set:

```
router.get('/photo/:photo_id', function(req, res){
    const PATH = '/Users/tongw/Downloads/yelp_photos/photos/'
     res.sendFile(`${PATH}${req.params.photo_id}.jpg`)
     console.log(req.params.photo_id)
})
```

## 6. Future Work

There are still a lot of work for us to do. For example, we need to Integrate Google OAuth in the System.
We just get email address in our cookie, what we should do next is to compare the email in the cookie with email in our user collection. If the email exists in our user collection, we will respond with all information of this user. 
While the email does not exist in our data, we will create a new customer in our user collection with information: name, emails. And when this new customer login in with Google OAuth next time, we will respond with all previous information of this user.

## 7. Conclusion

### 7.1 React is a good choice for the front end but not easy to use

For the front-end UI design, React is a good choice. It facilitates the overall process of writing components. Web application is composed of different components. React divided components into different pages, which makes every component to be manageable. At the same time, react is not easy for fresher since learners have to be more familiar with the structure of react file.

### 7.2 CORS 

In the creation, We used  CORS to deploy different cross-site HTTP requests, and use fetch APIs for our front end. In this way, front-end and backend could develop at the same time on different computers. This is a good way for web application distributed development.

## 8. Documentation

- Alex B., Eve P. (2017), Learning React: Functional Web Development with React and Redux. Retrieved from https://www.imel.ba/edukacija/learningreact1.pdf.
- Fetching API Data with React.JS. (2017, August). Retrieve December 10, 2019, from https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2.
- How to fetch data in React. (2018, July). Retrieve December 10, 2019, from https://www.robinwieruch.de/react-fetching-data.
- React: A JavaScript library for building user interfaces. (2019, December). Retrieve December 10, 2019, https://reactjs.org/.
- Subbu A. (2010), RESTful Web Services Cookbook. Retrieved from http://webapps.me.uk/download.php?f=restful-web-services-cookbook.pdf.











>>>>>>> e543c850970ee7ecb6c15a01b486a2adb64d2d58
