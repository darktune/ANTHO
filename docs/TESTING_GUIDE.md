# ANTHO Testing Strategy & Quality Assurance Guide

This guide details the testing architecture, suites, and execution instructions for the ANTHO digital atelier.

---

## 1. Test Architecture Overview

The testing strategy is structured into two decoupled tiers:

1. **Unit & Integration Suite (`tests/unit/`)**:
   - Built on Node.js 22 native test runner (`node:test`) and executed via `tsx`.
   - Executes in **~2 seconds** with zero external browser overhead.
   - Tests business logic: authoritative catalog pricing, shipping rate matrices, cryptographic HMAC token validation, and Paystack webhook signatures.
2. **End-to-End (E2E) Browser Suite (`tests/e2e/`)**:
   - Built on `@playwright/test` (v1.62.1).
   - Tests real browser behavior on Desktop Chrome and Mobile Chrome viewports.
   - Tests critical customer journeys: homepage presentation, mobile HCI navigation drawer, catalog browsing, cart operations, checkout flows, and edge middleware route protection.

---

## 2. Running Automated Tests

### A. Fast Unit & Integration Tests
Execute all unit security and business logic assertions:

```bash
npm run test
```

Or run an individual test suite:
```bash
# Pricing & Cart Integrity
npx tsx --test tests/unit/pricing-integrity.test.ts

# Shipping Matrix Calculations
npx tsx --test tests/unit/shipping-matrix.test.ts

# Cryptographic HMAC Admin Authentication
npx tsx --test tests/unit/auth-security.test.ts

# Paystack Webhook Signatures
npx tsx --test tests/unit/paystack-webhook.test.ts
```

### B. Playwright End-to-End (E2E) Tests
Before running E2E tests for the first time, ensure Playwright browsers are installed:

```bash
npx playwright install chromium
```

Run all E2E specifications:
```bash
npm run test:e2e
```

Run specific test files:
```bash
# Run Security Guardrails test
npx playwright test tests/e2e/security-guards.spec.ts

# Run Navigation & Visual HCI test
npx playwright test tests/e2e/navigation.spec.ts

# Run Catalog & Cart test
npx playwright test tests/e2e/catalog-and-cart.spec.ts
```

Run in interactive UI mode:
```bash
npx playwright test --ui
```

---

## 3. Test Suites Directory & Scope

```
tests/
├── e2e/
│   ├── catalog-and-cart.spec.ts   # 4-piece catalog verification, size selection, cart drawer
│   ├── checkout-flow.spec.ts      # Checkout input fields, shipping zone recalculation
│   ├── homepage.spec.ts           # Hero slideshow, clean homepage, deterministic pricing
│   ├── navigation.spec.ts         # 4-pillar HCI mobile drawer, visual cards, brand emblem
│   └── security-guards.spec.ts    # Admin route protection, 400 on price tampering, Zod validation
└── unit/
    ├── auth-security.test.ts      # Web Crypto HMAC-SHA256 session token generation and verification
    ├── paystack-webhook.test.ts   # HMAC-SHA512 webhook signature verification & tamper rejection
    ├── pricing-integrity.test.ts  # Authoritative product catalog lookup and subtotal calculation
    └── shipping-matrix.test.ts    # Covenant University, Lagos, Ogun, and Nationwide shipping rates
```

---

## 4. Continuous Integration (CI) Workflow

Add the following step to your GitHub Actions workflow (`.github/workflows/ci.yml`):

```yaml
name: CI Quality & Security Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run build
```
