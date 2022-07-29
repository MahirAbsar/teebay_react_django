# Introduction

**Teebay** is a simple buying and renting online web application which contains a front end(FE) , a back end (BE) and a database (DB)

# Features

1. **User Authentication (Registration,Login,Logout,Update)**
1. **Browse/Search for Products**
1. **Add,Update,Delete Product**
1. **Buy,Rent Product**

Also, display all the products bought,sold or rented by an user.

### Technologies Used

- **FE** - React
- **BE** - Django
- **DB** - Postgres

Besides these, React Bootstrap and custom CSS was used for styling purpose, Redux was used for state management, Django Rest Framework was used to build APIs.

# Feature Implementation

## 1. User Authentication

To save all the users in the database Django's built in User model was used. It provides field such as **first_name,last_name,email,password,username** etc.

- **Register User**  
  To register an user, his **Name,email,password** will be send to the backend. In the built in User model, user's name will be store in the User models first_name field and his email will be store as his username. Because an user must log in with email. Therefore, user with same email address cannot register twice because username field is a unique field in the User model
