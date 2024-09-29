# Event Management System

This project is an **Event Management System** with both user and admin functionalities. It allows users to register, log in, and register for events, while administrators can manage events through CRUD operations. The system is built with Django for the backend and React for the frontend, using JWT for authentication.

## Features

- **User Registration and Authentication**: Users can register and receive an OTP verification email. After logging in using their credentials, they are authenticated using JWT tokens.

- **User Dashboard**: Once logged in, users can access their dashboard, where they can:
  - **Register for Events**: Users can view available events and register. Upon successful registration, they receive a confirmation email.
  - **Capacity Check**: If an event reaches its maximum capacity, users will be prevented from registering for that particular event.
  - **View Registered Events**: Users can see a list of events they have successfully registered for.

- **Admin Control**: Admins have full control over managing events, including creating, reading, updating, and deleting events (CRUD operations).

## Technology Stack

- **Backend**: Django (RESTful API)
- **Frontend**: React with Tailwind CSS and CSS for styling
- **Authentication**: JWT tokens with cookies for session management
- **Email Integration**: OTP verification and registration confirmation emails
- **Database**:  SQLite

## Installation

### Clone the repository

git clone https://github.com/MKansha/Event_Management_System.git

cd event-management-system

## Backend Setup
cd backend
### Create and activate a virtual environment:
python -m venv env

.\env\Scripts\activate
## Install dependencies:
### 1.Install dependencies:
pip install django

pip install -r requirements.txt
### 2.Apply database migrations:
python manage.py migrate
### 3.Create a superuser for admin access:
python manage.py createsuperuser (and mention your name ,email and password)
### 4.Run the Django development server:
python manage.py runserver
## Frontend Setup
### 1. Navigate to the frontend directory:
cd frontend
### 2. Install dependencies:
npm install
npm start
### 3. Downloading Dependencies
In case node_modules or Python dependencies are not available, you can download them using:

## Frontend: npm install to install Node.js dependencies.
## Backend: pip install -r requirements.txt to install Python dependencies.
## Usage
### Admin Login: Admin users can log in and manage events using the provided credentials.
### User Registration: New users can register and verify their account via OTP email.
### Event Registration: Users can register for events, and admins can manage all event-related data.
