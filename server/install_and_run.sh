
#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver