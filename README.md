# Payments Gateway

A full-stack payment infrastructure project built as a Turborepo monorepo using Next.js, Node.js, TypeScript, PostgreSQL, Prisma, and Docker.

The project is designed to model the core building blocks of a digital payments platform, including user accounts, merchants, wallet balances, money on-ramping, and peer-to-peer transfers.

Rather than treating the application as a single monolithic service, the system is structured as a monorepo containing independently runnable applications and shared packages.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [System Components](#system-components)
- [Monorepo Structure](#monorepo-structure)
- [Application Flow](#application-flow)
- [User and Wallet Model](#user-and-wallet-model)
- [On-Ramp Transaction Flow](#on-ramp-transaction-flow)
- [P2P Transfer Flow](#p2p-transfer-flow)
- [Bank Webhook](#bank-webhook)
- [Database Architecture](#database-architecture)
- [Prisma](#prisma)
- [Docker Architecture](#docker-architecture)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Running with Docker](#running-with-docker)
- [Database Setup](#database-setup)
- [API Structure](#api-structure)
- [Design Decisions](#design-decisions)
- [Transaction Consistency](#transaction-consistency)
- [Security Considerations](#security-considerations)
- [Project Learnings](#project-learnings)
- [Future Improvements](#future-improvements)
- [License](#license)

---

# Overview

The Payments Gateway is a payment-oriented web application that models how users can hold balances, add money to their wallets, interact with merchants, and transfer funds between users.

The project is implemented as a monorepo using Turborepo.

The primary applications are:

1. **User Application**
   - Next.js
   - Provides the user-facing interface.
   - Allows users to interact with their wallet and payment functionality.

2. **Bank Webhook Service**
   - Processes events originating from an external banking/payment system.
   - Updates transaction state based on webhook events.

3. **Shared Database Package**
   - Contains the Prisma schema and Prisma client.
   - Provides a common database abstraction for the applications.

4. **PostgreSQL**
   - Acts as the persistent data store for users, balances, merchants, transactions, and transfers.

The overall architecture is:

```text
                         ┌─────────────────────┐
                         │     User / Client    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     User App        │
                         │      Next.js        │
                         └──────────┬──────────┘
                                    │
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Prisma Client     │
                         │  Shared DB Package  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    PostgreSQL       │
                         └──────────▲──────────┘
                                    │
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         │                     │
              ┌──────────┴─────────┐  ┌──────┴──────────────┐
              │   Bank Webhook     │  │ Other Payment Events │
              │      Service       │  │                     │
              └────────────────────┘  └─────────────────────┘


<img width="1354" height="724" alt="image" src="https://github.com/user-attachments/assets/54716af9-3e63-409f-b1eb-d6577094144a" />

<img width="1361" height="747" alt="image" src="https://github.com/user-attachments/assets/d7150071-7d46-4a36-867d-1724f358793d" />

<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/8caba894-2b73-4e9a-b005-49b73ad5a764" />
