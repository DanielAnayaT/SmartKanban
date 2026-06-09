# Backend Setup and Execution Guide

This document describes the steps required to set up and run the SmartKanban backend locally.

## Prerequisites

Before starting, ensure that the following software is installed on your machine:

* Python 3.10 or higher
* Docker and Docker Compose
* Git (optional, for cloning the repository)

---

## 1. Start the Database Services

The backend relies on services defined in the Docker Compose configuration file.

From the root directory of the backend project, execute:

```bash
docker compose up -d
```

This command starts all required containers in detached mode.

To verify that the containers are running correctly:

```bash
docker ps
```

---

## 2. Create a Virtual Environment

Navigate to the backend directory and create a Python virtual environment:

```bash
python -m venv venv
```

---

## 3. Activate the Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Once activated, the terminal should display the virtual environment name.

---

## 4. Install Dependencies

The first time the project is executed, all required Python packages must be installed.

Run:

```bash
pip install -r requirements.txt
```

This command installs all dependencies defined by the project.

> Note: This step is only required the first time the environment is created or whenever the requirements file is updated.

---

## 5. Verify Environment Configuration

Ensure that the required environment variables are properly configured.

If the project includes an example configuration file, create a copy:

```bash
cp .env.example .env
```

Then modify the values according to your local environment if necessary.

---

## 6. Run the Backend Server

Start the FastAPI application using Uvicorn:

```bash
uvicorn app.main:app --reload
```

Replace `app.main:app` with the appropriate module path if your project structure differs.

The `--reload` flag enables automatic server reloading whenever source files are modified.

---

## 7. Access the Application

Once the server is running, the API will be available at:

```text
http://localhost:8000
```

Interactive API documentation can be accessed through:

```text
http://localhost:8000/docs
```

Swagger UI provides a convenient interface for testing API endpoints.

---

## 8. Stopping the Application

To stop the FastAPI server, press:

```bash
CTRL + C
```

To stop the Docker containers:

```bash
docker compose down
```

If you want to remove associated volumes as well:

```bash
docker compose down -v
```

---

## Full Startup Sequence

For subsequent executions:

```bash
docker compose up -d
source venv/bin/activate
uvicorn app.main:app --reload
```

For the first execution:

```bash
docker compose up -d
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
