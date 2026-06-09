# Frontend Setup and Execution Guide

This document describes the steps required to set up and run the SmartKanban frontend locally.

## Prerequisites

Before starting, ensure that the following software is installed on your machine:

* Node.js (version 18 or higher recommended)
* npm (included with Node.js)

To verify the installation:

```bash
node --version
npm --version
```

---

## 1. Navigate to the Frontend Directory

Open a terminal and move to the frontend project folder:

```bash
cd frontend
```


---

## 2. Install Dependencies

The first time the project is executed, all required dependencies must be installed.

Run:

```bash
npm install
```

This command downloads and installs all packages defined in the `package.json` file.

> Note: This step is only required the first time the project is configured or whenever dependencies are updated.

---

## 3. Configure Environment Variables

If the project uses environment variables, create the corresponding configuration file.

For example:

```bash
cp .env.example .env
```

Then modify the values according to your local environment.


---

## 4. Run the Development Server

Start the frontend development server using:

```bash
npm run dev
```

This command launches the Vite development server and automatically recompiles the application whenever source files are modified.

---

## 5. Access the Application

After the server starts successfully, the terminal will display a local URL similar to:

```text
http://localhost:5173
```

Open the provided URL in a web browser to access the application.

---

## 6. Backend Dependency

The frontend requires the backend server to be running in order to access application data and authentication services.

Before using the application, ensure that:

* The backend server is running.
* The database services are active.
* The API URL configured in the frontend matches the backend address.

---


## 7. Stopping the Application

To stop the development server, press:

```bash
CTRL + C
```

---

## Full Startup Sequence

For the first execution:

```bash
npm install
npm run dev
```

For subsequent executions:

```bash
npm run dev
```

Before starting the frontend, ensure that the backend services are already running.
