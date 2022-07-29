# Introduction

**Teebay** is a simple buying and renting online web application which contains a front end(FE) , a back end (BE) and a database (DB)

### Features

1. **User Authentication (Registration,Login,Logout,Update)**
1. **Browse/Search for Products**
1. **Add,Update,Delete Product**
1. **Buy,Rent Product**

Also, display all the products bought,sold or rented by an user.

### Technologies Used

- **FE** - React
- **BE** - Django
- **DB** - Postgres

Besides these, React Bootstrap and custom CSS was used for styling purpose, Redux was used for state management, Django Rest Framework was used to build APIs. For fetching the data from backend, Axios library was used.

# Feature Implementation

## 1. User Authentication

To save all the users in the database Django's built in User model was used. It provides field such as **first_name,last_name,email,password,username** etc.

- **Register User**  
  To register an user, his **Name,email,password** will be send to the backend. In the built in User model, user's name will be store in the User models first_name field and his email will be store as his username. Because an user must log in with email. Therefore, user with same email address cannot register twice because username field is a unique field in the User model. Also, when an user registers, he will be automatically logged into the system.

* **Login**  
  An user must login with his email and password. Now, to authenticate an user **JSON Web Tokens** were used, to be specific Django's **Simple JWT** plugin was used. As soon as a user logs in, he will be given a token and it will last for a certain amount of time so that he can access the pages that requires authentication. For this project, the token validity was change to 20 days. Also, users credentials were stored in the localstorage so that every time he refreshes the page, he remains logged in

* **Logout**  
  When an user logs out, his credentials stored in the localstorage will be deleted and he will be logged out.

* **Update**  
  An authenticated user can update his credentials and send those information to the backend.

## 2. Browse Products

Any user, whether he is logged in or not, can search for products. He can search based on multiple criterias. To check for those criterias , in the backed _Q_ object was used. It was provided all the criterias an user may give and outputs results accordingly.
From there, user can purchase or rent any product.

## 3. Add, Update, Delete Products

- **Add Product**  
  Only an authenticated can send request to the backend to add a product. He must provide the name of the product,price,rent price and duration. A product can be under one or more category so he can provide multiple category to a product. To handle that, in the **Product** model category field was set as a _ManyToManyField_ field.
  Besides an user an add multiple products. That is why user field in the **Product** model was set as a foreign key.

* **Update Product**  
  Only the user who posted a product can update its information. Other users can view that product but they cannot edit the informaton.

* **Delete Product**  
  Similary, only the one who posted a particular product can delete that product.

## 4. Buy/Rent Products

Only an authenticated user can make a purchase or rent a product. No payment gateway was implemented in order to fully make that buy/rent feature functional. But if an user, clicks on the Buy button, a modal will appear on the screen and after confirmation that product will be added. Same thing will happen for rent option. There will be start date and an end date and user can rent that product. But, a user cannot buy or rent a product that he himself posted. If a user makes a purchase, there will be two requires executed simultaneously, one query will add that user as a buyer for that product and another query will insert the user who posted that product as a seller.Finally, an user cannot buy a product multiple times. To take care of it in the backend query _get_or_create_ was implemented.

# Conclusion

This application can be made even better by using other libraries for styling such as _Material UI,Semantic UI_. Using React Form hooks/Formik could have been used. Implementing a payment gateway would make this system more compact.
