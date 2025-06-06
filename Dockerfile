# Use an official Python image
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy project files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (optional, for future dashboards or APIs)
EXPOSE 8000

# Set environment variables (optional if using .env manually)
ENV PYTHONUNBUFFERED=1

# Run the app
CMD ["python", "run.py"]
