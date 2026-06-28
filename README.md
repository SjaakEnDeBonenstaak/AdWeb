# Huishoudboekje

Vite React app for the ADWEB final assignment. The app uses Firebase Authentication and Firestore.

## Setup

Install dependencies:

```bash
npm install
```

Create a local `.env.local` file using [.env.example](.env.example) as the required variable checklist. Do not commit `.env.local`.

Firebase must have:

- Authentication with the Email/Password provider enabled.
- Firestore Database enabled.

Start the development server:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:coverage
```

## Routes

- `/login`: login and registration.
- `/budget-books`: overview of active and archived budget books.
- `/budget-books/:id`: detail page for one budget book.

## Firestore

Top-level collection:

```txt
budgetBooks
```

Document shape:

```js
{
  name: "Fixed costs",
  description: "Monthly fixed expenses",
  ownerId: "firebase-user-id",
  archived: false,
  createdAt: serverTimestamp()
}
```

Rules in the app logic:

- `name` is required.
- `ownerId` is the Firebase Auth UID of the owner.
- The active list filters on `archived === false`.
- The archived list filters on `archived === true`.

Nested subcollections:

```txt
budgetBooks/{budgetBookId}/transactions
budgetBooks/{budgetBookId}/categories
```

Transaction shape:

```js
{
  type: "expense", // or "income"
  amount: 25.5,
  description: "Groceries",
  date: "2026-06-28",
  categoryId: "category-id-or-null",
  createdAt: serverTimestamp()
}
```

Category shape:

```js
{
  name: "Groceries",
  maxBudget: 300,
  endDate: "2026-07-31", // or null
  createdAt: serverTimestamp()
}
```

## Code Structure

```txt
src/
├─ App.jsx
├─ main.jsx
├─ index.css
├─ pages/
│  ├─ auth/
│  │  └─ LoginPage.jsx
│  └─ budgetBooks/
│     ├─ BudgetBooksPage.jsx
│     └─ BudgetBookDetailPage.jsx
├─ components/
│  ├─ common/
│  │  ├─ Button.jsx
│  │  ├─ Field.jsx
│  │  ├─ Panel.jsx
│  │  └─ RequireAuth.jsx
│  ├─ budgetBooks/
│  │  ├─ BudgetBookForm.jsx
│  │  ├─ BudgetBookItem.jsx
│  │  └─ BudgetBookList.jsx
│  ├─ categories/
│  │  ├─ CategoryForm.jsx
│  │  ├─ CategoryItem.jsx
│  │  └─ CategoryList.jsx
│  └─ transactions/
│     ├─ TransactionForm.jsx
│     ├─ TransactionItem.jsx
│     ├─ TransactionList.jsx
│     └─ TransactionStats.jsx
├─ contexts/
│  └─ AuthContext.jsx
├─ hooks/
│  ├─ useBudgetBooks.js
│  ├─ useCategories.js
│  └─ useTransactions.js
├─ services/
│  ├─ authService.js
│  ├─ budgetBooksService.js
│  ├─ categoriesService.js
│  └─ transactionsService.js
├─ lib/
│  └─ firebase.js
└─ test/
   ├─ setup.js
   ├─ components/
   │  ├─ budgetBooks/
   │  │  └─ BudgetBookForm.test.jsx
   │  ├─ categories/
   │  │  ├─ CategoryForm.test.jsx
   │  │  └─ CategoryItem.test.jsx
   │  └─ transactions/
   │     ├─ TransactionForm.test.jsx
   │     └─ TransactionStats.test.jsx
   └─ services/
      ├─ budgetBooksService.test.js
      ├─ categoriesService.test.js
      └─ transactionsService.test.js
```

Important pattern:

```txt
Page -> Hook -> Service -> Firebase
```

Example:

```txt
BudgetBooksPage
  -> useBudgetBooks
    -> budgetBooksService
      -> Firestore
```
