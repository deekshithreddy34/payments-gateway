# Payments Gateway

A full-stack payments application built as a Turborepo monorepo using **Next.js, TypeScript, Prisma, PostgreSQL, and Docker**.

The project simulates core payment operations such as user wallets, balances, on-ramp transactions, merchants, and peer-to-peer transfers.

## Architecture

```
                    Payments Gateway
                           │
              ┌────────────┴────────────┐
              │                         │
         User App                 Bank Webhook
         Next.js                    Service
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                    Prisma / DB Package
                           │
                           ▼
                       PostgreSQL
```


## Tech Stack
Frontend: Next.js, React, TypeScript
Backend: Node.js, TypeScript
Database: PostgreSQL
ORM: Prisma
Monorepo: Turborepo
Deployment: Docker
Project Structure
.
├── apps/
│   ├── user-app/
│   └── bank-webhook/
│
├── packages/
│   └── db/
│       └── prisma/
│           └── schema.prisma
│
├── package.json
└── turbo.json
User App

The Next.js application provides the user-facing interface for interacting with the payment system.

Bank Webhook

A separate service handles bank webhook events and updates the corresponding transactions.

Database Package

The shared database package contains the Prisma schema and Prisma client used by the applications.

Core Models

The database contains models for:

Users
Merchants
Balances
On-ramp transactions
P2P transfers
P2P Transfer Flow
Sender
  │
  │ Transfer
  ▼
P2P Transaction
  │
  ├── Sender Balance ↓
  │
  └── Receiver Balance ↑
On-Ramp Flow
Bank
  │
  │ Webhook
  ▼
Bank Webhook Service
  │
  ▼
Transaction Update
  │
  ▼
User Balance
Running Locally

Install dependencies:

```
npm install
```

Generate Prisma Client:
```
npm run db:generate
```

Run migrations:
```
npx prisma migrate dev
```
Start the application:
```
npm run dev
```
Docker

The project can be run using Docker containers for the application services and PostgreSQL database.

The services communicate through a Docker network.

What I Learned

This project helped me understand:

Structuring a payment system as a monorepo
Designing relational database models with Prisma
Handling wallet balances and transactions
Processing asynchronous bank webhook events
Sharing database infrastructure across applications
Containerizing applications with Docker
Disclaimer

This is an educational project and is not intended to process real financial transactions.
<img width="1347" height="636" alt="image" src="https://github.com/user-attachments/assets/b0762bc4-5a41-45ed-bf14-44533f1e4502" />

<img width="1365" height="743" alt="image" src="https://github.com/user-attachments/assets/a66209bc-7a7a-4c21-b5f6-ad4275b63a2e" />

<img width="1338" height="615" alt="image" src="https://github.com/user-attachments/assets/0b27ccf4-36d1-4058-811b-b03ca29661ef" />

<img width="1325" height="546" alt="image" src="https://github.com/user-attachments/assets/f62ef63c-8a29-4350-b5db-801d0992caef" />




