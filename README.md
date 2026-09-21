# Payments Gateway

A full-stack payments application built as a Turborepo monorepo using **Next.js, TypeScript, Prisma, PostgreSQL, and Docker**.

The project simulates core payment operations such as user wallets, balances, on-ramp transactions, merchants, and peer-to-peer transfers.

## Architecture

```text
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


Tech Stack
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

npm install

Generate Prisma Client:

npm run db:generate

Run migrations:

npx prisma migrate dev

Start the application:

npm run dev
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
