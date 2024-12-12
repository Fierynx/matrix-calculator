# Project Setup

## Back End

### 1. Create a Virtual Environment
First, create a virtual environment for your project:
```bash
python -m venv venv
```

### 2. Activate the Virtual Environment
Activate the virtual environment:
- On Windows:
```bash
  venv\Scripts\activate
  ```
  
- On macOS/Linux:
```bash
  source venv/bin/activate
  ```

### 3. Install Dependencies
Install the required dependencies listed in `requirements.txt`:
```bash
pip install -r ./requirements.txt
```

### 4. Run the Backend Server
To start the backend server using **Uvicorn**, run the following command:
```bash
uvicorn app.main:app --reload
```
Your backend will be running at `http://127.0.0.1:8000`.

## Front End

### 1. Install Dependencies
Install the frontend dependencies using npm:
```bash
npm install
```

### 2. Run the Frontend Server
To start the frontend development server, run:
```bash
npm run dev
```
Your frontend will be running at `http://localhost:5173`.

