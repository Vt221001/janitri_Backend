# 🚀 Janitri Backend Assignment (Node.js + Express )

This is a **RESTful API** for managing users, patients, and heart rate data, built using **Node.js, Express, and MongoDB**. The system allows **user registration & login**, **patient management**, and **heart rate data tracking**.


## 🛠 **Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/janitri-backend.git
cd janitri-backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```
MONGO_URI= 
ACCESS_TOKEN_SECRET = 
REFRESH_TOKEN_SECRET = 

### **4️⃣ Start the Server**
```sh
npm start
```
Server will run at: **http://localhost:3000**

---

## 🔥 **API Documentation**
### **📌 User APIs**
| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login`    | Login user          |

#### **📝 User Registration (`POST /api/users/register`)**
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
    "statusCode": 201,
    "data": {
        "name": "John Doe",
        "email": "johndo1e@example.com",
        "password": "$2a$10$q8IcIBnYNWNujC6VZAhUn.7w1wUxw7KiqtrBXHnImBf0bf.xiSooK",
        "refreshToken": "",
        "_id": "67ac40a0dbb8d04267d799d3",
        "createdAt": "2025-02-12T06:33:04.811Z",
        "updatedAt": "2025-02-12T06:33:04.811Z",
        "__v": 0
    },
    "message": "User created successfully",
    "success": true
}
```

#### **📝 User Login (`POST /api/users/login`)**
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "67ac29be8ea3265f42962892",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "createdAt": "2025-02-12T04:55:26.240Z",
            "updatedAt": "2025-02-12T06:34:28.414Z",
            "__v": 0,
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWMyOWJlOGVhMzI2NWY0Mjk2Mjg5MiIsImlhdCI6MTczOTM0MjA2OCwiZXhwIjoxNzQxMDcwMDY4fQ.sQKmkS5xwVEac63lfuuhA5fbwaMkICxMkBjnrv8AgLI"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWMyOWJlOGVhMzI2NWY0Mjk2Mjg5MiIsImlhdCI6MTczOTM0MjA2OCwiZXhwIjoxNzM5OTQ2ODY4fQ.4shTmWSEZy2dhqBgyjIHssVlXonDS0BxuDrE8Oxl7pc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWMyOWJlOGVhMzI2NWY0Mjk2Mjg5MiIsImlhdCI6MTczOTM0MjA2OCwiZXhwIjoxNzQxMDcwMDY4fQ.sQKmkS5xwVEac63lfuuhA5fbwaMkICxMkBjnrv8AgLI"
    },
    "message": "User logged in successfully",
    "success": true
}
```

---

### **📌 Patient APIs**
| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| `POST` | `/api/patients`            | Add a new patient   |
| `GET`  | `/api/patients/:patientId` | Get patient details |

#### **📝 Add Patient (`POST /api/patients`)**
**Request Body:**
```json
{
  "name": "Amit Sharma",
  "age": 28,
  "gender": "Male",
  "createdBy": "67ac29be8ea3265f42962891"
}

**Response:**
```json
{
    "statusCode": 201,
    "data": {
        "name": "Amit Sharma",
        "age": 28,
        "gender": "Male",
        "createdBy": "67ac29be8ea3265f42962892",
        "_id": "67ac414adbb8d04267d799dc",
        "createdAt": "2025-02-12T06:35:54.559Z",
        "updatedAt": "2025-02-12T06:35:54.559Z",
        "__v": 0
    },
    "message": "Patient created successfully",
    "success": true
}
```

#### **📝 Get Patient Details (`GET /api/patients/:patientId`)**
**Response:**
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "67ac37aa1b05718114c7a199",
            "name": "Amit Sharma",
            "age": 28,
            "gender": "Male",
            "createdBy": "67ac29be8ea3265f42962892",
            "createdAt": "2025-02-12T05:54:50.626Z",
            "updatedAt": "2025-02-12T05:54:50.626Z",
            "__v": 0
        },
        {
            "_id": "67ac414adbb8d04267d799dc",
            "name": "Amit Sharma",
            "age": 28,
            "gender": "Male",
            "createdBy": "67ac29be8ea3265f42962892",
            "createdAt": "2025-02-12T06:35:54.559Z",
            "updatedAt": "2025-02-12T06:35:54.559Z",
            "__v": 0
        }
    ],
    "message": "Patients fetched",
    "success": true
}
```

---

### **📌 Heart Rate APIs**
| Method   | Endpoint                      | Description                       |
| -------- | ----------------------------- | --------------------------------- |
| `POST`   | `/api/heartrate`              | Add heart rate data               |
| `GET`    | `/api/heartrate/:patientId`   | Get heart rate data for a patient |
| `DELETE` | `/api/heartrate/:heartRateId` | Delete heart rate record          |

#### **📝 Add Heart Rate Data (`POST /api/heartrate`)**
**Request Body:**
```json
{
  "patient": "67ac37aa1b05718114c7a199",
  "bpm": 75,
  "recordAt": "2025-02-12T14:00:00Z"
}

```
**Response:**
```json
{
    "statusCode": 201,
    "data": {
        "patient": "67ac37aa1b05718114c7a199",
        "bpm": 75,
        "recordAt": "2025-02-12T14:00:00.000Z",
        "_id": "67ac3c20fc1316ddbb003307",
        "__v": 0
    },
    "message": "HeartRate Added successfully",
    "success": true
}
```

#### **📝 Get Heart Rate Data (`GET /api/heartrate/:patientId`)**
**Response:**
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "67ac3bc91681c277e67a5c3c",
            "patient": "67ac37aa1b05718114c7a199",
            "bpm": 75,
            "recordAt": "2025-02-12T14:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "67ac3c20fc1316ddbb003307",
            "patient": "67ac37aa1b05718114c7a199",
            "bpm": 75,
            "recordAt": "2025-02-12T14:00:00.000Z",
            "__v": 0
        }
    ],
    "message": "HeartRates fetched",
    "success": true
}
```

#### **📝 Delete Heart Rate Record (`DELETE /api/heartrate/:heartRateId`)**
**Response:**
```json
{
    "statusCode": 200,
    "data": null,
    "message": "HeartRate deleted",
    "success": true
}
```

---

## 🚀 **Technologies Used**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Validation:**  JOI 
- **Error Handling:** Custom Middleware
- **Environment Variables:** dotenv
  

---

## 📌 **Assumptions & Decisions**
1. **Authentication is basic** (only email-password )JWT bcrtjs.
2. **Heart rate data does not require real-time updates** (can be fetched via API calls).
3. **Patients and heart rate data are linked** using `patientId`.

---

- ✅ JWT-based authentication.

---

## 📩 **Submission Details**
- **GitHub Repository:** [https://github.com/Vt221001/janitri_Backend]
-
