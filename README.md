# How to run this Project

- Install the packages used in React  
  In the base project directory execute this command

```javascript
npm install
```

- Install the packages used in Django

```python
pip install -r requirements.txt
```

- Go to "backend" folder and in settings.py file, in DATABASES dictionary provide your password for the superuser set in postgres
```python
cd backend

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dbteebay',
        'USER': 'postgres', 
        'PASSWORD': <SUPER USER PASSWORD>,
        'HOST': 'localhost', 
        'PORT': '5432',
    }
}
```


- Create a Database in postgres GUI titled **"dbteebay"**  
postgres and pgadmin was used in this project



- Run Migrations

```
py manage.py makemigrations
py manage.py migrate
```

- Start Django Server

```
py manage.py runserver
```

- Start React Server

```javascript
cd ../
npm start
```
