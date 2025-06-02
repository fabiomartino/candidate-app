# Candidate App

Full-stack application built with Angular 20 (Standalone + Signals) and NestJS 10.

The application allows uploading candidate data along with an Excel file, processes it on the backend, and displays the results in a dynamic table.

---

## 🚀 Technologies Used

### Frontend (Angular 20)

- Angular 20 (Standalone API, Signals)
- Angular Material
- RxJS
- Reactive Forms
- Angular CLI 20
- Karma (unit testing)
- TypeScript 5.8
- Yarn

### Backend (NestJS 10)

- NestJS 10 (REST API)
- Multer (file upload middleware)
- XLSX (Excel parsing)
- Jest (unit + e2e tests)
- TypeScript
- Yarn

---

## 🏗 Project Structure

/candidate-app
/frontend-angular    –> Angular 20 frontend app
/backend-nestjs      –> NestJS backend API
README.md            –> Project documentation
package.json         –> Monorepo scripts

---

## 🚀 How to Run the Project

### 1️⃣ Clone the repo

```sh
git clone https://github.com/fabiomartino/candidate-app.git
cd candidate-app

2️⃣ Install dependencies (mono install)

yarn run install-all

3️⃣ Run Backend

yarn run start-backend
# → http://localhost:3000

4️⃣ Run Frontend

yarn run start-frontend
# → http://localhost:4200


⸻

🎮 Available Scripts (Monorepo)

In the project root you can run:

Command	Description
yarn run install-all	Installs both frontend + backend
yarn run start-backend	Runs NestJS backend
yarn run start-frontend	Runs Angular frontend
yarn run test-backend	Runs backend unit tests (Jest)
yarn run test-backend:e2e	Runs backend e2e tests (Jest)
yarn run test-frontend	Runs frontend tests (Karma)
yarn run build-backend	Builds backend app
yarn run build-frontend	Builds frontend app


⸻

🖥️ Features

Frontend

✅ Upload Candidate Form (Reactive)
✅ Upload Excel file (.xls, .xlsx)
✅ Display list of loaded candidates (Material Table)
✅ LocalStorage persistence
✅ Clear Candidates (confirmation dialog)
✅ Signals-based Store
✅ Responsive UI

Backend

✅ REST API with NestJS
✅ POST /candidates/upload endpoint
✅ Processes Excel file and returns candidate object
✅ Basic validation and error handling
✅ Unit and e2e tests with Jest


⸻

🔄 API Documentation

POST /candidates/upload
	•	Content-Type: multipart/form-data

Request fields:

Field	Type	Required
name	string	Yes
surname	string	Yes
excel	file	Yes (.xls or .xlsx)

Example Response:

{
  "name": "John",
  "surname": "Doe",
  "seniority": "junior",
  "years": 3,
  "availability": true
}


⸻

🧪 Running Tests

Backend (NestJS)

yarn run test-backend
yarn run test-backend:e2e

Frontend (Angular)

yarn run test-frontend


⸻

✨ Additional Notes
	•	The app uses Angular Signals and a signal-based Store for managing frontend state.
	•	Excel parsing on the backend uses xlsx library.
	•	No DB used — the state is persisted in LocalStorage (per requirement).
	•	The API is stateless and simple — ready to be extended with DB or authentication if needed.
	•	The solution aims to follow modern best practices and clean architecture.

⸻

📚 Possible Improvements
	•	Add pagination to table
	•	Add filtering & sorting
	•	Support batch uploads (multi-row Excel)
	•	Add user authentication
	•	Integrate with a database (MongoDB / PostgreSQL)
	•	Add advanced validation on backend (class-validator)

⸻

📌 Conclusion

This project demonstrates:

✅ Full-stack Angular + NestJS skills
✅ Usage of modern Angular features (Signals, Standalone API)
✅ Good state management practices
✅ Solid testing (backend + frontend)
✅ Clean code and architecture


⸻

Developed by Fabio Martino — 2025 🚀