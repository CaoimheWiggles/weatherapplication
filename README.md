# Weather Dashboard

This project is a full-stack weather application that provides user authentication and weather information using the OpenWeather API and Windy.com. The frontend is built with Vite, React, and Tailwind CSS, while the backend is powered by Django.

## Prerequisites

### Backend

- Python 3.x and Django
- pip (Python package installer)
- PostgreSQL

### Frontend

- React.js and npm

## Setup

### Backend Setup

1. Clone the repository:

   ```sh
   https://github.com/CaoimheWiggles/weatherapplication
   cd Weather/server
   ```

2. Create a virtual environment and activate it:

   ```sh
   python -m venv venv
   source venv\Scripts\activate
   ```

3. Install the dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Set up the environment variables:

   - Create a `.env` file in the `server` directory with the following content:
     ```properties
     SECRET_KEY=your_secret_key
     DATABASE_NAME=your_database_name
     DATABASE_USER=your_database_user
     DATABASE_PASSWORD=your_database_password
     DATABASE_HOST=your_database_host
     DATABASE_PORT=your_database_port
     OPENWEATHER_API_KEY=your_openweather_api_key
     DEBUG=debug_bool_variable
     ALLOWED_HOSTS=your_allowed_backend_hosts_urls
     PORT=your_ports
     ```

5. Apply the migrations:

   ```sh
   python manage.py migrate
   ```

6. Create a superuser:

   ```sh
   python manage.py createsuperuser
   ```

7. Run the development server:

   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

   ```sh
   cd ../client
   npm install --legacy-peer-deps
   ```

2. Set up the environment variables:

   - Create a `.env` file in the `client` directory with the following content:
     ```properties
     VITE_OPENWEATHER_API_KEY=your_openweather_api_key
     VITE_WINDY_API_KEY=your_windy_api_key
     ```

3. Run the frontend development server:

   ```sh
   npm run dev
   ```

## Project Structure

### Backend

- `api/`: Contains the application logic for user authentication and weather information.
  - `models.py`: Defines the custom `User` model.
  - `views.py`: Contains the views for user login, signup, and fetching weather information.
  - `tests/test_views.py`: Contains tests for the views.
- `server/`: Contains the project settings and URL configurations.
  - `settings.py`: Configuration settings for the Django project.
  - `urls.py`: URL routing for the project.

### Frontend

- `client/`: Contains the frontend application built with Vite, React, and Tailwind CSS.
  - `src/`: Source code for the React application.
    - `components/`: Reusable React components.
    - `context/`: Context providers for global state management.
    - `pages/`: Page components for different routes.
    - `utils/`: Utility functions and components.

### Scripts

- `install_and_run.sh`: Script to install dependencies, apply migrations, and run the server.

## API Endpoints

- `POST /api/login/`: User login endpoint.
- `POST /api/signup/`: User signup endpoint.
- `GET /api/weather/<lat>/<lon>/`: Fetch weather information for the given latitude and longitude.

## Running Tests

### Backend

To run the tests, use the following command:

```sh
python manage.py test


https://weather-app-ie.netlify.app/dashboard

or

./install_and_run.sh
```
