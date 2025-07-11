# What is this project

This project is a full-stack web application developed as a bachelor's project, using **Django** for the backend and **React** for the frontend, communicating via **Django REST framework**.
It allows users to browse events, save them as favorites if logged in, and create/delete them if they are an authorized organization.

## Setting up the environment
This project uses **PostgreSQL** as a database.
If you don't have it installed yet, see the official [PostgreSQL website](https://www.postgresql.org/) for installation instructions.
Once installed, you'll need to initialize a database - refer the [official documentation](https://www.postgresql.org/docs/) on how to setup a database, user and password.
After setting up your database navigate to the `backend` folder:
```
cd backend
```
Create a file called `local_auth.py` in the `backend` directory with your database credentials and Django secret key
Here is an example of what it should look like:

```
  SECRET_KEY = 'django-insecure-...the rest of your key'
  
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'name of the database',
          'USER': 'name of the database owner',
          'PASSWORD': 'password of the database',
          'PORT': '5432',
      }
  #The following fields are needed for sending the e-mails. we're using dummy credentials created for this website
  EMAIL = 'weloveevents00@gmail.com'
  EMAIL_PASSWORD = 'jdrj fkvo wypr wozp'
  }
```

Don't change the names of these variables, they are already imported in `settings.py`. For more help on configuring PostgreSQL with Django, refer to the [Django documentation](https://docs.djangoproject.com/en/5.2/ref/databases/#postgresql-notes).

## How to run the project

It is reccomended to use a [virtual environment](https://docs.python.org/3/library/venv.html) to avoid dependencies conflicts

### Backend 

Change directory into `backend`:

```cd backend```

Create a virtual envronment and activate it:

```
python3 -m venv venv
```
Install all the backend dependencies (some may be missing from this list):

```
pip install Django, djangorestframework, django-cors-headers, djangorestframework-simplejwt, sqlparse ,psycopg2-binary
```
if you're using windows install also 
```
pip install pillow
```
Apply migrations to set up the database tables:

```
python manage.py makemigrations
python manage.py migrate
```

You may want to create a super user to have access to the admin panel, in that case run the command:

```
python manage.py createsuperuser
```

Run the backend server (the backend server should always be running to serve as an API to the frontend)
```
python manage.py runserver
```
The backend API should now be running at **http://localhost:8000**

If everything's working correctly it's time to configure the frontend 

### Frontend

**Node.js** is necessary for using react so if haven't installed it already refer to [Download Node.s](https://nodejs.org/en/download).

Change directory into the `frontend`:
```
cd frontend
```
Install all the frontend dependencies:
```
npm install
# If jwt-decode is missing try to download it manually with npm install jwt-decode
```
Start the frontend development server:
```
npm start
```

The React app should now be running at **http://localhost:3000** 

## Notes
You should keep both backend and frontend servers running simultaneously while working on the project.

Use the Django admin panel at http://localhost:8000/admin for managing users, events, and favorites.

To send a mail from the terminal run the command 
```
manage.py send_mail_event_favourite_reminders
```

## Contact 
If you have any questions or want to contribute, feel free to open an issue or contact me directly.

