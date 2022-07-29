# How to run this Project

- Activate the virtual environment  
  In the base project directory execute this command

```
env\scripts\actiavte
```

- Install the packages used in React  
  In the base project directory execute this command

```javascript
npm install
```

- Install the packages used in Django

```python
pip install -r requirements.txt
```

- Create a Database in postgres GUI titled **"dbtreebay"**

- Run Migrations

```
cd backend
py manage.py makemigrations
py manage.py migrate
```

- Start Django Server

```
py manage.py runserver
```

- Start React Server

```javascript
npm start
```
