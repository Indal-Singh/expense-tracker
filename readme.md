# Expense Tracker

This is a simple and intuitive expense tracker application built with Node.js, Express, and SQLite. It allows users to register, log in, and manage their daily expenses efficiently.

## Features

- User Registration and Login
- JWT-based Authentication
- Add, View, and Delete Expenses
- Track Daily, Monthly, and All-Time Expenses
- Responsive UI with Neo Brutalism Design

## Project Structure


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Indal-Singh/expense-tracker.git
    cd expense-tracker
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Register a new account or log in with an existing account.
3. Use the dashboard to add, view, and delete your expenses.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/verify` - Verify the logged-in user
- `GET /api/auth/logout` - Log out the user

### Expenses

- `POST /api/expenses/create` - Create a new expense
- `GET /api/expenses/all` - Get all expenses for the logged-in user
- `GET /api/expenses/get-expenses-by-today-monthly` - Get today's and monthly expenses
- `GET /api/expenses/get-expenses-by-user` - Get recent expenses for the logged-in user
- `DELETE /api/expenses/delete-expense/:id` - Delete an expense by ID

## License

This project is licensed under the ISC License.