# Use official Python image
FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Ensure the script runs when the container starts
CMD ["python", "app.py"]
