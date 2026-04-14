# Software Requirements Specification

## LawyerConnect - Legal Consultation Platform

---

| Field | Value |
|-------|-------|
| **Document Title** | Software Requirements Specification |
| **Project Name** | LawyerConnect |
| **Version** | 1.0 |
| **Date** | December 26, 2025 |
| **Status** | Final |

---

## Team Members

| # | Student Name | Student ID |
|---|--------------|------------|
| 1 | [Student Name 1] | [Student ID 1] |
| 2 | [Student Name 2] | [Student ID 2] |
| 3 | [Student Name 3] | [Student ID 3] |
| 4 | [Student Name 4] | [Student ID 4] |

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | December 26, 2025 | [Author Name] | Initial document creation |
| | | | |
| | | | |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Vision and Objectives](#13-vision-and-objectives)
   - 1.4 [Definitions, Acronyms, and Abbreviations](#14-definitions-acronyms-and-abbreviations)
   - 1.5 [References](#15-references)

2. [Overall Description](#2-overall-description)
   - 2.1 [System Perspective](#21-system-perspective)
   - 2.2 [User Classes and Characteristics](#22-user-classes-and-characteristics)
   - 2.3 [Operating Environment](#23-operating-environment)
   - 2.4 [Design and Implementation Constraints](#24-design-and-implementation-constraints)
   - 2.5 [Assumptions and Dependencies](#25-assumptions-and-dependencies)
   - 2.6 [System Architecture](#26-system-architecture)

3. [Functional Requirements](#3-functional-requirements)
   - 3.1 [Authentication Module](#31-authentication-module)
   - 3.2 [User Management Module](#32-user-management-module)
   - 3.3 [Lawyer Management Module](#33-lawyer-management-module)
   - 3.4 [Booking System Module](#34-booking-system-module)
   - 3.5 [Payment Processing Module](#35-payment-processing-module)
   - 3.6 [Admin Module](#36-admin-module)

4. [Non-Functional Requirements](#4-non-functional-requirements)
   - 4.1 [Performance Requirements](#41-performance-requirements)
   - 4.2 [Security Requirements](#42-security-requirements)
   - 4.3 [Reliability Requirements](#43-reliability-requirements)
   - 4.4 [Usability Requirements](#44-usability-requirements)
   - 4.5 [Scalability Requirements](#45-scalability-requirements)
   - 4.6 [Maintainability Requirements](#46-maintainability-requirements)
   - 4.7 [Compatibility Requirements](#47-compatibility-requirements)

5. [Use Cases](#5-use-cases)
   - 5.1 [Use Case Diagram](#51-use-case-diagram)
   - 5.2 [Client Use Cases](#52-client-use-cases)
   - 5.3 [Lawyer Use Cases](#53-lawyer-use-cases)
   - 5.4 [Admin Use Cases](#54-admin-use-cases)

6. [Data Requirements](#6-data-requirements)
   - 6.1 [Entity-Relationship Diagram](#61-entity-relationship-diagram)
   - 6.2 [Entity Descriptions](#62-entity-descriptions)
   - 6.3 [Data Relationships](#63-data-relationships)
   - 6.4 [Data Validation Rules](#64-data-validation-rules)
   - 6.5 [Data Retention Requirements](#65-data-retention-requirements)

7. [Interface Requirements](#7-interface-requirements)
   - 7.1 [User Interface Requirements](#71-user-interface-requirements)
   - 7.2 [API Interface Requirements](#72-api-interface-requirements)
   - 7.3 [Hardware Interface Requirements](#73-hardware-interface-requirements)
   - 7.4 [Software Interface Requirements](#74-software-interface-requirements)
   - 7.5 [Communication Interface Requirements](#75-communication-interface-requirements)

8. [Appendices](#8-appendices)
   - [Appendix A: API Reference](#appendix-a-api-reference)
   - [Appendix B: Database Schema](#appendix-b-database-schema)
   - [Appendix C: UI Screenshots](#appendix-c-ui-screenshots)
   - [Appendix D: Glossary](#appendix-d-glossary)
   - [Appendix E: Index](#appendix-e-index)

---


## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive description of the functional and non-functional requirements for the LawyerConnect platform. The document serves as the primary reference for the design, development, testing, and maintenance of the system.

**Document Intent:**
- Define the complete set of requirements for the LawyerConnect legal consultation platform
- Establish a clear understanding between stakeholders regarding system capabilities
- Provide a baseline for validation and verification activities
- Serve as a contractual basis for development activities

**Intended Audience:**

| Audience | Purpose |
|----------|---------|
| **Developers** | To understand system requirements for implementation |
| **Testers/QA Engineers** | To develop test cases and validation criteria |
| **Project Managers** | To plan and track development progress |
| **Business Analysts** | To verify requirements alignment with business needs |
| **System Architects** | To design system architecture and components |
| **Stakeholders** | To review and approve system specifications |
| **Academic Reviewers** | To evaluate the completeness and quality of documentation |

This document follows the IEEE 830-1998 standard for Software Requirements Specifications, ensuring industry-standard structure and completeness.

### 1.2 Scope

**Product Name:** LawyerConnect

**Product Description:**
LawyerConnect is a full-stack web application that serves as a digital marketplace connecting clients seeking legal services with qualified legal professionals. The platform facilitates the entire consultation lifecycle from lawyer discovery to payment processing.

**System Boundaries:**

| In Scope | Out of Scope |
|----------|--------------|
| User registration and authentication | Legal document preparation |
| Lawyer profile management and verification | Court filing services |
| Consultation booking and scheduling | Video conferencing integration |
| Payment session management | Legal case management |
| Admin dashboard for system management | Document storage and sharing |
| Multi-language support (English/Arabic) | Mobile native applications |
| Responsive web interface | Third-party calendar integration |

**Core Functionalities:**

1. **User Management**
   - Client registration and profile management
   - Lawyer onboarding with verification workflow
   - Role-based access control (Client, Lawyer, Administrator)

2. **Lawyer Discovery**
   - Browse and search lawyers by specialization
   - Filter by location, experience, and hourly rate
   - View detailed lawyer profiles and credentials

3. **Booking System**
   - Schedule consultations with available lawyers
   - Manage booking status (Pending, Confirmed, Completed, Cancelled)
   - View booking history and upcoming appointments

4. **Payment Processing**
   - Create payment sessions for consultations
   - Track payment status and confirmation
   - Support for consultation fee management

5. **Administration**
   - User and lawyer management
   - Lawyer verification approval workflow
   - System monitoring and reporting

**Benefits:**
- Democratizes access to legal services
- Streamlines the lawyer-client connection process
- Provides transparent pricing and availability
- Ensures secure and reliable payment processing

### 1.3 Vision and Objectives

#### 1.3.1 Vision Statement

> *"LawyerConnect aims to democratize access to legal services by creating a seamless digital platform that connects clients with qualified legal professionals, enabling efficient consultation booking and secure payment processing while maintaining the highest standards of professionalism and trust."*

The platform envisions a future where:
- Legal consultation is accessible to everyone regardless of location
- Clients can make informed decisions when selecting legal representation
- Lawyers can efficiently manage their practice and reach more clients
- The legal consultation process is transparent, secure, and user-friendly

#### 1.3.2 Project Objectives

| ID | Objective | Measurable Goal | Success Criteria |
|----|-----------|-----------------|------------------|
| OBJ-001 | Enable user registration | Support 1000+ concurrent user registrations | 99.9% registration success rate |
| OBJ-002 | Facilitate lawyer discovery | Display lawyers with < 2 second load time | Search results returned within 2 seconds |
| OBJ-003 | Streamline booking process | Complete booking in ≤ 5 steps | 90% booking completion rate |
| OBJ-004 | Ensure secure authentication | Implement JWT-based authentication | Zero unauthorized access incidents |
| OBJ-005 | Support payment processing | Process payments with 99.9% reliability | < 0.1% payment failure rate |
| OBJ-006 | Provide admin oversight | Enable real-time system monitoring | Dashboard updates within 5 seconds |
| OBJ-007 | Ensure system availability | Maintain 99.5% uptime | < 4.38 hours downtime per month |
| OBJ-008 | Support multi-language | Provide English and Arabic interfaces | 100% UI translation coverage |

#### 1.3.3 Key Performance Indicators (KPIs)

| KPI | Target | Measurement Method |
|-----|--------|-------------------|
| User Registration Rate | 100+ new users/month | Database analytics |
| Lawyer Verification Time | < 48 hours | Workflow tracking |
| Booking Conversion Rate | > 70% | Funnel analytics |
| System Response Time | < 500ms average | Performance monitoring |
| User Satisfaction Score | > 4.0/5.0 | User feedback surveys |
| Platform Availability | 99.5% | Uptime monitoring |

### 1.4 Definitions, Acronyms, and Abbreviations

#### 1.4.1 Definitions

| Term | Definition |
|------|------------|
| **Client** | A registered user seeking legal consultation services through the platform |
| **Lawyer** | A verified legal professional offering consultation services on the platform |
| **Administrator** | A system user with elevated privileges for platform management |
| **Consultation** | A scheduled meeting between a client and a lawyer for legal advice |
| **Booking** | A reservation made by a client for a consultation with a lawyer |
| **Payment Session** | A transaction record for processing consultation fees |
| **Verification** | The process of validating a lawyer's credentials and qualifications |
| **Specialization** | The area of legal expertise (e.g., Criminal Law, Family Law) |
| **Hourly Rate** | The fee charged by a lawyer per hour of consultation |

#### 1.4.2 Acronyms

| Acronym | Full Form |
|---------|-----------|
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete |
| **CSS** | Cascading Style Sheets |
| **DTO** | Data Transfer Object |
| **HTML** | HyperText Markup Language |
| **HTTP** | HyperText Transfer Protocol |
| **HTTPS** | HyperText Transfer Protocol Secure |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **REST** | Representational State Transfer |
| **SRS** | Software Requirements Specification |
| **SQL** | Structured Query Language |
| **UI** | User Interface |
| **UX** | User Experience |

#### 1.4.3 Abbreviations

| Abbreviation | Meaning |
|--------------|---------|
| **Admin** | Administrator |
| **Auth** | Authentication |
| **Config** | Configuration |
| **DB** | Database |
| **Dev** | Development |
| **Env** | Environment |
| **ID** | Identifier |
| **Info** | Information |
| **Max** | Maximum |
| **Min** | Minimum |
| **Prod** | Production |
| **Repo** | Repository |
| **Req** | Requirement |

### 1.5 References

#### 1.5.1 Standards and Guidelines

| Reference ID | Document | Description |
|--------------|----------|-------------|
| [IEEE-830] | IEEE Std 830-1998 | IEEE Recommended Practice for Software Requirements Specifications |
| [IEEE-1016] | IEEE Std 1016-2009 | IEEE Standard for Information Technology—Systems Design—Software Design Descriptions |
| [IEEE-12207] | IEEE/ISO/IEC 12207 | Systems and Software Engineering—Software Life Cycle Processes |
| [ISO-9001] | ISO 9001:2015 | Quality Management Systems—Requirements |
| [OWASP] | OWASP Guidelines | Open Web Application Security Project Security Guidelines |

#### 1.5.2 Technical References

| Reference ID | Document | Description |
|--------------|----------|-------------|
| [ASP.NET] | ASP.NET Core Documentation | Microsoft ASP.NET Core Web API Framework Documentation |
| [EF-Core] | Entity Framework Core | Microsoft Entity Framework Core ORM Documentation |
| [React] | React Documentation | React JavaScript Library for Building User Interfaces |
| [TypeScript] | TypeScript Documentation | TypeScript Language Specification and Handbook |
| [Tailwind] | Tailwind CSS Documentation | Utility-First CSS Framework Documentation |
| [SQL-Server] | SQL Server Documentation | Microsoft SQL Server Database Documentation |

#### 1.5.3 Project Documents

| Reference ID | Document | Description |
|--------------|----------|-------------|
| [LC-PRD] | LawyerConnect PRD | Product Requirements Document |
| [LC-ARCH] | LawyerConnect Architecture | System Architecture Document |
| [LC-API] | LawyerConnect API Spec | API Specification and Endpoint Documentation |
| [LC-DB] | LawyerConnect DB Schema | Database Schema and Entity Relationships |

#### 1.5.4 External Resources

| Reference ID | URL | Description |
|--------------|-----|-------------|
| [JWT-RFC] | RFC 7519 | JSON Web Token (JWT) Specification |
| [REST-API] | REST API Tutorial | RESTful API Design Best Practices |
| [WCAG] | WCAG 2.1 | Web Content Accessibility Guidelines |

---

## 2. Overall Description

### 2.1 System Perspective

LawyerConnect is a standalone web-based legal consultation platform that operates within a broader ecosystem of legal services. The system serves as an intermediary between clients seeking legal advice and lawyers offering consultation services.

#### 2.1.1 System Context

The following context diagram illustrates how LawyerConnect interacts with external entities:

```mermaid
graph TB
    subgraph External Actors
        C[Client]
        L[Lawyer]
        A[Administrator]
    end
    
    subgraph LawyerConnect Platform
        FE[React Frontend<br/>SPA Application]
        BE[ASP.NET Core<br/>Web API]
        DB[(SQL Server<br/>Database)]
    end
    
    subgraph External Systems
        EMAIL[Email Service<br/>Future Integration]
        PAY[Payment Gateway<br/>Future Integration]
        MAP[Mapping Service<br/>Location Display]
    end
    
    C -->|Browse, Book, Pay| FE
    L -->|Manage Profile, Bookings| FE
    A -->|Manage System| FE
    
    FE <-->|REST API<br/>JSON/HTTPS| BE
    BE <-->|Entity Framework<br/>SQL| DB
    
    BE -.->|Notifications| EMAIL
    BE -.->|Transactions| PAY
    FE -->|Display Locations| MAP
```

#### 2.1.2 System Interfaces

| Interface | Type | Description |
|-----------|------|-------------|
| **Web Browser** | User Interface | Primary access point for all users via responsive web application |
| **REST API** | Software Interface | JSON-based API for frontend-backend communication |
| **SQL Server** | Database Interface | Persistent data storage using Entity Framework Core ORM |
| **JWT Authentication** | Security Interface | Token-based authentication for secure API access |

#### 2.1.3 Related Systems

| System | Relationship | Integration Status |
|--------|--------------|-------------------|
| Email Service | Notification delivery | Planned for future release |
| Payment Gateway | Transaction processing | Planned for future release |
| Mapping Services | Location display | Client-side integration |
| Calendar Systems | Scheduling sync | Planned for future release |

### 2.2 User Classes and Characteristics

LawyerConnect supports three distinct user classes, each with specific characteristics, privileges, and interaction patterns.

#### 2.2.1 Client (Regular User)

| Attribute | Description |
|-----------|-------------|
| **Role Identifier** | `User` |
| **Primary Goal** | Find and book consultations with qualified lawyers |
| **Technical Expertise** | Basic to intermediate computer literacy |
| **Usage Frequency** | Occasional (when legal services needed) |
| **Access Level** | Limited to own profile and bookings |

**Capabilities:**
- Register and manage personal account
- Browse and search lawyer profiles
- Filter lawyers by specialization, location, experience, and price
- Book consultations with available lawyers
- View booking history and status
- Make payments for consultations
- Cancel pending bookings

**Constraints:**
- Cannot access other users' personal information
- Cannot modify lawyer profiles or verification status
- Cannot access administrative functions

#### 2.2.2 Lawyer

| Attribute | Description |
|-----------|-------------|
| **Role Identifier** | `Lawyer` |
| **Primary Goal** | Offer legal consultation services and manage client bookings |
| **Technical Expertise** | Basic to intermediate computer literacy |
| **Usage Frequency** | Regular (daily or weekly) |
| **Access Level** | Own profile, assigned bookings, client information for bookings |

**Capabilities:**
- Register as a lawyer with professional credentials
- Create and manage professional profile
- Set specialization, experience, and hourly rate
- View and manage incoming booking requests
- Accept or decline consultation requests
- View client information for confirmed bookings
- Track earnings and consultation history

**Constraints:**
- Profile requires administrator verification before becoming visible
- Cannot access other lawyers' profiles or earnings
- Cannot modify client accounts
- Cannot access administrative functions

#### 2.2.3 Administrator

| Attribute | Description |
|-----------|-------------|
| **Role Identifier** | `Admin` |
| **Primary Goal** | Manage platform operations and ensure service quality |
| **Technical Expertise** | Intermediate to advanced technical skills |
| **Usage Frequency** | Regular (daily) |
| **Access Level** | Full system access |

**Capabilities:**
- Manage all user accounts (view, modify, deactivate)
- Verify lawyer credentials and approve profiles
- Monitor platform activity and bookings
- Access system reports and analytics
- Configure system settings
- Handle user disputes and complaints
- Manage content and platform policies

**Constraints:**
- Actions are logged for audit purposes
- Cannot delete financial transaction records
- Must follow data protection policies

#### 2.2.4 User Class Comparison Matrix

| Feature | Client | Lawyer | Administrator |
|---------|--------|--------|---------------|
| Register Account | ✓ | ✓ | Pre-created |
| Manage Own Profile | ✓ | ✓ | ✓ |
| Browse Lawyers | ✓ | ✓ | ✓ |
| Book Consultations | ✓ | ✗ | ✗ |
| Receive Bookings | ✗ | ✓ | ✗ |
| Make Payments | ✓ | ✗ | ✗ |
| Verify Lawyers | ✗ | ✗ | ✓ |
| Manage All Users | ✗ | ✗ | ✓ |
| View System Reports | ✗ | ✗ | ✓ |

### 2.3 Operating Environment

#### 2.3.1 Hardware Requirements

**Server Environment:**

| Component | Minimum Requirement | Recommended |
|-----------|---------------------|-------------|
| **Processor** | 2 CPU cores | 4+ CPU cores |
| **Memory (RAM)** | 4 GB | 8+ GB |
| **Storage** | 50 GB SSD | 100+ GB SSD |
| **Network** | 100 Mbps | 1 Gbps |

**Client Environment:**

| Component | Minimum Requirement |
|-----------|---------------------|
| **Processor** | 1 GHz dual-core |
| **Memory (RAM)** | 2 GB |
| **Display** | 1024x768 resolution |
| **Network** | Stable internet connection (1 Mbps+) |

#### 2.3.2 Software Requirements

**Server-Side Stack:**

| Component | Technology | Version |
|-----------|------------|---------|
| **Runtime** | .NET | 8.0 |
| **Framework** | ASP.NET Core | 8.0 |
| **ORM** | Entity Framework Core | 8.0 |
| **Database** | Microsoft SQL Server | 2019+ |
| **Operating System** | Windows Server / Linux | 2019+ / Ubuntu 20.04+ |

**Client-Side Stack:**

| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.3.3 |
| **Build Tool** | Vite | 5.1.4 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **HTTP Client** | Axios | 1.6.7 |
| **Routing** | React Router DOM | 7.11.0 |
| **Animations** | Framer Motion | 11.0.0 |

#### 2.3.3 Supported Browsers

| Browser | Minimum Version | Support Level |
|---------|-----------------|---------------|
| Google Chrome | 90+ | Full Support |
| Mozilla Firefox | 88+ | Full Support |
| Microsoft Edge | 90+ | Full Support |
| Safari | 14+ | Full Support |
| Opera | 76+ | Full Support |
| Internet Explorer | - | Not Supported |

#### 2.3.4 Network Requirements

| Requirement | Specification |
|-------------|---------------|
| **Protocol** | HTTPS (TLS 1.2+) |
| **API Format** | RESTful JSON |
| **Authentication** | JWT Bearer Tokens |
| **CORS** | Configured for frontend origins |
| **Rate Limiting** | Implemented via middleware |

### 2.4 Design and Implementation Constraints

#### 2.4.1 Technical Constraints

| Constraint | Description | Rationale |
|------------|-------------|-----------|
| **TC-001** | Backend must use ASP.NET Core 8.0 | Existing codebase and team expertise |
| **TC-002** | Frontend must use React with TypeScript | Type safety and maintainability |
| **TC-003** | Database must be SQL Server | Enterprise support and existing infrastructure |
| **TC-004** | API must follow RESTful conventions | Industry standard, ease of integration |
| **TC-005** | Authentication must use JWT tokens | Stateless authentication, scalability |
| **TC-006** | All API communication must use HTTPS | Security requirement |

#### 2.4.2 Business Constraints

| Constraint | Description | Rationale |
|------------|-------------|-----------|
| **BC-001** | Lawyers must be verified before profile visibility | Quality assurance and trust |
| **BC-002** | Bookings require authenticated users | Accountability and tracking |
| **BC-003** | Payment must be processed before consultation | Revenue assurance |
| **BC-004** | Multi-language support (English/Arabic) | Target market requirements |

#### 2.4.3 Regulatory Constraints

| Constraint | Description | Compliance |
|------------|-------------|------------|
| **RC-001** | User data must be protected | Data protection regulations |
| **RC-002** | Password must be securely hashed | Security best practices |
| **RC-003** | Financial transactions must be logged | Audit requirements |
| **RC-004** | User consent required for data collection | Privacy regulations |

#### 2.4.4 Development Constraints

| Constraint | Description |
|------------|-------------|
| **DC-001** | Code must follow C# and TypeScript coding standards |
| **DC-002** | All API endpoints must be documented |
| **DC-003** | Database changes must use EF Core migrations |
| **DC-004** | Version control using Git |
| **DC-005** | Repository pattern for data access |
| **DC-006** | Service layer for business logic |

### 2.5 Assumptions and Dependencies

#### 2.5.1 Assumptions

| ID | Assumption | Impact if Invalid |
|----|------------|-------------------|
| **A-001** | Users have access to modern web browsers | May require additional browser support |
| **A-002** | Users have stable internet connectivity | Offline functionality may be needed |
| **A-003** | Lawyers will provide accurate credential information | Additional verification processes needed |
| **A-004** | SQL Server will be available and properly configured | Database migration required |
| **A-005** | Users understand basic web navigation | Additional user training/guidance needed |
| **A-006** | Email addresses are valid and accessible | Alternative verification methods needed |
| **A-007** | Payment gateway integration will be available | Manual payment processing required |

#### 2.5.2 Dependencies

**External Dependencies:**

| ID | Dependency | Type | Criticality |
|----|------------|------|-------------|
| **D-001** | .NET 8.0 Runtime | Software | Critical |
| **D-002** | SQL Server Database | Infrastructure | Critical |
| **D-003** | Node.js (for frontend build) | Development | High |
| **D-004** | npm packages (React, etc.) | Software | High |
| **D-005** | SSL/TLS Certificate | Security | Critical |
| **D-006** | DNS Configuration | Infrastructure | High |

**Internal Dependencies:**

| ID | Dependency | Depends On | Description |
|----|------------|------------|-------------|
| **ID-001** | User Authentication | Database | User credentials stored in DB |
| **ID-002** | Lawyer Profiles | User Accounts | Lawyers must have user accounts |
| **ID-003** | Bookings | Users & Lawyers | Requires both parties to exist |
| **ID-004** | Payments | Bookings | Payment linked to booking |
| **ID-005** | Frontend | Backend API | All data from API |

#### 2.5.3 Third-Party Components

| Component | Purpose | License |
|-----------|---------|---------|
| Entity Framework Core | ORM for database access | MIT |
| React | Frontend UI framework | MIT |
| Tailwind CSS | Styling framework | MIT |
| Axios | HTTP client | MIT |
| Framer Motion | Animation library | MIT |
| Lucide React | Icon library | ISC |

### 2.6 System Architecture

#### 2.6.1 High-Level Architecture

LawyerConnect follows a three-tier architecture pattern with clear separation of concerns:

```mermaid
graph TB
    subgraph Presentation Tier
        WEB[React SPA<br/>TypeScript + Tailwind]
    end
    
    subgraph Application Tier
        API[ASP.NET Core Web API]
        AUTH[Authentication<br/>JWT Handler]
        RATE[Rate Limiting<br/>Middleware]
        
        subgraph Services Layer
            US[User Service]
            LS[Lawyer Service]
            BS[Booking Service]
            PS[Payment Service]
        end
        
        subgraph Repository Layer
            UR[User Repository]
            LR[Lawyer Repository]
            BR[Booking Repository]
            PR[Payment Repository]
        end
    end
    
    subgraph Data Tier
        DB[(SQL Server<br/>Database)]
    end
    
    WEB <-->|HTTPS/JSON| API
    API --> AUTH
    API --> RATE
    AUTH --> US
    US --> UR
    LS --> LR
    BS --> BR
    PS --> PR
    UR --> DB
    LR --> DB
    BR --> DB
    PR --> DB
```

#### 2.6.2 Component Architecture

**Backend Components:**

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| **Controllers** | Handle HTTP requests, route to services | ASP.NET Core MVC |
| **Services** | Business logic implementation | C# Classes |
| **Repositories** | Data access abstraction | Repository Pattern |
| **DTOs** | Data transfer between layers | C# Records/Classes |
| **Mappers** | Entity-DTO conversion | Manual mapping |
| **Middlewares** | Cross-cutting concerns | ASP.NET Middleware |
| **Models** | Domain entities | Entity Framework |

**Frontend Components:**

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| **Pages** | Route-level components | React Components |
| **Components** | Reusable UI elements | React Components |
| **Contexts** | Global state management | React Context API |
| **Services** | API communication | TypeScript Classes |
| **Types** | Type definitions | TypeScript Interfaces |
| **i18n** | Internationalization | Custom translations |

#### 2.6.3 API Architecture

```mermaid
graph LR
    subgraph API Endpoints
        AUTH_EP[/api/auth/*]
        USER_EP[/api/users/*]
        LAWYER_EP[/api/lawyers/*]
        BOOKING_EP[/api/bookings/*]
        PAYMENT_EP[/api/payments/*]
    end
    
    subgraph Controllers
        AC[AuthController]
        UC[UsersController]
        LC[LawyersController]
        BC[BookingsController]
        PC[PaymentsController]
    end
    
    AUTH_EP --> AC
    USER_EP --> UC
    LAWYER_EP --> LC
    BOOKING_EP --> BC
    PAYMENT_EP --> PC
```

#### 2.6.4 Data Flow Architecture

```mermaid
sequenceDiagram
    participant C as Client Browser
    participant F as React Frontend
    participant A as ASP.NET API
    participant S as Service Layer
    participant R as Repository
    participant D as SQL Server
    
    C->>F: User Action
    F->>A: HTTP Request (JWT)
    A->>A: Validate Token
    A->>S: Call Service Method
    S->>R: Data Operation
    R->>D: SQL Query
    D-->>R: Result Set
    R-->>S: Entity/Collection
    S-->>A: DTO
    A-->>F: JSON Response
    F-->>C: Updated UI
```

#### 2.6.5 Security Architecture

| Layer | Security Measure | Implementation |
|-------|------------------|----------------|
| **Transport** | TLS/HTTPS encryption | SSL Certificate |
| **Authentication** | JWT Bearer tokens | ASP.NET Core JWT |
| **Authorization** | Role-based access control | [Authorize] attributes |
| **Data** | Password hashing | BCrypt/PBKDF2 |
| **API** | Rate limiting | Custom middleware |
| **CORS** | Origin restriction | CORS policy |

#### 2.6.6 Deployment Architecture

```mermaid
graph TB
    subgraph Production Environment
        LB[Load Balancer]
        
        subgraph Web Servers
            WS1[Web Server 1<br/>IIS/Kestrel]
            WS2[Web Server 2<br/>IIS/Kestrel]
        end
        
        subgraph Database Cluster
            DB_P[(Primary<br/>SQL Server)]
            DB_S[(Secondary<br/>SQL Server)]
        end
    end
    
    USERS[Users] --> LB
    LB --> WS1
    LB --> WS2
    WS1 --> DB_P
    WS2 --> DB_P
    DB_P -.->|Replication| DB_S
```

---

## 3. Functional Requirements

This section defines the functional requirements for the LawyerConnect platform, organized by module. Each requirement follows a standard format including unique identifier, priority level, description, inputs, outputs, preconditions, and postconditions.

### 3.1 Authentication Module

The Authentication Module handles user registration, login, session management, and identity verification using JWT-based authentication.

#### FR-001: User Registration

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-001 |
| **Priority** | High |
| **Description** | The system shall allow new users to register an account by providing required personal information and credentials. |
| **Input** | Email address, password, full name, phone number (optional), city (optional), role (User/Lawyer) |
| **Output** | User account created with unique ID, confirmation response with user details |
| **Preconditions** | Email address is not already registered in the system |
| **Postconditions** | New user record created in database, user can proceed to login |

**Business Rules:**
- Email must be unique across all users
- Password must meet minimum security requirements
- Default role is "User" if not specified
- Admin registration requires a valid admin secret key

---

#### FR-002: User Login

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-002 |
| **Priority** | High |
| **Description** | The system shall authenticate users using email and password credentials and issue a JWT token upon successful authentication. |
| **Input** | Email address, password |
| **Output** | JWT access token, token expiration timestamp, user profile information |
| **Preconditions** | User account exists and is active |
| **Postconditions** | JWT token issued, user session established |

**Business Rules:**
- Invalid credentials return generic "Invalid credentials" error (security best practice)
- Token contains user ID, email, and role claims
- Token expiration is configurable (default: 120 minutes)

---

#### FR-003: JWT Token Generation

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-003 |
| **Priority** | High |
| **Description** | The system shall generate secure JWT tokens containing user identity claims for authenticated API access. |
| **Input** | User ID, email, role |
| **Output** | Signed JWT token with claims (NameIdentifier, Email, Role) |
| **Preconditions** | User successfully authenticated |
| **Postconditions** | Token can be used for subsequent API requests |

**Technical Specifications:**
- Algorithm: HMAC-SHA256
- Claims: NameIdentifier (user ID), Email, Role
- Configurable issuer and audience
- Configurable expiration time

---

#### FR-004: Get Current User Profile

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-004 |
| **Priority** | Medium |
| **Description** | The system shall return the authenticated user's profile information based on the JWT token. |
| **Input** | Valid JWT token in Authorization header |
| **Output** | User profile (ID, email, full name, phone, city, role, created date) |
| **Preconditions** | Valid, non-expired JWT token provided |
| **Postconditions** | User profile data returned |

**Business Rules:**
- Token must be valid and not expired
- User ID extracted from token claims
- Returns 401 Unauthorized if token is invalid

---

#### FR-005: Role-Based Registration

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-005 |
| **Priority** | High |
| **Description** | The system shall support registration for different user roles (User, Lawyer, Admin) with appropriate validation. |
| **Input** | Registration details including desired role, admin secret (for Admin role) |
| **Output** | User account with assigned role |
| **Preconditions** | Valid role specified, admin secret valid (for Admin registration) |
| **Postconditions** | User created with appropriate role and permissions |

**Business Rules:**
- Valid roles: User, Lawyer, Admin
- Admin registration requires matching admin secret key
- Lawyer role requires subsequent lawyer profile creation
- Invalid role returns 400 Bad Request

### 3.2 User Management Module

The User Management Module handles user profile operations including viewing, updating, and managing user accounts.

#### FR-006: View User Profile

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-006 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to view their own profile information. |
| **Input** | Valid JWT token |
| **Output** | User profile (ID, email, full name, phone, city, role, created date) |
| **Preconditions** | User is authenticated |
| **Postconditions** | Profile data displayed to user |

**Business Rules:**
- Users can only view their own profile via /auth/me endpoint
- Admins can view all user profiles via /users endpoint

---

#### FR-007: Update User Profile

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-007 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to update their profile information (full name, phone, city). |
| **Input** | JWT token, updated profile fields (fullName, phone, city) |
| **Output** | 204 No Content on success |
| **Preconditions** | User is authenticated, valid data provided |
| **Postconditions** | User profile updated in database |

**Business Rules:**
- Users can only update their own profile
- Empty fields retain existing values
- Email cannot be changed through this endpoint

---

#### FR-008: Change Password

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-008 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to change their password by providing current and new passwords. |
| **Input** | JWT token, current password, new password |
| **Output** | 204 No Content on success |
| **Preconditions** | User is authenticated, current password is correct |
| **Postconditions** | Password hash updated in database |

**Business Rules:**
- Current password must be verified before change
- New password is hashed using SHA-256
- Returns 401 Unauthorized if current password is incorrect

---

#### FR-009: List All Users (Admin)

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-009 |
| **Priority** | Medium |
| **Description** | The system shall allow administrators to retrieve a paginated list of all registered users. |
| **Input** | JWT token (Admin role), page number, page size (limit) |
| **Output** | Paginated list of user profiles |
| **Preconditions** | User has Admin role |
| **Postconditions** | User list returned |

**Business Rules:**
- Only Admin role can access this endpoint
- Default pagination: page 1, limit 10
- Returns 403 Forbidden for non-admin users

---

#### FR-010: Update User Role (Admin)

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-010 |
| **Priority** | Medium |
| **Description** | The system shall allow administrators to change a user's role. |
| **Input** | JWT token (Admin role), target user ID, new role |
| **Output** | 204 No Content on success |
| **Preconditions** | User has Admin role, target user exists, valid role specified |
| **Postconditions** | User role updated in database |

**Business Rules:**
- Only Admin role can change user roles
- Valid roles: User, Lawyer, Admin
- Returns 400 Bad Request for invalid role

### 3.3 Lawyer Management Module

The Lawyer Management Module handles lawyer profile creation, verification, and discovery features.

#### FR-011: Lawyer Profile Registration

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-011 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to create a lawyer profile with professional information. |
| **Input** | JWT token, specialization, years of experience, hourly rate, bio, office address |
| **Output** | Created lawyer profile with unique ID |
| **Preconditions** | User is authenticated, user does not already have a lawyer profile |
| **Postconditions** | Lawyer profile created and linked to user account |

**Business Rules:**
- One lawyer profile per user account
- Returns 409 Conflict if profile already exists
- Profile requires verification before becoming publicly visible

---

#### FR-012: Get Lawyer Profile by ID

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-012 |
| **Priority** | High |
| **Description** | The system shall allow anyone to view a specific lawyer's public profile by ID. |
| **Input** | Lawyer ID |
| **Output** | Lawyer profile (ID, user info, specialization, experience, rate, bio, address, verification status) |
| **Preconditions** | Lawyer profile exists |
| **Postconditions** | Profile data returned |

**Business Rules:**
- Public endpoint (no authentication required)
- Returns 404 Not Found if lawyer doesn't exist

---

#### FR-013: Get Own Lawyer Profile

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-013 |
| **Priority** | High |
| **Description** | The system shall allow authenticated lawyers to view their own lawyer profile. |
| **Input** | JWT token (Lawyer or Admin role) |
| **Output** | Lawyer profile linked to authenticated user |
| **Preconditions** | User has Lawyer or Admin role, lawyer profile exists for user |
| **Postconditions** | Own lawyer profile returned |

**Business Rules:**
- Requires Lawyer or Admin role
- Returns 404 if no lawyer profile exists for the user

---

#### FR-014: Browse Lawyers (Paginated)

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-014 |
| **Priority** | High |
| **Description** | The system shall allow anyone to browse a paginated list of lawyer profiles. |
| **Input** | Page number (optional, default: 1), page size/limit (optional, default: 10) |
| **Output** | Paginated list of lawyer profiles |
| **Preconditions** | None |
| **Postconditions** | Lawyer list returned |

**Business Rules:**
- Public endpoint (no authentication required)
- Default pagination: page 1, limit 10
- Returns verified and unverified lawyers

---

#### FR-015: Verify Lawyer Profile (Admin)

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-015 |
| **Priority** | High |
| **Description** | The system shall allow administrators to verify a lawyer's profile, making it trusted. |
| **Input** | JWT token (Admin role), lawyer ID |
| **Output** | 204 No Content on success |
| **Preconditions** | User has Admin role, lawyer profile exists |
| **Postconditions** | Lawyer's IsVerified flag set to true |

**Business Rules:**
- Only Admin role can verify lawyers
- Verification is a one-way operation (cannot unverify)
- Verified status displayed on lawyer profile

---

#### FR-016: Search Lawyers by Specialization

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-016 |
| **Priority** | Medium |
| **Description** | The system shall allow users to filter lawyers by their area of legal specialization. |
| **Input** | Specialization keyword |
| **Output** | List of lawyers matching the specialization |
| **Preconditions** | None |
| **Postconditions** | Filtered lawyer list returned |

**Business Rules:**
- Case-insensitive search
- Partial matching supported
- Common specializations: Criminal Law, Family Law, Corporate Law, Immigration Law, etc.

---

#### FR-017: Filter Lawyers by Experience

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-017 |
| **Priority** | Medium |
| **Description** | The system shall allow users to filter lawyers by minimum years of experience. |
| **Input** | Minimum years of experience |
| **Output** | List of lawyers with experience >= specified years |
| **Preconditions** | None |
| **Postconditions** | Filtered lawyer list returned |

**Business Rules:**
- Experience measured in years
- Filter returns lawyers with experience greater than or equal to specified value

---

#### FR-018: Filter Lawyers by Hourly Rate

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-018 |
| **Priority** | Medium |
| **Description** | The system shall allow users to filter lawyers by hourly rate range. |
| **Input** | Minimum rate (optional), maximum rate (optional) |
| **Output** | List of lawyers within the specified rate range |
| **Preconditions** | None |
| **Postconditions** | Filtered lawyer list returned |

**Business Rules:**
- Rate specified in currency units
- Can filter by minimum only, maximum only, or both

### 3.4 Booking System Module

The Booking System Module manages consultation scheduling between clients and lawyers, including booking creation, status tracking, and management.

#### FR-019: Create Booking

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-019 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to create a booking for a consultation with a lawyer. |
| **Input** | JWT token, lawyer ID, scheduled date/time, notes (optional) |
| **Output** | Created booking with unique ID, status set to "Pending" |
| **Preconditions** | User is authenticated, lawyer exists |
| **Postconditions** | Booking record created in database |

**Business Rules:**
- User ID extracted from JWT token (non-admin users)
- Admin can create bookings on behalf of other users
- Initial status is "Pending"
- Scheduled time must be in the future

---

#### FR-020: Get Booking by ID

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-020 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to retrieve details of a specific booking. |
| **Input** | JWT token, booking ID |
| **Output** | Booking details (ID, user, lawyer, scheduled time, status, notes, created date) |
| **Preconditions** | User is authenticated, booking exists |
| **Postconditions** | Booking data returned |

**Business Rules:**
- Returns 404 Not Found if booking doesn't exist
- Users should only access their own bookings (enforced at application level)

---

#### FR-021: Get User's Bookings

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-021 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to retrieve all their bookings. |
| **Input** | JWT token |
| **Output** | List of bookings for the authenticated user |
| **Preconditions** | User is authenticated |
| **Postconditions** | User's booking list returned |

**Business Rules:**
- User ID extracted from JWT token
- Returns all bookings regardless of status
- Ordered by scheduled date (most recent first)

---

#### FR-022: Get Lawyer's Bookings

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-022 |
| **Priority** | High |
| **Description** | The system shall allow lawyers to retrieve all bookings assigned to them. |
| **Input** | JWT token (Lawyer or Admin role), lawyer ID (optional, Admin only) |
| **Output** | List of bookings for the specified lawyer |
| **Preconditions** | User has Lawyer or Admin role |
| **Postconditions** | Lawyer's booking list returned |

**Business Rules:**
- Lawyers can only view their own bookings
- Admins can query any lawyer's bookings by providing lawyer ID
- Returns 403 Forbidden if non-admin tries to query other lawyers

---

#### FR-023: Update Booking Status

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-023 |
| **Priority** | High |
| **Description** | The system shall allow lawyers and admins to update the status of a booking. |
| **Input** | JWT token (Lawyer or Admin role), booking ID, new status |
| **Output** | 204 No Content on success |
| **Preconditions** | User has Lawyer or Admin role, booking exists |
| **Postconditions** | Booking status updated in database |

**Business Rules:**
- Valid statuses: Pending, Confirmed, Completed, Cancelled
- Status is required (returns 400 Bad Request if empty)
- Status transitions should follow logical workflow

---

#### FR-024: Cancel Booking

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-024 |
| **Priority** | High |
| **Description** | The system shall allow users to cancel their pending bookings. |
| **Input** | JWT token, booking ID |
| **Output** | Booking status changed to "Cancelled" |
| **Preconditions** | User owns the booking, booking status is "Pending" |
| **Postconditions** | Booking status set to "Cancelled" |

**Business Rules:**
- Only pending bookings can be cancelled by users
- Confirmed bookings require lawyer/admin intervention
- Cancellation is irreversible

---

#### FR-025: Booking Status Tracking

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-025 |
| **Priority** | Medium |
| **Description** | The system shall track and display the current status of each booking throughout its lifecycle. |
| **Input** | Booking ID |
| **Output** | Current booking status |
| **Preconditions** | Booking exists |
| **Postconditions** | Status information displayed |

**Booking Status Workflow:**

```mermaid
stateDiagram-v2
    [*] --> Pending: Booking Created
    Pending --> Confirmed: Lawyer Accepts
    Pending --> Cancelled: User/Lawyer Cancels
    Confirmed --> Completed: Consultation Done
    Confirmed --> Cancelled: Cancellation
    Completed --> [*]
    Cancelled --> [*]
```

### 3.5 Payment Processing Module

The Payment Processing Module handles payment session creation, confirmation, and transaction tracking for consultation fees.

#### FR-026: Create Payment Session

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-026 |
| **Priority** | High |
| **Description** | The system shall allow authenticated users to create a payment session for a booking. |
| **Input** | JWT token, booking ID, amount |
| **Output** | Payment session with unique ID, status set to "Pending" |
| **Preconditions** | User is authenticated, booking exists |
| **Postconditions** | Payment session record created in database |

**Business Rules:**
- Payment session linked to specific booking
- Amount should match lawyer's hourly rate × consultation duration
- Initial status is "Pending"
- Session ID used for payment gateway integration

---

#### FR-027: Confirm Payment

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-027 |
| **Priority** | High |
| **Description** | The system shall allow confirmation of a payment session after successful payment processing. |
| **Input** | JWT token, session ID, provider session ID (from payment gateway) |
| **Output** | 204 No Content on success |
| **Preconditions** | User is authenticated, payment session exists |
| **Postconditions** | Payment status updated to "Completed", provider session ID stored |

**Business Rules:**
- Provider session ID links to external payment gateway transaction
- Confirmation updates payment status to "Completed"
- Timestamp recorded for audit purposes

---

#### FR-028: Get Payment Session Details

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-028 |
| **Priority** | Medium |
| **Description** | The system shall allow users to retrieve details of a payment session. |
| **Input** | JWT token, session ID |
| **Output** | Payment session details (ID, booking ID, amount, status, provider session ID, timestamps) |
| **Preconditions** | User is authenticated, payment session exists |
| **Postconditions** | Payment session data returned |

**Business Rules:**
- Users can view their own payment sessions
- Admins can view all payment sessions

---

#### FR-029: Payment Status Tracking

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-029 |
| **Priority** | Medium |
| **Description** | The system shall track and display the current status of each payment session. |
| **Input** | Session ID |
| **Output** | Current payment status |
| **Preconditions** | Payment session exists |
| **Postconditions** | Status information displayed |

**Payment Status Values:**
- **Pending**: Payment session created, awaiting payment
- **Completed**: Payment successfully processed
- **Failed**: Payment processing failed
- **Refunded**: Payment has been refunded

---

#### FR-030: Payment Amount Calculation

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-030 |
| **Priority** | Medium |
| **Description** | The system shall calculate the payment amount based on lawyer's hourly rate and consultation duration. |
| **Input** | Lawyer ID, consultation duration |
| **Output** | Calculated payment amount |
| **Preconditions** | Lawyer profile exists with hourly rate |
| **Postconditions** | Amount calculated and available for payment session |

**Business Rules:**
- Amount = Hourly Rate × Duration (in hours)
- Currency handling based on system configuration
- Minimum consultation duration may apply

### 3.6 Admin Module

The Admin Module provides administrative functionality for platform management, including user management, lawyer verification, and system monitoring capabilities.

#### FR-031: User Account Management

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-031 |
| **Priority** | High |
| **Description** | The system shall allow administrators to view, modify, and deactivate user accounts. |
| **Input** | JWT token (Admin role), user ID, account data (for modifications) |
| **Output** | User account details or confirmation of modification |
| **Preconditions** | User has Admin role |
| **Postconditions** | User account viewed, modified, or deactivated as requested |

**Business Rules:**
- Admins can view all user accounts in the system
- Admins can modify user profile information (name, email, phone)
- Admins can deactivate accounts (soft delete, not permanent removal)
- Deactivated accounts cannot log in but data is retained for audit purposes
- Admin actions are logged for accountability

**Supported Operations:**

| Operation | Endpoint | Description |
|-----------|----------|-------------|
| List Users | GET /api/users | Retrieve all user accounts |
| Get User | GET /api/users/{id} | Retrieve specific user details |
| Update User | PUT /api/users/{id} | Modify user information |
| Deactivate User | DELETE /api/users/{id} | Soft delete user account |

---

#### FR-032: Lawyer Verification Management

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-032 |
| **Priority** | High |
| **Description** | The system shall allow administrators to review and verify lawyer credentials and profiles. |
| **Input** | JWT token (Admin role), lawyer ID, verification decision (approve/reject) |
| **Output** | Updated lawyer verification status |
| **Preconditions** | User has Admin role, lawyer profile exists |
| **Postconditions** | Lawyer verification status updated, lawyer notified of decision |

**Business Rules:**
- New lawyer registrations require admin verification before profile visibility
- Admins can view pending verification requests
- Admins can approve or reject lawyer applications
- Approved lawyers become visible in search results
- Rejected lawyers can resubmit with updated credentials
- Verification decision includes optional notes/reason

**Verification Workflow:**

```mermaid
stateDiagram-v2
    [*] --> Pending: Lawyer Registers
    Pending --> Verified: Admin Approves
    Pending --> Rejected: Admin Rejects
    Rejected --> Pending: Lawyer Resubmits
    Verified --> [*]
```

**Verification Status Values:**
- **Pending**: Awaiting admin review
- **Verified**: Credentials approved, profile visible
- **Rejected**: Credentials not approved, profile hidden

---

#### FR-033: Lawyer Profile Administration

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-033 |
| **Priority** | Medium |
| **Description** | The system shall allow administrators to view and modify lawyer profiles for quality assurance purposes. |
| **Input** | JWT token (Admin role), lawyer ID, profile data (for modifications) |
| **Output** | Lawyer profile details or confirmation of modification |
| **Preconditions** | User has Admin role, lawyer profile exists |
| **Postconditions** | Lawyer profile viewed or modified as requested |

**Business Rules:**
- Admins can view all lawyer profiles regardless of verification status
- Admins can modify lawyer profile information (specialization, bio, hourly rate)
- Admins can update lawyer verification status
- Admins can suspend lawyer accounts for policy violations
- All modifications are logged with admin ID and timestamp

**Supported Operations:**

| Operation | Endpoint | Description |
|-----------|----------|-------------|
| List Lawyers | GET /api/lawyers | Retrieve all lawyer profiles |
| Get Lawyer | GET /api/lawyers/{id} | Retrieve specific lawyer details |
| Update Lawyer | PUT /api/lawyers/{id} | Modify lawyer profile |
| Verify Lawyer | PUT /api/lawyers/{id}/verify | Update verification status |

---

#### FR-034: Booking Administration

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-034 |
| **Priority** | Medium |
| **Description** | The system shall allow administrators to view and manage all bookings in the system. |
| **Input** | JWT token (Admin role), booking ID (optional), filter parameters |
| **Output** | Booking details or list of bookings |
| **Preconditions** | User has Admin role |
| **Postconditions** | Booking information retrieved or modified |

**Business Rules:**
- Admins can view all bookings across all users and lawyers
- Admins can filter bookings by status, date range, user, or lawyer
- Admins can update booking status for dispute resolution
- Admins can cancel bookings on behalf of users or lawyers
- Booking modifications are logged for audit purposes

**Supported Operations:**

| Operation | Endpoint | Description |
|-----------|----------|-------------|
| List All Bookings | GET /api/bookings | Retrieve all bookings (admin only) |
| Get Booking | GET /api/bookings/{id} | Retrieve specific booking details |
| Update Status | PUT /api/bookings/{id}/status | Modify booking status |
| Cancel Booking | DELETE /api/bookings/{id} | Cancel booking |

**Admin Booking Filters:**

| Filter | Parameter | Description |
|--------|-----------|-------------|
| Status | status | Filter by booking status |
| Date Range | startDate, endDate | Filter by booking date |
| User | userId | Filter by client |
| Lawyer | lawyerId | Filter by lawyer |

---

#### FR-035: System Monitoring and Reporting

| Attribute | Description |
|-----------|-------------|
| **ID** | FR-035 |
| **Priority** | Medium |
| **Description** | The system shall provide administrators with monitoring capabilities and system reports. |
| **Input** | JWT token (Admin role), report type, date range |
| **Output** | System statistics and reports |
| **Preconditions** | User has Admin role |
| **Postconditions** | Report data generated and displayed |

**Business Rules:**
- Admins can view real-time system statistics
- Admins can generate reports for specified date ranges
- Reports include user activity, booking trends, and payment summaries
- Dashboard updates within 5 seconds of data changes
- Historical data retained for trend analysis

**Available Reports:**

| Report Type | Description | Metrics Included |
|-------------|-------------|------------------|
| User Statistics | User registration and activity | Total users, new registrations, active users |
| Lawyer Statistics | Lawyer profiles and verification | Total lawyers, pending verifications, verified lawyers |
| Booking Statistics | Booking activity and trends | Total bookings, bookings by status, completion rate |
| Payment Statistics | Payment processing summary | Total payments, revenue, payment success rate |
| System Health | Platform performance metrics | API response times, error rates, uptime |

**Dashboard Metrics:**

```mermaid
graph TB
    subgraph Admin Dashboard
        subgraph User Metrics
            TU[Total Users]
            NU[New Users<br/>This Month]
            AU[Active Users]
        end
        
        subgraph Lawyer Metrics
            TL[Total Lawyers]
            PV[Pending<br/>Verifications]
            VL[Verified Lawyers]
        end
        
        subgraph Booking Metrics
            TB[Total Bookings]
            PB[Pending Bookings]
            CB[Completed<br/>Bookings]
        end
        
        subgraph Payment Metrics
            TP[Total Payments]
            TR[Total Revenue]
            SR[Success Rate]
        end
    end
```

**Report Generation:**
- Reports can be filtered by date range
- Data exported in JSON format via API
- Real-time dashboard for current statistics
- Historical comparison for trend analysis

---

## 4. Non-Functional Requirements

This section defines the non-functional requirements (quality attributes) for the LawyerConnect platform. Each requirement includes measurable metrics and targets to ensure verifiable compliance.

### 4.1 Performance Requirements

Performance requirements define the expected response times, throughput, and capacity metrics for the LawyerConnect platform.

#### NFR-001: API Response Time

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-001 |
| **Category** | Performance |
| **Description** | The system shall respond to API requests within acceptable time limits under normal operating conditions. |
| **Metric** | Response time in milliseconds |
| **Target** | 95% of requests completed within 500ms, 99% within 1000ms |

**Performance Targets by Operation Type:**

| Operation Type | Target Response Time | Maximum Response Time |
|----------------|---------------------|----------------------|
| Authentication (login/register) | ≤ 300ms | 1000ms |
| Read operations (GET) | ≤ 200ms | 500ms |
| Write operations (POST/PUT) | ≤ 400ms | 1000ms |
| Search/Filter operations | ≤ 500ms | 1500ms |
| File uploads | ≤ 2000ms | 5000ms |

**Measurement Conditions:**
- Normal load: Up to 100 concurrent users
- Database size: Up to 100,000 records per table
- Network latency excluded from measurement

---

#### NFR-002: System Throughput

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-002 |
| **Category** | Performance |
| **Description** | The system shall handle a minimum number of concurrent requests without degradation in performance. |
| **Metric** | Requests per second (RPS) |
| **Target** | Minimum 500 requests per second sustained throughput |

**Throughput Requirements:**

| Scenario | Minimum Throughput | Target Throughput |
|----------|-------------------|-------------------|
| Peak load | 500 RPS | 1000 RPS |
| Normal operation | 100 RPS | 500 RPS |
| Batch operations | 50 RPS | 200 RPS |

**Concurrent User Support:**

| User Type | Minimum Concurrent | Target Concurrent |
|-----------|-------------------|-------------------|
| Total users | 500 | 2000 |
| Active sessions | 200 | 1000 |
| Simultaneous API calls | 100 | 500 |

---

#### NFR-003: Resource Capacity

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-003 |
| **Category** | Performance |
| **Description** | The system shall efficiently utilize server resources and maintain performance within defined capacity limits. |
| **Metric** | CPU utilization, memory usage, database connections |
| **Target** | CPU < 70% average, Memory < 80% utilization, DB connections < 80% pool capacity |

**Resource Utilization Targets:**

| Resource | Normal Operation | Peak Load | Critical Threshold |
|----------|-----------------|-----------|-------------------|
| CPU Usage | ≤ 50% | ≤ 70% | 85% |
| Memory Usage | ≤ 60% | ≤ 80% | 90% |
| Database Connections | ≤ 50% pool | ≤ 80% pool | 95% pool |
| Disk I/O | ≤ 40% | ≤ 60% | 80% |
| Network Bandwidth | ≤ 50% | ≤ 70% | 85% |

**Database Performance:**

| Metric | Target |
|--------|--------|
| Query execution time | ≤ 100ms for simple queries |
| Complex query execution | ≤ 500ms |
| Connection pool size | 100 connections minimum |
| Index optimization | All foreign keys indexed |

### 4.2 Security Requirements

Security requirements define the authentication, authorization, data protection, and encryption standards for the LawyerConnect platform.

#### NFR-004: Authentication Security

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-004 |
| **Category** | Security |
| **Description** | The system shall implement secure authentication mechanisms to verify user identity. |
| **Metric** | Authentication protocol compliance |
| **Target** | 100% compliance with JWT standards, zero unauthorized access incidents |

**Authentication Requirements:**

| Requirement | Specification |
|-------------|---------------|
| Token Type | JWT (JSON Web Token) |
| Signing Algorithm | HMAC-SHA256 |
| Token Expiration | Configurable (default: 120 minutes) |
| Token Claims | UserID, Email, Role |
| Token Storage | Client-side (localStorage/sessionStorage) |
| Token Transmission | Authorization header (Bearer scheme) |

**Password Security:**

| Requirement | Specification |
|-------------|---------------|
| Hashing Algorithm | SHA-256 (minimum), BCrypt recommended |
| Minimum Length | 8 characters |
| Complexity | Recommended: uppercase, lowercase, number, special character |
| Password History | Prevent reuse of last 5 passwords (recommended) |
| Failed Attempts | Account lockout after 5 consecutive failures |

---

#### NFR-005: Authorization and Access Control

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-005 |
| **Category** | Security |
| **Description** | The system shall enforce role-based access control (RBAC) to restrict access to resources based on user roles. |
| **Metric** | Access control enforcement rate |
| **Target** | 100% of protected endpoints enforce authorization |

**Role-Based Access Matrix:**

| Resource | User | Lawyer | Admin |
|----------|------|--------|-------|
| Own Profile (Read) | ✓ | ✓ | ✓ |
| Own Profile (Update) | ✓ | ✓ | ✓ |
| All Users (Read) | ✗ | ✗ | ✓ |
| Lawyer Profiles (Read) | ✓ | ✓ | ✓ |
| Own Lawyer Profile (Update) | ✗ | ✓ | ✓ |
| Verify Lawyers | ✗ | ✗ | ✓ |
| Own Bookings (CRUD) | ✓ | ✓ | ✓ |
| All Bookings (Read) | ✗ | ✗ | ✓ |
| Update Booking Status | ✗ | ✓ | ✓ |
| Payment Sessions | ✓ | ✓ | ✓ |

**Authorization Implementation:**

| Mechanism | Description |
|-----------|-------------|
| Endpoint Protection | [Authorize] attribute on controllers |
| Role Validation | [Authorize(Roles = "Admin")] for admin endpoints |
| Resource Ownership | Verify user owns resource before modification |
| Token Validation | Validate JWT signature and expiration |

---

#### NFR-006: Data Protection

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-006 |
| **Category** | Security |
| **Description** | The system shall protect sensitive user data from unauthorized access, modification, or disclosure. |
| **Metric** | Data breach incidents |
| **Target** | Zero data breaches, 100% sensitive data protection |

**Data Classification:**

| Classification | Data Types | Protection Level |
|----------------|------------|------------------|
| **Confidential** | Passwords, payment info, admin secrets | Encrypted at rest and in transit |
| **Private** | Email, phone, address, booking details | Access controlled, encrypted in transit |
| **Internal** | User IDs, timestamps, status flags | Access controlled |
| **Public** | Lawyer profiles (verified), specializations | No restrictions |

**Data Protection Measures:**

| Measure | Implementation |
|---------|----------------|
| Password Storage | Hashed (never stored in plaintext) |
| Sensitive Fields | Excluded from API responses where not needed |
| Database Access | Parameterized queries (prevent SQL injection) |
| Input Validation | Server-side validation on all inputs |
| Output Encoding | Prevent XSS attacks |

---

#### NFR-007: Transport Security

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-007 |
| **Category** | Security |
| **Description** | The system shall encrypt all data transmitted between clients and servers. |
| **Metric** | Encryption protocol compliance |
| **Target** | 100% HTTPS enforcement, TLS 1.2 minimum |

**Transport Security Requirements:**

| Requirement | Specification |
|-------------|---------------|
| Protocol | HTTPS only (HTTP redirected) |
| TLS Version | TLS 1.2 minimum, TLS 1.3 recommended |
| Certificate | Valid SSL/TLS certificate from trusted CA |
| HSTS | HTTP Strict Transport Security enabled |
| Certificate Pinning | Recommended for mobile clients |

**API Security Headers:**

| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | Appropriate CSP rules | Prevent XSS |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-Frame-Options | DENY | Prevent clickjacking |
| X-XSS-Protection | 1; mode=block | XSS filter |
| Strict-Transport-Security | max-age=31536000 | Force HTTPS |

---

#### NFR-008: Security Monitoring and Audit

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-008 |
| **Category** | Security |
| **Description** | The system shall log security-relevant events and support audit trail analysis. |
| **Metric** | Audit log coverage |
| **Target** | 100% of security events logged, logs retained for 90 days minimum |

**Security Events to Log:**

| Event Category | Events |
|----------------|--------|
| Authentication | Login success/failure, logout, token refresh |
| Authorization | Access denied, role changes |
| Data Access | Sensitive data access, bulk data exports |
| Administrative | User creation/deletion, lawyer verification |
| Security | Rate limit triggers, suspicious activity |

**Audit Log Requirements:**

| Attribute | Requirement |
|-----------|-------------|
| Timestamp | UTC timestamp with millisecond precision |
| User Identity | User ID, IP address, user agent |
| Action | Specific action performed |
| Resource | Resource accessed or modified |
| Outcome | Success or failure with reason |
| Retention | Minimum 90 days, 1 year recommended |

### 4.3 Reliability Requirements

Reliability requirements define the availability, fault tolerance, and recovery capabilities of the LawyerConnect platform.

#### NFR-009: System Availability

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-009 |
| **Category** | Reliability |
| **Description** | The system shall maintain high availability to ensure users can access services when needed. |
| **Metric** | Uptime percentage |
| **Target** | 99.5% availability (approximately 43.8 hours downtime per year maximum) |

**Availability Targets:**

| Service Level | Uptime | Maximum Downtime |
|---------------|--------|------------------|
| **Standard** | 99.5% | 43.8 hours/year |
| **Enhanced** | 99.9% | 8.76 hours/year |
| **Premium** | 99.99% | 52.6 minutes/year |

**Availability Calculation:**
- Measured over rolling 30-day periods
- Excludes scheduled maintenance windows
- Scheduled maintenance: Maximum 4 hours/month during off-peak hours

**Service Level Objectives (SLOs):**

| Component | Availability Target |
|-----------|---------------------|
| Web Application | 99.5% |
| API Services | 99.5% |
| Database | 99.9% |
| Authentication Service | 99.9% |

---

#### NFR-010: Fault Tolerance

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-010 |
| **Category** | Reliability |
| **Description** | The system shall continue operating with degraded functionality when component failures occur. |
| **Metric** | Graceful degradation capability |
| **Target** | Core functionality available during single component failure |

**Fault Tolerance Strategies:**

| Failure Scenario | System Behavior | Recovery Action |
|------------------|-----------------|-----------------|
| Database connection lost | Queue write operations, serve cached reads | Auto-reconnect with exponential backoff |
| API server failure | Load balancer routes to healthy servers | Auto-restart failed instance |
| Authentication service down | Existing sessions continue, new logins queued | Failover to backup service |
| External service timeout | Return cached data or graceful error | Retry with circuit breaker |

**Error Handling Requirements:**

| Requirement | Specification |
|-------------|---------------|
| Exception Handling | All exceptions caught and logged |
| User Feedback | Friendly error messages (no stack traces) |
| Error Codes | Consistent HTTP status codes |
| Retry Logic | Automatic retry for transient failures |
| Circuit Breaker | Prevent cascade failures |

**Graceful Degradation Modes:**

| Mode | Trigger | Available Features |
|------|---------|-------------------|
| **Full Operation** | All systems healthy | All features |
| **Degraded** | Non-critical service down | Core features only |
| **Read-Only** | Database write issues | Browse, view profiles |
| **Maintenance** | Planned maintenance | Static maintenance page |

---

#### NFR-011: Disaster Recovery

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-011 |
| **Category** | Reliability |
| **Description** | The system shall support recovery from catastrophic failures with minimal data loss. |
| **Metric** | Recovery Time Objective (RTO), Recovery Point Objective (RPO) |
| **Target** | RTO: 4 hours, RPO: 1 hour |

**Recovery Objectives:**

| Metric | Target | Description |
|--------|--------|-------------|
| **RTO** (Recovery Time Objective) | 4 hours | Maximum time to restore service |
| **RPO** (Recovery Point Objective) | 1 hour | Maximum acceptable data loss |
| **MTTR** (Mean Time To Recovery) | 2 hours | Average recovery time |
| **MTBF** (Mean Time Between Failures) | 720 hours | Average time between failures |

**Backup Requirements:**

| Backup Type | Frequency | Retention | Storage |
|-------------|-----------|-----------|---------|
| Full Database Backup | Daily | 30 days | Off-site |
| Incremental Backup | Hourly | 7 days | Off-site |
| Transaction Logs | Continuous | 24 hours | Local + Off-site |
| Configuration Backup | On change | 90 days | Version control |

**Recovery Procedures:**

| Scenario | Recovery Steps | Target Time |
|----------|----------------|-------------|
| Database corruption | Restore from backup, replay transaction logs | 2 hours |
| Server failure | Deploy to standby server, restore data | 1 hour |
| Data center outage | Failover to secondary site | 4 hours |
| Ransomware attack | Isolate, restore from clean backup | 4 hours |

**Business Continuity:**

| Requirement | Specification |
|-------------|---------------|
| Backup Testing | Monthly restore tests |
| DR Drills | Quarterly disaster recovery exercises |
| Documentation | Runbooks for all recovery scenarios |
| Communication | Incident notification within 15 minutes |

### 4.4 Usability Requirements

Usability requirements define the accessibility, user interface standards, and learning curve expectations for the LawyerConnect platform.

#### NFR-012: Accessibility Compliance

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-012 |
| **Category** | Usability |
| **Description** | The system shall be accessible to users with disabilities, conforming to accessibility standards. |
| **Metric** | WCAG compliance level |
| **Target** | WCAG 2.1 Level AA compliance |

**Accessibility Requirements:**

| Category | Requirements |
|----------|--------------|
| **Perceivable** | Text alternatives for images, captions for media, sufficient color contrast |
| **Operable** | Keyboard navigation, no time limits, skip navigation links |
| **Understandable** | Readable text, predictable navigation, input assistance |
| **Robust** | Compatible with assistive technologies, valid HTML |

**Specific Accessibility Features:**

| Feature | Specification |
|---------|---------------|
| Color Contrast | Minimum 4.5:1 for normal text, 3:1 for large text |
| Font Size | Minimum 16px base, scalable up to 200% |
| Keyboard Navigation | All interactive elements accessible via keyboard |
| Screen Reader | ARIA labels on all interactive elements |
| Focus Indicators | Visible focus state on all focusable elements |
| Alt Text | Descriptive alt text for all meaningful images |
| Form Labels | All form inputs have associated labels |
| Error Messages | Clear, descriptive error messages with suggestions |

**Multi-Language Support:**

| Language | Support Level |
|----------|---------------|
| English | Full support (default) |
| Arabic | Full support (RTL layout) |

---

#### NFR-013: User Interface Standards

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-013 |
| **Category** | Usability |
| **Description** | The system shall provide a consistent, intuitive user interface following modern design principles. |
| **Metric** | UI consistency score, user satisfaction rating |
| **Target** | 100% design system compliance, user satisfaction ≥ 4.0/5.0 |

**Design System Requirements:**

| Component | Specification |
|-----------|---------------|
| Framework | Tailwind CSS utility-first approach |
| Color Palette | Consistent primary, secondary, accent colors |
| Typography | Consistent font family, sizes, weights |
| Spacing | 4px base unit grid system |
| Components | Reusable component library |
| Icons | Lucide React icon set |

**UI Consistency Standards:**

| Element | Standard |
|---------|----------|
| Buttons | Consistent styling, hover/active states |
| Forms | Consistent input styling, validation feedback |
| Navigation | Persistent header, clear navigation hierarchy |
| Cards | Consistent card layouts for lawyers, bookings |
| Modals | Consistent modal styling and behavior |
| Loading States | Consistent loading indicators |
| Error States | Consistent error message styling |

**Responsive Design Requirements:**

| Breakpoint | Screen Width | Layout |
|------------|--------------|--------|
| Mobile | < 640px | Single column, stacked navigation |
| Tablet | 640px - 1024px | Two column, collapsible navigation |
| Desktop | > 1024px | Multi-column, full navigation |

**Animation and Feedback:**

| Interaction | Feedback |
|-------------|----------|
| Button Click | Visual press state, loading indicator |
| Form Submit | Loading state, success/error message |
| Navigation | Smooth page transitions |
| Data Loading | Skeleton loaders or spinners |
| Notifications | Toast messages for actions |

---

#### NFR-014: Learnability and Efficiency

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-014 |
| **Category** | Usability |
| **Description** | The system shall be easy to learn for new users and efficient for experienced users. |
| **Metric** | Time to complete tasks, error rate |
| **Target** | New users complete core tasks within 5 minutes, error rate < 5% |

**Learnability Requirements:**

| User Type | Learning Curve Target |
|-----------|----------------------|
| New Client | Complete first booking within 5 minutes |
| New Lawyer | Complete profile setup within 10 minutes |
| New Admin | Navigate dashboard within 15 minutes |

**Task Efficiency Targets:**

| Task | Maximum Steps | Target Time |
|------|---------------|-------------|
| User Registration | 3 steps | 2 minutes |
| User Login | 2 steps | 30 seconds |
| Browse Lawyers | 1 step | Immediate |
| Filter Lawyers | 2 steps | 30 seconds |
| Book Consultation | 4 steps | 3 minutes |
| View Booking Status | 2 steps | 30 seconds |
| Update Profile | 3 steps | 2 minutes |

**User Guidance Features:**

| Feature | Description |
|---------|-------------|
| Onboarding | First-time user guidance (optional) |
| Tooltips | Contextual help on complex features |
| Empty States | Helpful messages when no data exists |
| Inline Help | Help text for form fields |
| Error Prevention | Confirmation dialogs for destructive actions |
| Undo Support | Ability to undo recent actions where applicable |

**Error Prevention and Recovery:**

| Measure | Implementation |
|---------|----------------|
| Input Validation | Real-time validation with clear feedback |
| Confirmation Dialogs | For booking cancellation, account deletion |
| Auto-Save | Draft saving for long forms |
| Clear Error Messages | Specific, actionable error descriptions |
| Recovery Suggestions | Guidance on how to fix errors |

### 4.5 Scalability Requirements

Scalability requirements define the system's ability to handle growth in users, data volume, and transaction load.

#### NFR-015: User Scalability

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-015 |
| **Category** | Scalability |
| **Description** | The system shall scale to accommodate growth in registered users and concurrent sessions. |
| **Metric** | Maximum supported users, concurrent sessions |
| **Target** | Support 100,000 registered users, 5,000 concurrent sessions |

**User Growth Projections:**

| Timeframe | Registered Users | Concurrent Users | Daily Active Users |
|-----------|------------------|------------------|-------------------|
| Launch | 1,000 | 100 | 200 |
| 6 Months | 10,000 | 500 | 2,000 |
| 1 Year | 50,000 | 2,000 | 10,000 |
| 2 Years | 100,000 | 5,000 | 25,000 |

**Scaling Strategies:**

| Strategy | Implementation |
|----------|----------------|
| Horizontal Scaling | Add web server instances behind load balancer |
| Vertical Scaling | Increase server resources (CPU, RAM) |
| Database Scaling | Read replicas, connection pooling |
| Caching | Redis/Memcached for session and data caching |
| CDN | Static asset delivery via CDN |

**Performance Under Scale:**

| User Load | Response Time Target | Throughput Target |
|-----------|---------------------|-------------------|
| 100 concurrent | ≤ 200ms | 500 RPS |
| 1,000 concurrent | ≤ 300ms | 2,000 RPS |
| 5,000 concurrent | ≤ 500ms | 5,000 RPS |

**Session Management:**

| Requirement | Specification |
|-------------|---------------|
| Session Storage | Distributed cache (Redis recommended) |
| Session Timeout | 120 minutes (configurable) |
| Session Limit | 5 concurrent sessions per user |
| Session Cleanup | Automatic cleanup of expired sessions |

---

#### NFR-016: Data Volume Scalability

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-016 |
| **Category** | Scalability |
| **Description** | The system shall efficiently handle growth in data volume without performance degradation. |
| **Metric** | Database size, query performance at scale |
| **Target** | Support 10 million records, maintain query performance < 500ms |

**Data Growth Projections:**

| Entity | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Users | 50,000 | 100,000 | 250,000 |
| Lawyers | 5,000 | 15,000 | 40,000 |
| Bookings | 200,000 | 1,000,000 | 5,000,000 |
| Payment Sessions | 150,000 | 750,000 | 3,500,000 |

**Database Optimization Strategies:**

| Strategy | Implementation |
|----------|----------------|
| Indexing | Indexes on all foreign keys and frequently queried columns |
| Partitioning | Table partitioning for bookings by date |
| Archiving | Move old records to archive tables |
| Query Optimization | Optimized queries, avoid N+1 problems |
| Connection Pooling | Efficient database connection management |

**Storage Requirements:**

| Component | Initial | Year 1 | Year 3 |
|-----------|---------|--------|--------|
| Database | 10 GB | 50 GB | 500 GB |
| Logs | 5 GB | 50 GB | 200 GB |
| Backups | 30 GB | 150 GB | 1.5 TB |
| Total | 45 GB | 250 GB | 2.2 TB |

**Data Retention and Archival:**

| Data Type | Active Retention | Archive Retention |
|-----------|------------------|-------------------|
| User Accounts | Indefinite | N/A |
| Bookings | 2 years | 7 years |
| Payment Records | 2 years | 10 years |
| Audit Logs | 90 days | 7 years |
| Session Data | 24 hours | Not archived |

### 4.6 Maintainability Requirements

Maintainability requirements define the code standards, documentation, and practices that ensure the system can be efficiently maintained and evolved.

#### NFR-017: Code Quality Standards

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-017 |
| **Category** | Maintainability |
| **Description** | The system codebase shall follow established coding standards and best practices to ensure maintainability. |
| **Metric** | Code quality metrics, technical debt ratio |
| **Target** | Code coverage ≥ 70%, technical debt ratio < 5% |

**Backend Code Standards (C#/.NET):**

| Standard | Requirement |
|----------|-------------|
| Naming Conventions | PascalCase for classes/methods, camelCase for variables |
| Code Organization | Layered architecture (Controllers, Services, Repositories) |
| SOLID Principles | Single responsibility, dependency injection |
| Error Handling | Consistent exception handling, no swallowed exceptions |
| Async/Await | Async methods for I/O operations |
| Comments | XML documentation for public APIs |

**Frontend Code Standards (TypeScript/React):**

| Standard | Requirement |
|----------|-------------|
| Naming Conventions | PascalCase for components, camelCase for functions |
| Component Structure | Functional components with hooks |
| Type Safety | Strict TypeScript, no `any` types |
| State Management | React Context for global state |
| Code Organization | Feature-based folder structure |
| Styling | Tailwind CSS utility classes |

**Code Quality Metrics:**

| Metric | Target | Tool |
|--------|--------|------|
| Code Coverage | ≥ 70% | Jest, xUnit |
| Cyclomatic Complexity | ≤ 10 per method | SonarQube |
| Duplication | < 3% | SonarQube |
| Technical Debt Ratio | < 5% | SonarQube |
| Code Smells | 0 critical, < 10 major | SonarQube |

**Version Control Standards:**

| Practice | Requirement |
|----------|-------------|
| Branching Strategy | GitFlow or trunk-based development |
| Commit Messages | Conventional commits format |
| Code Reviews | Required for all merges to main |
| Pull Requests | Template with checklist |
| Branch Protection | Main branch protected |

---

#### NFR-018: Documentation Requirements

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-018 |
| **Category** | Maintainability |
| **Description** | The system shall maintain comprehensive documentation for developers, operators, and users. |
| **Metric** | Documentation coverage, documentation freshness |
| **Target** | 100% API documentation, documentation updated within 1 sprint of changes |

**Documentation Types:**

| Type | Content | Audience |
|------|---------|----------|
| **API Documentation** | Endpoint specs, request/response formats | Developers |
| **Architecture Documentation** | System design, component diagrams | Architects, Developers |
| **Database Documentation** | Schema, relationships, migrations | DBAs, Developers |
| **Deployment Documentation** | Setup, configuration, deployment steps | DevOps, Operators |
| **User Documentation** | User guides, FAQs | End Users |
| **Code Documentation** | Inline comments, README files | Developers |

**API Documentation Requirements:**

| Element | Requirement |
|---------|-------------|
| Endpoint Description | Clear description of purpose |
| Request Format | Parameters, body schema, examples |
| Response Format | Success/error responses with examples |
| Authentication | Required auth method and permissions |
| Error Codes | All possible error responses |
| Examples | Working request/response examples |

**Code Documentation Standards:**

| Element | Requirement |
|---------|-------------|
| Public Methods | XML/JSDoc comments with parameters and returns |
| Complex Logic | Inline comments explaining reasoning |
| Configuration | Comments for all config options |
| README | Project setup, running, testing instructions |
| CHANGELOG | Version history with changes |

**Documentation Maintenance:**

| Practice | Requirement |
|----------|-------------|
| Review Cycle | Documentation reviewed with code changes |
| Versioning | Documentation versioned with releases |
| Accessibility | Documentation accessible to all team members |
| Format | Markdown for portability |
| Storage | Version controlled with code |

**Operational Documentation:**

| Document | Content |
|----------|---------|
| Runbooks | Step-by-step operational procedures |
| Troubleshooting Guide | Common issues and resolutions |
| Monitoring Guide | Metrics, alerts, dashboards |
| Incident Response | Escalation procedures, contacts |
| Disaster Recovery | Recovery procedures, RTO/RPO |

### 4.7 Compatibility Requirements

Compatibility requirements define the browser support, device support, and API versioning standards for the LawyerConnect platform.

#### NFR-019: Browser Compatibility

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-019 |
| **Category** | Compatibility |
| **Description** | The system shall function correctly across all major web browsers. |
| **Metric** | Browser compatibility test pass rate |
| **Target** | 100% functionality in supported browsers |

**Supported Browsers:**

| Browser | Minimum Version | Support Level | Market Share |
|---------|-----------------|---------------|--------------|
| Google Chrome | 90+ | Full Support | ~65% |
| Mozilla Firefox | 88+ | Full Support | ~8% |
| Microsoft Edge | 90+ | Full Support | ~5% |
| Safari | 14+ | Full Support | ~19% |
| Opera | 76+ | Full Support | ~2% |
| Samsung Internet | 14+ | Basic Support | ~3% |

**Unsupported Browsers:**

| Browser | Reason |
|---------|--------|
| Internet Explorer | End of life, security vulnerabilities |
| Legacy Edge (EdgeHTML) | Replaced by Chromium-based Edge |
| Browsers < 2 years old | Modern JavaScript features required |

**Browser Feature Requirements:**

| Feature | Requirement |
|---------|-------------|
| JavaScript | ES2020+ support |
| CSS | CSS Grid, Flexbox, Custom Properties |
| APIs | Fetch API, LocalStorage, SessionStorage |
| Security | TLS 1.2+, Secure Cookies |

**Cross-Browser Testing:**

| Test Type | Frequency | Tools |
|-----------|-----------|-------|
| Automated | Every build | Playwright, Cypress |
| Manual | Before release | BrowserStack, LambdaTest |
| Visual Regression | Weekly | Percy, Chromatic |

---

#### NFR-020: Device and Platform Compatibility

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-020 |
| **Category** | Compatibility |
| **Description** | The system shall provide a responsive experience across different devices and screen sizes. |
| **Metric** | Device compatibility test pass rate |
| **Target** | 100% core functionality on all supported devices |

**Supported Devices:**

| Device Type | Screen Size | Support Level |
|-------------|-------------|---------------|
| Desktop | ≥ 1024px | Full Support |
| Laptop | 1024px - 1440px | Full Support |
| Tablet | 768px - 1024px | Full Support |
| Mobile (Large) | 414px - 768px | Full Support |
| Mobile (Standard) | 375px - 414px | Full Support |
| Mobile (Small) | 320px - 375px | Basic Support |

**Responsive Breakpoints:**

| Breakpoint | Width | Layout Adjustments |
|------------|-------|-------------------|
| xs | < 640px | Single column, stacked elements |
| sm | 640px - 768px | Two columns where appropriate |
| md | 768px - 1024px | Sidebar navigation, multi-column |
| lg | 1024px - 1280px | Full desktop layout |
| xl | ≥ 1280px | Wide desktop layout |

**Platform Support:**

| Platform | Support Level |
|----------|---------------|
| Windows 10/11 | Full Support |
| macOS 11+ | Full Support |
| Linux (Ubuntu 20.04+) | Full Support |
| iOS 14+ | Full Support (Safari) |
| Android 10+ | Full Support (Chrome) |
| ChromeOS | Full Support |

**Touch and Input Support:**

| Input Method | Support |
|--------------|---------|
| Mouse/Trackpad | Full support |
| Touch Screen | Full support |
| Keyboard | Full support (accessibility) |
| Stylus | Basic support |

**Performance on Devices:**

| Device Class | Load Time Target | Interaction Target |
|--------------|------------------|-------------------|
| High-end Desktop | < 1 second | < 50ms |
| Mid-range Laptop | < 2 seconds | < 100ms |
| Tablet | < 3 seconds | < 150ms |
| Mobile (4G) | < 4 seconds | < 200ms |
| Mobile (3G) | < 8 seconds | < 300ms |

---

#### NFR-021: API Versioning and Backward Compatibility

| Attribute | Description |
|-----------|-------------|
| **ID** | NFR-021 |
| **Category** | Compatibility |
| **Description** | The system shall support API versioning to ensure backward compatibility during updates. |
| **Metric** | API version support duration, breaking change frequency |
| **Target** | Support previous API version for 12 months, < 2 breaking changes per year |

**API Versioning Strategy:**

| Aspect | Specification |
|--------|---------------|
| Versioning Scheme | URL path versioning (e.g., /api/v1/) |
| Current Version | v1 |
| Version Format | Major version only (v1, v2, v3) |
| Default Version | Latest stable version |

**Version Support Policy:**

| Version Status | Support Duration | Description |
|----------------|------------------|-------------|
| Current | Indefinite | Active development, full support |
| Previous | 12 months | Security fixes, critical bugs only |
| Deprecated | 6 months notice | No new features, migration support |
| End of Life | N/A | No support, may be removed |

**Backward Compatibility Rules:**

| Change Type | Compatibility | Action Required |
|-------------|---------------|-----------------|
| New endpoint | Compatible | No action |
| New optional field | Compatible | No action |
| New required field | Breaking | New version |
| Remove endpoint | Breaking | New version + deprecation |
| Change field type | Breaking | New version |
| Change response structure | Breaking | New version |

**API Deprecation Process:**

| Phase | Duration | Actions |
|-------|----------|---------|
| Announcement | Day 0 | Deprecation notice in docs and headers |
| Warning Period | 6 months | Deprecation warnings in responses |
| Migration Support | 6 months | Migration guides, support |
| End of Life | After 12 months | Endpoint returns 410 Gone |

**API Response Headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| X-API-Version | Current API version | X-API-Version: 1.0 |
| X-API-Deprecated | Deprecation warning | X-API-Deprecated: true |
| X-API-Sunset | End of life date | X-API-Sunset: 2026-01-01 |

**Client Compatibility:**

| Client Type | Compatibility Requirement |
|-------------|---------------------------|
| Web Frontend | Must use current API version |
| Mobile Apps | Support current and previous version |
| Third-party | Support current and previous version |

---

## 5. Use Cases

This section describes the use cases for the LawyerConnect platform, illustrating how different actors interact with the system to accomplish their goals. Each use case includes preconditions, main flow, alternate flows, and postconditions.

### 5.1 Use Case Diagram

The following diagram illustrates the primary use cases for each actor in the LawyerConnect system:

```mermaid
graph TB
    subgraph Actors
        CLIENT[👤 Client]
        LAWYER[⚖️ Lawyer]
        ADMIN[🔧 Administrator]
    end
    
    subgraph Client Use Cases
        UC001[UC-001: Browse Lawyers]
        UC002[UC-002: View Lawyer Profile]
        UC003[UC-003: Book Consultation]
        UC004[UC-004: Make Payment]
        UC005[UC-005: Manage Bookings]
    end
    
    subgraph Lawyer Use Cases
        UC006[UC-006: Register Lawyer Profile]
        UC007[UC-007: Manage Availability]
        UC008[UC-008: Handle Bookings]
        UC009[UC-009: View Earnings]
    end
    
    subgraph Admin Use Cases
        UC010[UC-010: Verify Lawyers]
        UC011[UC-011: Manage Users]
        UC012[UC-012: View Reports]
        UC013[UC-013: Configure System]
    end
    
    CLIENT --> UC001
    CLIENT --> UC002
    CLIENT --> UC003
    CLIENT --> UC004
    CLIENT --> UC005
    
    LAWYER --> UC006
    LAWYER --> UC007
    LAWYER --> UC008
    LAWYER --> UC009
    
    ADMIN --> UC010
    ADMIN --> UC011
    ADMIN --> UC012
    ADMIN --> UC013
    
    UC003 -.->|includes| UC002
    UC004 -.->|includes| UC003
    UC008 -.->|extends| UC007
```

#### Use Case Summary Table

| Use Case ID | Name | Primary Actor | Priority |
|-------------|------|---------------|----------|
| UC-001 | Browse Lawyers | Client | High |
| UC-002 | View Lawyer Profile | Client | High |
| UC-003 | Book Consultation | Client | High |
| UC-004 | Make Payment | Client | High |
| UC-005 | Manage Bookings | Client | High |
| UC-006 | Register Lawyer Profile | Lawyer | High |
| UC-007 | Manage Availability | Lawyer | Medium |
| UC-008 | Handle Bookings | Lawyer | High |
| UC-009 | View Earnings | Lawyer | Medium |
| UC-010 | Verify Lawyers | Administrator | High |
| UC-011 | Manage Users | Administrator | High |
| UC-012 | View Reports | Administrator | Medium |
| UC-013 | Configure System | Administrator | Medium |

### 5.2 Client Use Cases

This section documents the use cases for clients (regular users) who use the LawyerConnect platform to find and book consultations with lawyers.

---

#### UC-001: Browse Lawyers

**Use Case ID:** UC-001

**Use Case Name:** Browse Lawyers

**Actor:** Client

**Description:** The client browses the list of available lawyers on the platform to find suitable legal professionals for consultation.

**Preconditions:**
- The LawyerConnect platform is accessible
- At least one verified lawyer profile exists in the system

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Client navigates to the "Browse Lawyers" page | System displays a paginated list of lawyer profiles |
| 2 | Client views the list of lawyers with basic information | System shows lawyer name, specialization, experience, hourly rate, and verification status |
| 3 | Client applies filters (specialization, experience, rate) | System filters and displays matching lawyers |
| 4 | Client adjusts pagination (page number, items per page) | System updates the displayed list accordingly |
| 5 | Client selects a lawyer to view details | System navigates to the lawyer's profile page (UC-002) |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-001.1 | No lawyers match the filter criteria | System displays "No lawyers found" message with suggestion to adjust filters |
| AF-001.2 | Client is not logged in | System allows browsing but prompts login when attempting to book |
| AF-001.3 | Network error occurs | System displays error message and retry option |

**Postconditions:**
- Client has viewed the list of available lawyers
- Client may proceed to view a specific lawyer's profile

**Related Requirements:** FR-014, FR-016, FR-017, FR-018

---

#### UC-002: View Lawyer Profile

**Use Case ID:** UC-002

**Use Case Name:** View Lawyer Profile

**Actor:** Client

**Description:** The client views the detailed profile of a specific lawyer to evaluate their qualifications and suitability for consultation.

**Preconditions:**
- The LawyerConnect platform is accessible
- The selected lawyer profile exists in the system

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Client selects a lawyer from the browse list or enters lawyer profile URL | System retrieves and displays the lawyer's full profile |
| 2 | Client views lawyer's professional information | System displays specialization, years of experience, hourly rate, bio, and office address |
| 3 | Client views lawyer's verification status | System displays verification badge if lawyer is verified |
| 4 | Client views lawyer's contact information | System displays lawyer's associated user information (name, city) |
| 5 | Client decides to book a consultation | System provides "Book Consultation" button leading to UC-003 |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-002.1 | Lawyer profile does not exist | System displays "Lawyer not found" error (404) |
| AF-002.2 | Lawyer is not verified | System displays profile with "Pending Verification" notice |
| AF-002.3 | Client wants to return to browse | System provides navigation back to lawyer list |

**Postconditions:**
- Client has viewed the complete lawyer profile
- Client can make an informed decision about booking

**Related Requirements:** FR-012

---

#### UC-003: Book Consultation

**Use Case ID:** UC-003

**Use Case Name:** Book Consultation

**Actor:** Client

**Description:** The client schedules a consultation appointment with a selected lawyer by providing booking details.

**Preconditions:**
- Client is authenticated (logged in)
- Client has selected a lawyer (from UC-002)
- Lawyer profile exists and is active

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Client clicks "Book Consultation" on lawyer profile | System displays booking form |
| 2 | Client selects preferred date and time | System validates the selected time slot |
| 3 | Client enters optional notes about the consultation | System accepts the notes |
| 4 | Client reviews booking details (lawyer, date, time, rate) | System displays booking summary |
| 5 | Client confirms the booking | System creates booking with "Pending" status |
| 6 | System confirms booking creation | System displays booking confirmation with booking ID |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-003.1 | Client is not logged in | System redirects to login page, then returns to booking form |
| AF-003.2 | Selected time is in the past | System displays error "Please select a future date and time" |
| AF-003.3 | Lawyer profile no longer exists | System displays error and redirects to browse page |
| AF-003.4 | Client cancels booking process | System discards booking data and returns to lawyer profile |

**Postconditions:**
- New booking record created with "Pending" status
- Booking linked to client and lawyer
- Client can view booking in their booking list

**Business Rules:**
- Scheduled time must be in the future
- Booking is created with "Pending" status awaiting lawyer confirmation
- Client receives booking ID for reference

**Related Requirements:** FR-019, FR-025

---

#### UC-004: Make Payment

**Use Case ID:** UC-004

**Use Case Name:** Make Payment

**Actor:** Client

**Description:** The client makes a payment for a confirmed consultation booking.

**Preconditions:**
- Client is authenticated (logged in)
- Client has an existing booking (from UC-003)
- Booking status is "Confirmed" or payment is required

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Client navigates to booking details or payment page | System displays booking information and payment amount |
| 2 | Client reviews payment amount (based on lawyer's hourly rate) | System shows calculated amount |
| 3 | Client initiates payment | System creates payment session with "Pending" status |
| 4 | Client completes payment through payment interface | System processes payment (future: payment gateway integration) |
| 5 | Client receives payment confirmation | System updates payment status to "Completed" |
| 6 | System confirms payment | System displays payment receipt with session ID |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-004.1 | Payment processing fails | System displays error message, payment status remains "Pending" |
| AF-004.2 | Client cancels payment | System retains payment session in "Pending" status for retry |
| AF-004.3 | Booking is cancelled before payment | System prevents payment and displays booking cancellation notice |
| AF-004.4 | Network error during payment | System displays error and allows retry |

**Postconditions:**
- Payment session created and linked to booking
- Payment status updated to "Completed" on success
- Client can view payment details in their account

**Business Rules:**
- Payment amount calculated from lawyer's hourly rate
- Payment session linked to specific booking
- Provider session ID stored for transaction tracking

**Related Requirements:** FR-026, FR-027, FR-028, FR-029, FR-030

---

#### UC-005: Manage Bookings

**Use Case ID:** UC-005

**Use Case Name:** Manage Bookings

**Actor:** Client

**Description:** The client views and manages their consultation bookings, including viewing status and cancelling pending bookings.

**Preconditions:**
- Client is authenticated (logged in)
- Client has at least one booking in the system

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Client navigates to "My Bookings" page | System retrieves and displays client's bookings |
| 2 | Client views list of all bookings | System shows booking details (lawyer, date, status, notes) |
| 3 | Client selects a specific booking | System displays detailed booking information |
| 4 | Client views booking status | System shows current status (Pending, Confirmed, Completed, Cancelled) |
| 5 | Client views associated payment information | System displays payment status if payment exists |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-005.1 | Client has no bookings | System displays "No bookings found" message with link to browse lawyers |
| AF-005.2 | Client wants to cancel a pending booking | System prompts confirmation, then updates status to "Cancelled" |
| AF-005.3 | Client attempts to cancel a confirmed booking | System displays message that confirmed bookings require lawyer/admin intervention |
| AF-005.4 | Client wants to view booking history | System allows filtering by status (all, pending, confirmed, completed, cancelled) |

**Postconditions:**
- Client has viewed their booking information
- Booking status may be updated to "Cancelled" if cancellation was performed

**Business Rules:**
- Only pending bookings can be cancelled by the client
- Confirmed bookings require lawyer or admin to cancel
- Cancelled bookings cannot be reactivated
- Booking history is retained for reference

**Related Requirements:** FR-020, FR-021, FR-024, FR-025

### 5.3 Lawyer Use Cases

This section documents the use cases for lawyers who use the LawyerConnect platform to offer their legal consultation services and manage client bookings.

---

#### UC-006: Register Lawyer Profile

**Use Case ID:** UC-006

**Use Case Name:** Register Lawyer Profile

**Actor:** Lawyer

**Description:** A user with lawyer credentials creates a professional lawyer profile on the platform to offer consultation services.

**Preconditions:**
- User is authenticated (logged in)
- User has registered with "Lawyer" role or has a valid user account
- User does not already have a lawyer profile

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Lawyer navigates to "Create Lawyer Profile" page | System displays lawyer profile registration form |
| 2 | Lawyer enters specialization (e.g., Criminal Law, Family Law) | System validates and accepts the specialization |
| 3 | Lawyer enters years of experience | System validates numeric input |
| 4 | Lawyer enters hourly rate for consultations | System validates and accepts the rate |
| 5 | Lawyer enters professional bio/description | System accepts the bio text |
| 6 | Lawyer enters office address | System accepts the address |
| 7 | Lawyer submits the profile | System creates lawyer profile with "Pending Verification" status |
| 8 | System confirms profile creation | System displays success message and profile preview |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-006.1 | User already has a lawyer profile | System displays error (409 Conflict) "Lawyer profile already exists" |
| AF-006.2 | Required fields are missing | System highlights missing fields and prevents submission |
| AF-006.3 | Invalid data format (e.g., negative experience) | System displays validation error messages |
| AF-006.4 | User is not logged in | System redirects to login page |

**Postconditions:**
- New lawyer profile created and linked to user account
- Profile status set to "Pending Verification"
- Profile awaits administrator verification before becoming publicly visible
- Lawyer can view and edit their profile

**Business Rules:**
- One lawyer profile per user account
- Profile requires admin verification before appearing in search results
- All required fields must be completed
- Hourly rate must be a positive number

**Related Requirements:** FR-011, FR-032

---

#### UC-007: Manage Availability

**Use Case ID:** UC-007

**Use Case Name:** Manage Availability

**Actor:** Lawyer

**Description:** The lawyer manages their profile information and availability settings to control when they can receive consultation bookings.

**Preconditions:**
- Lawyer is authenticated (logged in)
- Lawyer has an existing lawyer profile

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Lawyer navigates to "My Profile" or "Manage Profile" page | System displays current lawyer profile information |
| 2 | Lawyer views current profile details | System shows specialization, experience, rate, bio, address, verification status |
| 3 | Lawyer updates profile information (bio, rate, address) | System validates and saves changes |
| 4 | Lawyer updates specialization if needed | System accepts the updated specialization |
| 5 | Lawyer saves profile changes | System confirms profile update |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-007.1 | Lawyer profile does not exist | System displays error (404) and prompts to create profile |
| AF-007.2 | Invalid data entered | System displays validation errors and prevents save |
| AF-007.3 | Lawyer wants to deactivate profile | System provides option to contact admin for profile deactivation |
| AF-007.4 | Network error during save | System displays error and retains unsaved changes |

**Postconditions:**
- Lawyer profile information updated in the database
- Changes reflected immediately on public profile (if verified)
- Lawyer can continue to receive bookings based on updated information

**Business Rules:**
- Lawyers can only edit their own profile
- Verification status cannot be changed by the lawyer
- Profile changes are immediately effective
- Historical booking data is not affected by profile changes

**Related Requirements:** FR-013

---

#### UC-008: Handle Bookings

**Use Case ID:** UC-008

**Use Case Name:** Handle Bookings

**Actor:** Lawyer

**Description:** The lawyer views and manages incoming consultation booking requests, including accepting, declining, or completing bookings.

**Preconditions:**
- Lawyer is authenticated (logged in)
- Lawyer has an existing lawyer profile
- At least one booking exists for the lawyer

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Lawyer navigates to "My Bookings" or dashboard | System retrieves and displays lawyer's bookings |
| 2 | Lawyer views list of all assigned bookings | System shows booking details (client, date, time, status, notes) |
| 3 | Lawyer selects a pending booking | System displays detailed booking information |
| 4 | Lawyer reviews client information and booking notes | System shows client name and consultation notes |
| 5 | Lawyer accepts the booking | System updates booking status to "Confirmed" |
| 6 | After consultation, lawyer marks booking as completed | System updates booking status to "Completed" |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-008.1 | Lawyer has no bookings | System displays "No bookings found" message |
| AF-008.2 | Lawyer declines a pending booking | System updates booking status to "Cancelled" |
| AF-008.3 | Lawyer wants to reschedule | System prompts lawyer to contact client (manual process) |
| AF-008.4 | Booking is already cancelled by client | System displays booking with "Cancelled" status (read-only) |
| AF-008.5 | Lawyer filters bookings by status | System displays filtered booking list |

**Postconditions:**
- Booking status updated based on lawyer's action
- Client can view updated booking status
- Completed bookings are recorded for history and earnings

**Booking Status Transitions (Lawyer Actions):**

```mermaid
stateDiagram-v2
    Pending --> Confirmed: Lawyer Accepts
    Pending --> Cancelled: Lawyer Declines
    Confirmed --> Completed: Consultation Done
    Confirmed --> Cancelled: Lawyer Cancels
```

**Business Rules:**
- Lawyers can only manage bookings assigned to them
- Status changes are logged with timestamp
- Completed bookings contribute to lawyer's earnings
- Cancelled bookings may require refund processing

**Related Requirements:** FR-022, FR-023, FR-025

---

#### UC-009: View Earnings

**Use Case ID:** UC-009

**Use Case Name:** View Earnings

**Actor:** Lawyer

**Description:** The lawyer views their earnings summary and payment history from completed consultations.

**Preconditions:**
- Lawyer is authenticated (logged in)
- Lawyer has an existing lawyer profile
- Lawyer has completed at least one consultation with payment

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Lawyer navigates to "Earnings" or "Payment History" section | System retrieves payment data for lawyer's bookings |
| 2 | Lawyer views earnings summary | System displays total earnings, completed consultations count |
| 3 | Lawyer views list of completed payments | System shows payment details (booking, amount, date, status) |
| 4 | Lawyer filters payments by date range | System displays filtered payment list |
| 5 | Lawyer views individual payment details | System shows payment session information |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-009.1 | Lawyer has no completed payments | System displays "No earnings yet" message with encouragement |
| AF-009.2 | Payment data is unavailable | System displays error and suggests retry |
| AF-009.3 | Lawyer wants to export earnings report | System provides data in viewable format (future: export feature) |

**Postconditions:**
- Lawyer has viewed their earnings information
- No data modifications occur (read-only operation)

**Earnings Summary Display:**

| Metric | Description |
|--------|-------------|
| Total Earnings | Sum of all completed payment amounts |
| Completed Consultations | Count of bookings with "Completed" status |
| Pending Payments | Payments awaiting confirmation |
| Average Rate | Average payment per consultation |

**Business Rules:**
- Earnings calculated from completed payment sessions
- Only payments linked to lawyer's bookings are included
- Pending and failed payments are shown separately
- Historical data retained for tax and accounting purposes

**Related Requirements:** FR-028, FR-029

### 5.4 Admin Use Cases

This section documents the use cases for administrators who manage the LawyerConnect platform, including user management, lawyer verification, and system monitoring.

---

#### UC-010: Verify Lawyers

**Use Case ID:** UC-010

**Use Case Name:** Verify Lawyers

**Actor:** Administrator

**Description:** The administrator reviews and verifies lawyer profiles to ensure quality and trustworthiness of legal professionals on the platform.

**Preconditions:**
- Administrator is authenticated (logged in) with Admin role
- At least one lawyer profile exists with pending verification status

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Admin navigates to "Lawyer Verification" or admin dashboard | System displays list of lawyers pending verification |
| 2 | Admin views list of unverified lawyer profiles | System shows lawyer name, specialization, registration date |
| 3 | Admin selects a lawyer profile to review | System displays complete lawyer profile details |
| 4 | Admin reviews lawyer credentials and information | System shows specialization, experience, bio, office address |
| 5 | Admin verifies the lawyer profile | System updates lawyer's IsVerified status to true |
| 6 | System confirms verification | System displays success message, lawyer profile now visible in search |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-010.1 | No lawyers pending verification | System displays "No pending verifications" message |
| AF-010.2 | Admin rejects lawyer profile | System keeps IsVerified as false, optionally records rejection reason |
| AF-010.3 | Lawyer profile information is incomplete | Admin contacts lawyer to request additional information |
| AF-010.4 | Admin wants to filter by registration date | System allows sorting/filtering pending verifications |

**Postconditions:**
- Lawyer verification status updated
- Verified lawyers appear in public search results
- Verification action logged for audit purposes

**Verification Workflow:**

```mermaid
flowchart LR
    A[Lawyer Registers] --> B[Profile Created<br/>Unverified]
    B --> C{Admin Reviews}
    C -->|Approve| D[Profile Verified<br/>Visible in Search]
    C -->|Reject| E[Profile Remains<br/>Unverified]
    E --> F[Lawyer Updates<br/>Profile]
    F --> C
```

**Business Rules:**
- Only Admin role can verify lawyers
- Verification is a one-way operation (cannot unverify through this use case)
- Verified status is displayed on lawyer's public profile
- All verification actions are logged with admin ID and timestamp

**Related Requirements:** FR-015, FR-032

---

#### UC-011: Manage Users

**Use Case ID:** UC-011

**Use Case Name:** Manage Users

**Actor:** Administrator

**Description:** The administrator manages user accounts on the platform, including viewing, modifying, and deactivating accounts.

**Preconditions:**
- Administrator is authenticated (logged in) with Admin role

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Admin navigates to "User Management" section | System displays paginated list of all users |
| 2 | Admin views user list with basic information | System shows user name, email, role, registration date |
| 3 | Admin searches or filters users | System filters users by name, email, or role |
| 4 | Admin selects a user to view details | System displays complete user profile |
| 5 | Admin modifies user information if needed | System validates and saves changes |
| 6 | Admin updates user role if needed | System updates user role (User, Lawyer, Admin) |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-011.1 | No users match search criteria | System displays "No users found" message |
| AF-011.2 | Admin deactivates a user account | System soft-deletes user, preventing login |
| AF-011.3 | Admin reactivates a deactivated account | System restores user access |
| AF-011.4 | Admin attempts to modify own account | System allows with appropriate warnings |
| AF-011.5 | Invalid role specified | System displays error (400 Bad Request) |

**Postconditions:**
- User account information updated as requested
- User role changes take effect immediately
- Deactivated users cannot log in
- All admin actions logged for audit

**User Management Operations:**

| Operation | Description | Effect |
|-----------|-------------|--------|
| View | View user profile details | Read-only |
| Edit | Modify user information | Updates profile |
| Change Role | Update user role | Changes permissions |
| Deactivate | Soft-delete account | Prevents login |
| Reactivate | Restore account | Enables login |

**Business Rules:**
- Only Admin role can manage other users
- User data is retained even when deactivated (soft delete)
- Role changes affect user permissions immediately
- Admin cannot delete their own admin privileges

**Related Requirements:** FR-009, FR-010, FR-031

---

#### UC-012: View Reports

**Use Case ID:** UC-012

**Use Case Name:** View Reports

**Actor:** Administrator

**Description:** The administrator views system reports and analytics to monitor platform activity, user engagement, and business metrics.

**Preconditions:**
- Administrator is authenticated (logged in) with Admin role
- System has collected sufficient data for reporting

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Admin navigates to "Reports" or "Analytics" dashboard | System displays main reporting dashboard |
| 2 | Admin views summary statistics | System shows key metrics (users, lawyers, bookings, payments) |
| 3 | Admin selects a specific report type | System displays detailed report |
| 4 | Admin sets date range for report | System filters data by specified dates |
| 5 | Admin views report data and visualizations | System displays charts, tables, and metrics |
| 6 | Admin exports report data if needed | System provides data export (future feature) |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-012.1 | No data available for selected period | System displays "No data available" message |
| AF-012.2 | Report generation takes time | System shows loading indicator |
| AF-012.3 | Admin wants to compare periods | System allows side-by-side comparison |
| AF-012.4 | Data export fails | System displays error and retry option |

**Postconditions:**
- Admin has viewed requested reports
- No data modifications occur (read-only operation)
- Report access logged for audit purposes

**Available Reports:**

| Report | Metrics | Purpose |
|--------|---------|---------|
| User Statistics | Total users, new registrations, active users | Track user growth |
| Lawyer Statistics | Total lawyers, pending verifications, verified lawyers | Monitor lawyer onboarding |
| Booking Statistics | Total bookings, by status, completion rate | Analyze booking activity |
| Payment Statistics | Total payments, revenue, success rate | Track financial performance |
| System Health | Response times, error rates, uptime | Monitor system performance |

**Dashboard Metrics:**

```mermaid
graph TB
    subgraph Key Performance Indicators
        M1[Total Users]
        M2[Active Lawyers]
        M3[Bookings This Month]
        M4[Revenue This Month]
        M5[Completion Rate]
        M6[System Uptime]
    end
```

**Business Rules:**
- Reports are read-only and do not modify data
- Historical data retained for trend analysis
- Dashboard updates within 5 seconds of data changes
- Sensitive financial data accessible only to Admin role

**Related Requirements:** FR-035

---

#### UC-013: Configure System

**Use Case ID:** UC-013

**Use Case Name:** Configure System

**Actor:** Administrator

**Description:** The administrator configures system settings and parameters to customize platform behavior and policies.

**Preconditions:**
- Administrator is authenticated (logged in) with Admin role
- System configuration interface is accessible

**Main Flow:**

| Step | Actor Action | System Response |
|------|--------------|-----------------|
| 1 | Admin navigates to "System Settings" or "Configuration" | System displays current configuration settings |
| 2 | Admin views current system parameters | System shows authentication, security, and business settings |
| 3 | Admin modifies configuration values | System validates input values |
| 4 | Admin saves configuration changes | System applies new settings |
| 5 | System confirms configuration update | System displays success message |

**Alternate Flows:**

| ID | Condition | Flow |
|----|-----------|------|
| AF-013.1 | Invalid configuration value | System displays validation error, prevents save |
| AF-013.2 | Configuration change requires restart | System notifies admin of required action |
| AF-013.3 | Admin wants to reset to defaults | System provides reset option with confirmation |
| AF-013.4 | Configuration change fails | System displays error, retains previous settings |

**Postconditions:**
- System configuration updated as requested
- Changes take effect immediately or after restart (as applicable)
- Configuration changes logged for audit

**Configurable Settings:**

| Category | Settings | Description |
|----------|----------|-------------|
| Authentication | JWT expiration, token settings | Control session duration |
| Security | Rate limiting, CORS origins | Manage security policies |
| Business Rules | Default pagination, booking rules | Customize business logic |
| Notifications | Email settings (future) | Configure notifications |
| Maintenance | Backup settings, log retention | System maintenance |

**Configuration Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| JWT Expiration | Minutes | 120 | Token validity period |
| Page Size | Integer | 10 | Default pagination limit |
| Rate Limit | Requests/min | 100 | API rate limiting |
| Min Password Length | Integer | 8 | Password policy |

**Business Rules:**
- Only Admin role can modify system configuration
- Critical settings require confirmation before change
- Configuration changes are logged with admin ID and timestamp
- Some settings may require system restart to take effect

**Related Requirements:** FR-035

---

### 5.5 Use Case Traceability Matrix

The following matrix maps use cases to their related functional requirements:

| Use Case | Related Requirements | Actor |
|----------|---------------------|-------|
| UC-001: Browse Lawyers | FR-014, FR-016, FR-017, FR-018 | Client |
| UC-002: View Lawyer Profile | FR-012 | Client |
| UC-003: Book Consultation | FR-019, FR-025 | Client |
| UC-004: Make Payment | FR-026, FR-027, FR-028, FR-029, FR-030 | Client |
| UC-005: Manage Bookings | FR-020, FR-021, FR-024, FR-025 | Client |
| UC-006: Register Lawyer Profile | FR-011, FR-032 | Lawyer |
| UC-007: Manage Availability | FR-013 | Lawyer |
| UC-008: Handle Bookings | FR-022, FR-023, FR-025 | Lawyer |
| UC-009: View Earnings | FR-028, FR-029 | Lawyer |
| UC-010: Verify Lawyers | FR-015, FR-032 | Administrator |
| UC-011: Manage Users | FR-009, FR-010, FR-031 | Administrator |
| UC-012: View Reports | FR-035 | Administrator |
| UC-013: Configure System | FR-035 | Administrator |

---

## 6. Data Requirements

### 6.1 Entity-Relationship Diagram

The following entity-relationship diagram illustrates the data model for the LawyerConnect platform, showing all entities and their relationships:

```mermaid
erDiagram
    USER ||--o| LAWYER : "has profile"
    USER ||--o{ BOOKING : "makes"
    LAWYER ||--o{ BOOKING : "receives"
    BOOKING ||--o| PAYMENT_SESSION : "has"

    USER {
        int Id PK
        string FullName
        string Email UK
        string PasswordHash
        string Role
        string Phone
        string City
        datetime CreatedAt
    }

    LAWYER {
        int Id PK
        int UserId FK,UK
        string Specialization
        int ExperienceYears
        decimal Price
        bool Verified
        string Address
        decimal Latitude
        decimal Longitude
        datetime CreatedAt
    }

    BOOKING {
        int Id PK
        int UserId FK
        int LawyerId FK
        datetime Date
        string Status
        string PaymentStatus
        string TransactionId
        datetime CreatedAt
    }

    PAYMENT_SESSION {
        int Id PK
        int BookingId FK,UK
        decimal Amount
        string Status
        string Provider
        string ProviderSessionId
        datetime CreatedAt
    }
```

**Diagram Legend:**
- **PK**: Primary Key
- **FK**: Foreign Key
- **UK**: Unique Key
- **||--o|**: One-to-Zero-or-One relationship
- **||--o{**: One-to-Many relationship

### 6.2 Entity Descriptions

This section documents all data entities in the LawyerConnect system with their complete attribute specifications.

#### 6.2.1 User Entity

The User entity represents all registered users in the system, including clients, lawyers, and administrators.

| Attribute | Data Type | Size | Nullable | Description |
|-----------|-----------|------|----------|-------------|
| **Id** | int | 4 bytes | No | Primary key, auto-incremented unique identifier |
| **FullName** | nvarchar | 255 | No | User's complete name |
| **Email** | nvarchar | 255 | No | User's email address (unique constraint) |
| **PasswordHash** | nvarchar | 255 | No | BCrypt hashed password |
| **Role** | nvarchar | 50 | No | User role: "User", "Lawyer", or "Admin" |
| **Phone** | nvarchar | 20 | No | Contact phone number |
| **City** | nvarchar | 100 | No | User's city of residence |
| **CreatedAt** | datetime2 | 8 bytes | No | Account creation timestamp |

**Indexes:**
- Primary Key: `Id`
- Unique Index: `Email`

#### 6.2.2 Lawyer Entity

The Lawyer entity stores professional profile information for legal professionals registered on the platform.

| Attribute | Data Type | Size | Nullable | Description |
|-----------|-----------|------|----------|-------------|
| **Id** | int | 4 bytes | No | Primary key, auto-incremented unique identifier |
| **UserId** | int | 4 bytes | No | Foreign key referencing User.Id (unique constraint) |
| **Specialization** | nvarchar | 100 | No | Area of legal expertise (e.g., "Criminal Law", "Family Law") |
| **ExperienceYears** | int | 4 bytes | No | Years of professional experience |
| **Price** | decimal | (18,2) | No | Hourly consultation rate in local currency |
| **Verified** | bit | 1 byte | No | Verification status (true = verified by admin) |
| **Address** | nvarchar | 500 | No | Office or practice address |
| **Latitude** | decimal | (10,8) | No | Geographic latitude coordinate |
| **Longitude** | decimal | (10,8) | No | Geographic longitude coordinate |
| **CreatedAt** | datetime2 | 8 bytes | No | Profile creation timestamp |

**Indexes:**
- Primary Key: `Id`
- Unique Index: `UserId`
- Foreign Key: `UserId` → `User.Id`

#### 6.2.3 Booking Entity

The Booking entity represents consultation appointments between clients and lawyers.

| Attribute | Data Type | Size | Nullable | Description |
|-----------|-----------|------|----------|-------------|
| **Id** | int | 4 bytes | No | Primary key, auto-incremented unique identifier |
| **UserId** | int | 4 bytes | No | Foreign key referencing User.Id (client) |
| **LawyerId** | int | 4 bytes | No | Foreign key referencing Lawyer.Id |
| **Date** | datetime2 | 8 bytes | No | Scheduled consultation date and time |
| **Status** | nvarchar | 50 | No | Booking status: "Pending", "Confirmed", "Completed", "Cancelled" |
| **PaymentStatus** | nvarchar | 50 | No | Payment status: "Pending", "Paid", "Refunded" |
| **TransactionId** | nvarchar | 100 | No | External payment transaction reference |
| **CreatedAt** | datetime2 | 8 bytes | No | Booking creation timestamp |

**Indexes:**
- Primary Key: `Id`
- Foreign Key: `UserId` → `User.Id` (Restrict delete)
- Foreign Key: `LawyerId` → `Lawyer.Id` (Restrict delete)

#### 6.2.4 PaymentSession Entity

The PaymentSession entity tracks payment transactions for consultation bookings.

| Attribute | Data Type | Size | Nullable | Description |
|-----------|-----------|------|----------|-------------|
| **Id** | int | 4 bytes | No | Primary key, auto-incremented unique identifier |
| **BookingId** | int | 4 bytes | No | Foreign key referencing Booking.Id (unique constraint) |
| **Amount** | decimal | (18,2) | No | Payment amount in local currency |
| **Status** | nvarchar | 50 | No | Payment status: "Pending", "Completed", "Failed", "Refunded" |
| **Provider** | nvarchar | 50 | No | Payment provider name (e.g., "Stripe", "PayPal") |
| **ProviderSessionId** | nvarchar | 255 | No | External payment provider session/transaction ID |
| **CreatedAt** | datetime2 | 8 bytes | No | Payment session creation timestamp |

**Indexes:**
- Primary Key: `Id`
- Unique Index: `BookingId`
- Foreign Key: `BookingId` → `Booking.Id`

### 6.3 Data Relationships

This section documents all relationships between entities in the LawyerConnect database schema.

#### 6.3.1 Relationship Summary

| Relationship | Type | Parent Entity | Child Entity | Cardinality |
|--------------|------|---------------|--------------|-------------|
| User-Lawyer | One-to-Zero-or-One | User | Lawyer | 1:0..1 |
| User-Booking | One-to-Many | User | Booking | 1:0..* |
| Lawyer-Booking | One-to-Many | Lawyer | Booking | 1:0..* |
| Booking-PaymentSession | One-to-Zero-or-One | Booking | PaymentSession | 1:0..1 |

#### 6.3.2 User-Lawyer Relationship

```mermaid
graph LR
    U[User] -->|1:0..1| L[Lawyer]
```

| Attribute | Value |
|-----------|-------|
| **Relationship Type** | One-to-Zero-or-One |
| **Parent Entity** | User |
| **Child Entity** | Lawyer |
| **Foreign Key** | Lawyer.UserId → User.Id |
| **Constraint** | Unique constraint on Lawyer.UserId |
| **Delete Behavior** | Cascade (deleting User deletes Lawyer profile) |
| **Description** | A User may optionally have one Lawyer profile. Only users with Role="Lawyer" should have an associated Lawyer record. |

**Business Rules:**
- Each User can have at most one Lawyer profile
- A Lawyer profile must be associated with exactly one User
- The User must exist before creating a Lawyer profile

#### 6.3.3 User-Booking Relationship

```mermaid
graph LR
    U[User] -->|1:0..*| B[Booking]
```

| Attribute | Value |
|-----------|-------|
| **Relationship Type** | One-to-Many |
| **Parent Entity** | User |
| **Child Entity** | Booking |
| **Foreign Key** | Booking.UserId → User.Id |
| **Delete Behavior** | Restrict (cannot delete User with existing Bookings) |
| **Description** | A User (client) can make zero or more Bookings. Each Booking belongs to exactly one User. |

**Business Rules:**
- A User can have multiple Bookings
- Each Booking must be associated with exactly one User (client)
- Bookings are preserved even if the User account is deactivated (for historical records)
- Delete restriction ensures booking history is maintained

#### 6.3.4 Lawyer-Booking Relationship

```mermaid
graph LR
    L[Lawyer] -->|1:0..*| B[Booking]
```

| Attribute | Value |
|-----------|-------|
| **Relationship Type** | One-to-Many |
| **Parent Entity** | Lawyer |
| **Child Entity** | Booking |
| **Foreign Key** | Booking.LawyerId → Lawyer.Id |
| **Delete Behavior** | Restrict (cannot delete Lawyer with existing Bookings) |
| **Description** | A Lawyer can receive zero or more Bookings. Each Booking is assigned to exactly one Lawyer. |

**Business Rules:**
- A Lawyer can have multiple Bookings
- Each Booking must be associated with exactly one Lawyer
- Bookings are preserved even if the Lawyer profile is deactivated
- Delete restriction ensures consultation history is maintained

#### 6.3.5 Booking-PaymentSession Relationship

```mermaid
graph LR
    B[Booking] -->|1:0..1| P[PaymentSession]
```

| Attribute | Value |
|-----------|-------|
| **Relationship Type** | One-to-Zero-or-One |
| **Parent Entity** | Booking |
| **Child Entity** | PaymentSession |
| **Foreign Key** | PaymentSession.BookingId → Booking.Id |
| **Constraint** | Unique constraint on PaymentSession.BookingId |
| **Delete Behavior** | Cascade (deleting Booking deletes PaymentSession) |
| **Description** | A Booking may have zero or one PaymentSession. Each PaymentSession is linked to exactly one Booking. |

**Business Rules:**
- Each Booking can have at most one PaymentSession
- A PaymentSession must be associated with exactly one Booking
- PaymentSession is created when payment is initiated
- The Booking must exist before creating a PaymentSession

#### 6.3.6 Complete Relationship Diagram

```mermaid
graph TB
    subgraph Entities
        U[USER<br/>Id, FullName, Email, Role...]
        L[LAWYER<br/>Id, UserId, Specialization...]
        B[BOOKING<br/>Id, UserId, LawyerId, Date...]
        P[PAYMENT_SESSION<br/>Id, BookingId, Amount...]
    end
    
    U -->|"1:0..1<br/>has profile"| L
    U -->|"1:0..*<br/>makes (Restrict)"| B
    L -->|"1:0..*<br/>receives (Restrict)"| B
    B -->|"1:0..1<br/>has"| P
```

#### 6.3.7 Referential Integrity Rules

| Rule ID | Description | Enforcement |
|---------|-------------|-------------|
| **RI-001** | Lawyer.UserId must reference an existing User.Id | Foreign Key Constraint |
| **RI-002** | Booking.UserId must reference an existing User.Id | Foreign Key Constraint |
| **RI-003** | Booking.LawyerId must reference an existing Lawyer.Id | Foreign Key Constraint |
| **RI-004** | PaymentSession.BookingId must reference an existing Booking.Id | Foreign Key Constraint |
| **RI-005** | Cannot delete User with associated Bookings | Restrict Delete |
| **RI-006** | Cannot delete Lawyer with associated Bookings | Restrict Delete |
| **RI-007** | Each User can have at most one Lawyer profile | Unique Constraint |
| **RI-008** | Each Booking can have at most one PaymentSession | Unique Constraint |

### 6.4 Data Validation Rules

This section documents all data validation rules and constraints enforced by the LawyerConnect system.

#### 6.4.1 User Entity Validation Rules

| Rule ID | Field | Rule | Error Message |
|---------|-------|------|---------------|
| **UV-001** | Email | Must be unique across all users | "Email address already registered" |
| **UV-002** | Email | Must be valid email format (RFC 5322) | "Invalid email format" |
| **UV-003** | Email | Required, cannot be empty | "Email is required" |
| **UV-004** | Email | Maximum length: 255 characters | "Email exceeds maximum length" |
| **UV-005** | FullName | Required, cannot be empty | "Full name is required" |
| **UV-006** | FullName | Maximum length: 255 characters | "Name exceeds maximum length" |
| **UV-007** | PasswordHash | Required, cannot be empty | "Password is required" |
| **UV-008** | Password (input) | Minimum length: 8 characters | "Password must be at least 8 characters" |
| **UV-009** | Role | Must be one of: "User", "Lawyer", "Admin" | "Invalid role specified" |
| **UV-010** | Role | Required, cannot be empty | "Role is required" |
| **UV-011** | Phone | Maximum length: 20 characters | "Phone number exceeds maximum length" |
| **UV-012** | City | Maximum length: 100 characters | "City name exceeds maximum length" |

#### 6.4.2 Lawyer Entity Validation Rules

| Rule ID | Field | Rule | Error Message |
|---------|-------|------|---------------|
| **LV-001** | UserId | Must reference existing User | "User not found" |
| **LV-002** | UserId | Must be unique (one profile per user) | "Lawyer profile already exists for this user" |
| **LV-003** | Specialization | Required, cannot be empty | "Specialization is required" |
| **LV-004** | Specialization | Maximum length: 100 characters | "Specialization exceeds maximum length" |
| **LV-005** | ExperienceYears | Must be non-negative integer | "Experience years must be 0 or greater" |
| **LV-006** | ExperienceYears | Maximum value: 70 years | "Experience years exceeds maximum" |
| **LV-007** | Price | Must be positive decimal | "Price must be greater than 0" |
| **LV-008** | Price | Precision: 18 digits, Scale: 2 decimal places | "Invalid price format" |
| **LV-009** | Address | Maximum length: 500 characters | "Address exceeds maximum length" |
| **LV-010** | Latitude | Range: -90.00000000 to 90.00000000 | "Invalid latitude value" |
| **LV-011** | Longitude | Range: -180.00000000 to 180.00000000 | "Invalid longitude value" |
| **LV-012** | Latitude | Precision: 10 digits, Scale: 8 decimal places | "Invalid latitude precision" |
| **LV-013** | Longitude | Precision: 10 digits, Scale: 8 decimal places | "Invalid longitude precision" |

#### 6.4.3 Booking Entity Validation Rules

| Rule ID | Field | Rule | Error Message |
|---------|-------|------|---------------|
| **BV-001** | UserId | Must reference existing User | "User not found" |
| **BV-002** | LawyerId | Must reference existing Lawyer | "Lawyer not found" |
| **BV-003** | LawyerId | Lawyer must be verified | "Cannot book with unverified lawyer" |
| **BV-004** | Date | Must be in the future | "Booking date must be in the future" |
| **BV-005** | Date | Required, cannot be null | "Booking date is required" |
| **BV-006** | Status | Must be one of: "Pending", "Confirmed", "Completed", "Cancelled" | "Invalid booking status" |
| **BV-007** | Status | Default value: "Pending" | N/A |
| **BV-008** | PaymentStatus | Must be one of: "Pending", "Paid", "Refunded" | "Invalid payment status" |
| **BV-009** | PaymentStatus | Default value: "Pending" | N/A |
| **BV-010** | TransactionId | Maximum length: 100 characters | "Transaction ID exceeds maximum length" |
| **BV-011** | UserId + LawyerId + Date | No duplicate bookings for same time slot | "Time slot already booked" |

#### 6.4.4 PaymentSession Entity Validation Rules

| Rule ID | Field | Rule | Error Message |
|---------|-------|------|---------------|
| **PV-001** | BookingId | Must reference existing Booking | "Booking not found" |
| **PV-002** | BookingId | Must be unique (one payment per booking) | "Payment session already exists for this booking" |
| **PV-003** | Amount | Must be positive decimal | "Amount must be greater than 0" |
| **PV-004** | Amount | Precision: 18 digits, Scale: 2 decimal places | "Invalid amount format" |
| **PV-005** | Status | Must be one of: "Pending", "Completed", "Failed", "Refunded" | "Invalid payment status" |
| **PV-006** | Status | Default value: "Pending" | N/A |
| **PV-007** | Provider | Required, cannot be empty | "Payment provider is required" |
| **PV-008** | Provider | Maximum length: 50 characters | "Provider name exceeds maximum length" |
| **PV-009** | ProviderSessionId | Maximum length: 255 characters | "Provider session ID exceeds maximum length" |

#### 6.4.5 Database Constraints Summary

| Constraint Type | Entity | Field(s) | Description |
|-----------------|--------|----------|-------------|
| **Primary Key** | User | Id | Auto-incremented unique identifier |
| **Primary Key** | Lawyer | Id | Auto-incremented unique identifier |
| **Primary Key** | Booking | Id | Auto-incremented unique identifier |
| **Primary Key** | PaymentSession | Id | Auto-incremented unique identifier |
| **Unique** | User | Email | Ensures no duplicate email addresses |
| **Unique** | Lawyer | UserId | Ensures one lawyer profile per user |
| **Unique** | PaymentSession | BookingId | Ensures one payment per booking |
| **Foreign Key** | Lawyer | UserId → User.Id | Links lawyer profile to user account |
| **Foreign Key** | Booking | UserId → User.Id | Links booking to client |
| **Foreign Key** | Booking | LawyerId → Lawyer.Id | Links booking to lawyer |
| **Foreign Key** | PaymentSession | BookingId → Booking.Id | Links payment to booking |
| **Check** | Lawyer | Price > 0 | Ensures positive pricing |
| **Check** | PaymentSession | Amount > 0 | Ensures positive payment amount |
| **Check** | Lawyer | ExperienceYears >= 0 | Ensures non-negative experience |

#### 6.4.6 Data Type Specifications

| Data Type | SQL Server Type | .NET Type | Description |
|-----------|-----------------|-----------|-------------|
| **Integer ID** | int | int | 4-byte signed integer |
| **String (short)** | nvarchar(50-100) | string | Unicode variable-length string |
| **String (medium)** | nvarchar(255) | string | Unicode variable-length string |
| **String (long)** | nvarchar(500) | string | Unicode variable-length string |
| **Currency** | decimal(18,2) | decimal | High-precision decimal for money |
| **Coordinate** | decimal(10,8) | decimal | High-precision decimal for GPS |
| **Boolean** | bit | bool | True/False flag |
| **Timestamp** | datetime2 | DateTime | Date and time with high precision |

### 6.5 Data Retention Requirements

This section documents the data retention, archival, and deletion policies for the LawyerConnect platform.

#### 6.5.1 Retention Policy Overview

| Data Category | Retention Period | Archival Policy | Deletion Policy |
|---------------|------------------|-----------------|-----------------|
| **User Accounts** | Active + 7 years after deactivation | Archive after 2 years of inactivity | Anonymize after retention period |
| **Lawyer Profiles** | Active + 7 years after deactivation | Archive after 2 years of inactivity | Anonymize after retention period |
| **Booking Records** | 7 years from booking date | Archive after 2 years | Anonymize after retention period |
| **Payment Records** | 10 years from transaction date | Archive after 3 years | Retain for audit compliance |
| **System Logs** | 2 years | Archive monthly | Delete after retention period |
| **Authentication Tokens** | Session duration | Not archived | Delete on logout/expiry |

#### 6.5.2 User Data Retention

| Data Element | Retention Requirement | Justification |
|--------------|----------------------|---------------|
| **User.Email** | Until account deletion + 7 years | Legal compliance, fraud prevention |
| **User.FullName** | Until account deletion + 7 years | Transaction records, legal compliance |
| **User.PasswordHash** | Until password change or account deletion | Security requirement |
| **User.Phone** | Until account deletion | Contact purposes |
| **User.City** | Until account deletion | Service delivery |
| **User.CreatedAt** | Permanent (anonymized) | Analytics, audit trail |
| **User.Role** | Until account deletion + 7 years | Access control history |

#### 6.5.3 Lawyer Data Retention

| Data Element | Retention Requirement | Justification |
|--------------|----------------------|---------------|
| **Lawyer.Specialization** | Until profile deletion + 7 years | Professional records |
| **Lawyer.ExperienceYears** | Until profile deletion + 7 years | Professional records |
| **Lawyer.Price** | Until profile deletion + 7 years | Transaction history |
| **Lawyer.Verified** | Until profile deletion + 7 years | Compliance records |
| **Lawyer.Address** | Until profile deletion | Service delivery |
| **Lawyer.Coordinates** | Until profile deletion | Service delivery |
| **Lawyer.CreatedAt** | Permanent (anonymized) | Analytics, audit trail |

#### 6.5.4 Booking Data Retention

| Data Element | Retention Requirement | Justification |
|--------------|----------------------|---------------|
| **Booking.Date** | 7 years from booking date | Legal compliance |
| **Booking.Status** | 7 years from booking date | Service records |
| **Booking.PaymentStatus** | 10 years from booking date | Financial compliance |
| **Booking.TransactionId** | 10 years from booking date | Financial audit |
| **Booking.CreatedAt** | 7 years from booking date | Audit trail |

#### 6.5.5 Payment Data Retention

| Data Element | Retention Requirement | Justification |
|--------------|----------------------|---------------|
| **PaymentSession.Amount** | 10 years from transaction | Financial regulations |
| **PaymentSession.Status** | 10 years from transaction | Financial audit |
| **PaymentSession.Provider** | 10 years from transaction | Payment reconciliation |
| **PaymentSession.ProviderSessionId** | 10 years from transaction | Dispute resolution |
| **PaymentSession.CreatedAt** | 10 years from transaction | Audit trail |

#### 6.5.6 Archival Process

```mermaid
flowchart TD
    A[Active Data] -->|Retention Period Exceeded| B{Archive Eligible?}
    B -->|Yes| C[Move to Archive Database]
    B -->|No| D[Continue Active Storage]
    C --> E[Compress and Encrypt]
    E --> F[Store in Cold Storage]
    F -->|Retention Period Complete| G{Legal Hold?}
    G -->|Yes| H[Retain Until Hold Released]
    G -->|No| I[Anonymize/Delete]
```

**Archival Procedures:**

| Step | Action | Frequency |
|------|--------|-----------|
| 1 | Identify records exceeding active retention | Monthly |
| 2 | Verify no active references or legal holds | Before archival |
| 3 | Export data to archive format (encrypted) | During archival |
| 4 | Verify archive integrity | After archival |
| 5 | Remove from active database | After verification |
| 6 | Update archive index | After removal |

#### 6.5.7 Data Deletion Requirements

**Soft Delete Policy:**
- User accounts are soft-deleted (marked as inactive) rather than hard-deleted
- Soft-deleted records are excluded from normal queries
- Soft-deleted records remain available for legal/audit purposes

**Hard Delete Triggers:**
| Trigger | Data Affected | Conditions |
|---------|---------------|------------|
| User request (GDPR) | Personal data | After retention period, no legal holds |
| Retention expiry | All entity data | After full retention period |
| Legal requirement | Specified data | Court order or regulatory requirement |

**Anonymization Process:**
| Field Type | Anonymization Method |
|------------|---------------------|
| Email | Replace with hash + @anonymized.local |
| Name | Replace with "Anonymized User [ID]" |
| Phone | Replace with "000-000-0000" |
| Address | Replace with "Address Removed" |
| Coordinates | Set to 0.0, 0.0 |

#### 6.5.8 Backup Requirements

| Backup Type | Frequency | Retention | Storage Location |
|-------------|-----------|-----------|------------------|
| **Full Backup** | Weekly | 4 weeks | Off-site encrypted storage |
| **Differential Backup** | Daily | 7 days | Off-site encrypted storage |
| **Transaction Log** | Every 15 minutes | 24 hours | Local + replicated |
| **Archive Backup** | Monthly | 10 years | Cold storage |

**Recovery Point Objective (RPO):** 15 minutes
**Recovery Time Objective (RTO):** 4 hours

#### 6.5.9 Compliance Requirements

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| **Data Protection** | Right to erasure | Anonymization after retention period |
| **Financial Regulations** | Transaction records retention | 10-year retention for payments |
| **Legal Compliance** | Evidence preservation | Legal hold capability |
| **Audit Requirements** | Audit trail maintenance | Immutable logging |

#### 6.5.10 Data Lifecycle Summary

```mermaid
stateDiagram-v2
    [*] --> Active: Data Created
    Active --> Active: Normal Operations
    Active --> Inactive: User Deactivation
    Inactive --> Archived: Retention Period (2 years)
    Archived --> Anonymized: Full Retention Complete
    Anonymized --> [*]: Permanent Anonymized Record
    
    Active --> LegalHold: Legal Requirement
    Inactive --> LegalHold: Legal Requirement
    Archived --> LegalHold: Legal Requirement
    LegalHold --> Active: Hold Released
    LegalHold --> Archived: Hold Released
```

---

## 7. Interface Requirements

### 7.1 User Interface Requirements

#### 7.1.1 Overview

The LawyerConnect user interface is a modern, responsive single-page application (SPA) built with React and TypeScript. The interface provides an intuitive and accessible experience for all user classes while maintaining a consistent visual design across all pages and components.

#### 7.1.2 Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | React | 18.3.1 | Component-based UI development |
| **Language** | TypeScript | 5.3.3 | Type-safe JavaScript |
| **Build Tool** | Vite | 5.1.4 | Fast development and bundling |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **Routing** | React Router DOM | 7.11.0 | Client-side navigation |
| **Animations** | Framer Motion | 11.0.0 | Smooth UI transitions |
| **Icons** | Lucide React | - | Consistent iconography |

#### 7.1.3 Responsive Design Requirements

| Requirement ID | Description | Breakpoints |
|----------------|-------------|-------------|
| **UI-RD-001** | Mobile-first responsive layout | 320px - 767px (Mobile) |
| **UI-RD-002** | Tablet-optimized views | 768px - 1023px (Tablet) |
| **UI-RD-003** | Desktop full-featured layout | 1024px+ (Desktop) |
| **UI-RD-004** | Fluid typography scaling | Based on viewport width |
| **UI-RD-005** | Touch-friendly interactive elements | Minimum 44x44px touch targets |

#### 7.1.4 Theme Support

The application supports both light and dark themes with automatic system preference detection:

| Theme Feature | Light Mode | Dark Mode |
|---------------|------------|-----------|
| **Background** | Gray-50 to White gradient | Dark-950 to Dark-900 gradient |
| **Text Primary** | Gray-900 | White |
| **Text Secondary** | Gray-600 | Gray-400 |
| **Accent Color** | Primary-600 | Primary-400 |
| **Persistence** | LocalStorage | LocalStorage |
| **System Detection** | `prefers-color-scheme` media query | `prefers-color-scheme` media query |

#### 7.1.5 Page Structure

| Page | Route | Description | Access Level |
|------|-------|-------------|--------------|
| **Landing Page** | `/` | Marketing homepage with hero, features, testimonials | Public |
| **Browse Lawyers** | `/lawyers` | Searchable lawyer directory with filters | Public |
| **Lawyer Profile** | `/lawyer/:id` | Detailed lawyer information and booking | Public |
| **User Dashboard** | `/dashboard` | Client booking management | Authenticated (User) |
| **Lawyer Dashboard** | `/dashboard` | Lawyer appointment management | Authenticated (Lawyer) |
| **Account Page** | `/account` | Profile settings and preferences | Authenticated |

#### 7.1.6 Component Architecture

| Component Category | Components | Purpose |
|--------------------|------------|---------|
| **Navigation** | Navbar, Footer | Site-wide navigation and information |
| **Authentication** | LoginModal, SignupModal | User authentication flows |
| **Content** | Hero, Features, HowItWorks, Testimonials, CTASection | Landing page sections |
| **Lawyer Display** | LawyersSection, BookingCalendar | Lawyer browsing and booking |
| **Utilities** | AnimatedBackground, AIChatModal | Visual enhancements and AI assistance |

#### 7.1.7 Internationalization (i18n)

| Requirement ID | Description |
|----------------|-------------|
| **UI-I18N-001** | Support for English (en) language |
| **UI-I18N-002** | Support for Arabic (ar) language |
| **UI-I18N-003** | RTL layout support for Arabic |
| **UI-I18N-004** | Language persistence in user preferences |
| **UI-I18N-005** | Dynamic language switching without page reload |

#### 7.1.8 Accessibility Requirements

| Requirement ID | Description | WCAG Level |
|----------------|-------------|------------|
| **UI-A11Y-001** | Keyboard navigation support for all interactive elements | AA |
| **UI-A11Y-002** | Screen reader compatible with ARIA labels | AA |
| **UI-A11Y-003** | Color contrast ratio minimum 4.5:1 for text | AA |
| **UI-A11Y-004** | Focus indicators visible on all focusable elements | AA |
| **UI-A11Y-005** | Form labels associated with inputs | AA |
| **UI-A11Y-006** | Error messages announced to assistive technologies | AA |

#### 7.1.9 UI Performance Requirements

| Requirement ID | Metric | Target |
|----------------|--------|--------|
| **UI-PERF-001** | First Contentful Paint (FCP) | < 1.5 seconds |
| **UI-PERF-002** | Largest Contentful Paint (LCP) | < 2.5 seconds |
| **UI-PERF-003** | Time to Interactive (TTI) | < 3.5 seconds |
| **UI-PERF-004** | Cumulative Layout Shift (CLS) | < 0.1 |
| **UI-PERF-005** | Bundle size (gzipped) | < 200KB initial load |

### 7.2 API Interface Requirements

#### 7.2.1 Overview

The LawyerConnect API is a RESTful web service built with ASP.NET Core 8.0. It provides a standardized interface for all client-server communication, following REST architectural principles and JSON data format.

#### 7.2.2 API Design Principles

| Principle | Description |
|-----------|-------------|
| **RESTful Architecture** | Resources identified by URIs, standard HTTP methods |
| **Stateless Communication** | No server-side session state, JWT for authentication |
| **JSON Data Format** | All request/response bodies in JSON format |
| **Consistent Naming** | Lowercase, hyphenated endpoint paths |
| **Versioning Ready** | Base path supports future versioning (`/api/v1/`) |

#### 7.2.3 Base URL Configuration

| Environment | Base URL |
|-------------|----------|
| **Development** | `http://localhost:5128/api` |
| **Production** | `https://api.lawyerconnect.com/api` |

#### 7.2.4 HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| **GET** | Retrieve resources | Yes |
| **POST** | Create new resources | No |
| **PUT** | Update existing resources | Yes |
| **DELETE** | Remove resources | Yes |

#### 7.2.5 API Endpoints Summary

##### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user account | No |
| POST | `/api/auth/login` | Authenticate user and get JWT | No |
| GET | `/api/auth/me` | Get current authenticated user | Yes |

##### User Management Endpoints (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get paginated list of users | Admin |
| PUT | `/api/users/update` | Update current user profile | Yes |
| PUT | `/api/users/change-password` | Change user password | Yes |
| PUT | `/api/users/update-role` | Update user role | Admin |

##### Lawyer Management Endpoints (`/api/lawyers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/lawyers/register` | Register lawyer profile | Yes |
| GET | `/api/lawyers` | Get paginated list of lawyers | No |
| GET | `/api/lawyers/{id}` | Get lawyer by ID | No |
| GET | `/api/lawyers/me` | Get current lawyer's profile | Lawyer/Admin |
| PUT | `/api/lawyers/{id}/verify` | Verify lawyer profile | Admin |

##### Booking Endpoints (`/api/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create new booking | Yes |
| GET | `/api/bookings/{id}` | Get booking by ID | Yes |
| GET | `/api/bookings/user` | Get current user's bookings | Yes |
| GET | `/api/bookings/lawyer` | Get lawyer's bookings | Lawyer/Admin |
| PUT | `/api/bookings/{id}/status` | Update booking status | Lawyer/Admin |

##### Payment Endpoints (`/api/payments`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payments/create-session` | Create payment session | Yes |
| POST | `/api/payments/confirm` | Confirm payment | Yes |

#### 7.2.6 Request Format

**Standard Request Headers:**

| Header | Value | Required |
|--------|-------|----------|
| `Content-Type` | `application/json` | Yes (for POST/PUT) |
| `Authorization` | `Bearer {jwt_token}` | For protected endpoints |
| `Accept` | `application/json` | Recommended |

**Example Request:**

```http
POST /api/auth/login HTTP/1.1
Host: localhost:5128
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### 7.2.7 Response Format

**Standard Response Structure:**

```json
{
  "data": { },
  "message": "Success message",
  "errors": []
}
```

**Success Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-12-27T10:30:00Z",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

**Error Response (4xx/5xx):**

```json
{
  "title": "Error Title",
  "status": 400,
  "message": "Detailed error message"
}
```

#### 7.2.8 HTTP Status Codes

| Code | Status | Usage |
|------|--------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST creating resource |
| 204 | No Content | Successful PUT/DELETE with no response body |
| 400 | Bad Request | Invalid request data or parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error | Server-side error |

#### 7.2.9 Pagination

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 10 | Items per page |

**Example:**

```http
GET /api/lawyers?page=2&limit=20
```

#### 7.2.10 Data Transfer Objects (DTOs)

##### Authentication DTOs

| DTO | Fields | Usage |
|-----|--------|-------|
| `LoginDto` | email, password | Login request |
| `UserRegisterDto` | fullName, email, password, phone, city, role | Registration request |
| `AuthResponseDto` | token, expiresAt, user | Authentication response |

##### User DTOs

| DTO | Fields | Usage |
|-----|--------|-------|
| `UserResponseDto` | id, fullName, email, phone, city, role, createdAt | User data response |
| `UpdateUserDto` | fullName, phone, city | Profile update request |
| `ChangePasswordDto` | currentPassword, newPassword | Password change request |

##### Lawyer DTOs

| DTO | Fields | Usage |
|-----|--------|-------|
| `LawyerRegisterDto` | specialization, experienceYears, price, address, latitude, longitude | Lawyer registration |
| `LawyerResponseDto` | id, userId, fullName, email, specialization, experienceYears, price, verified, address, latitude, longitude, createdAt | Lawyer data response |

##### Booking DTOs

| DTO | Fields | Usage |
|-----|--------|-------|
| `BookingDto` | lawyerId, date, userId (optional) | Booking creation |
| `BookingResponseDto` | id, userId, lawyerId, date, status, paymentStatus, transactionId, createdAt, clientName, clientEmail, clientPhone, lawyerName, lawyerSpecialization | Booking data response |

##### Payment DTOs

| DTO | Fields | Usage |
|-----|--------|-------|
| `PaymentDto` | bookingId, amount | Payment session creation |
| `PaymentSessionResponseDto` | id, bookingId, amount, status, providerSessionId, createdAt | Payment session response |

### 7.3 Hardware Interface Requirements

#### 7.3.1 Overview

This section defines the hardware requirements for both server-side infrastructure and client devices accessing the LawyerConnect platform.

#### 7.3.2 Server Hardware Requirements

##### Production Server Specifications

| Component | Minimum | Recommended | High Availability |
|-----------|---------|-------------|-------------------|
| **CPU** | 2 cores @ 2.0 GHz | 4 cores @ 2.5 GHz | 8+ cores @ 3.0 GHz |
| **RAM** | 4 GB | 8 GB | 16+ GB |
| **Storage** | 50 GB SSD | 100 GB SSD | 250+ GB NVMe SSD |
| **Network** | 100 Mbps | 1 Gbps | 10 Gbps |
| **RAID** | Not required | RAID 1 | RAID 10 |

##### Database Server Specifications

| Component | Minimum | Recommended | High Availability |
|-----------|---------|-------------|-------------------|
| **CPU** | 2 cores @ 2.0 GHz | 4 cores @ 2.5 GHz | 8+ cores @ 3.0 GHz |
| **RAM** | 8 GB | 16 GB | 32+ GB |
| **Storage** | 100 GB SSD | 250 GB SSD | 500+ GB NVMe SSD |
| **Network** | 1 Gbps | 1 Gbps | 10 Gbps |
| **IOPS** | 3,000 | 10,000 | 20,000+ |

##### Development Server Specifications

| Component | Specification |
|-----------|---------------|
| **CPU** | 2 cores @ 2.0 GHz |
| **RAM** | 4 GB |
| **Storage** | 50 GB SSD |
| **Network** | 100 Mbps |

#### 7.3.3 Client Device Requirements

##### Desktop/Laptop Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | 1 GHz dual-core | 2 GHz quad-core |
| **RAM** | 2 GB | 4+ GB |
| **Display** | 1024x768 resolution | 1920x1080 resolution |
| **Network** | 1 Mbps broadband | 10+ Mbps broadband |
| **Storage** | 100 MB free space | 500 MB free space |

##### Mobile Device Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | 1 GHz | 1.5+ GHz |
| **RAM** | 1 GB | 2+ GB |
| **Display** | 320px width | 375px+ width |
| **Network** | 3G connection | 4G/LTE or WiFi |
| **OS (iOS)** | iOS 13+ | iOS 15+ |
| **OS (Android)** | Android 8.0+ | Android 11+ |

##### Tablet Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | 1 GHz dual-core | 1.5+ GHz quad-core |
| **RAM** | 2 GB | 3+ GB |
| **Display** | 768px width | 1024px+ width |
| **Network** | WiFi 802.11n | WiFi 802.11ac |

#### 7.3.4 Network Infrastructure Requirements

| Component | Specification |
|-----------|---------------|
| **Load Balancer** | Layer 7 (HTTP/HTTPS) capable |
| **Firewall** | Stateful inspection, DDoS protection |
| **SSL Termination** | TLS 1.2+ support |
| **DNS** | Low TTL support for failover |
| **CDN** | Optional for static asset delivery |

#### 7.3.5 Peripheral Requirements

| Peripheral | Requirement | Purpose |
|------------|-------------|---------|
| **Keyboard** | Standard input device | Form data entry |
| **Mouse/Touchpad** | Pointing device | Navigation |
| **Touchscreen** | Capacitive (mobile/tablet) | Touch interaction |
| **Camera** | Optional | Future video consultation |
| **Microphone** | Optional | Future voice features |

### 7.4 Software Interface Requirements

#### 7.4.1 Overview

This section defines the software interfaces that LawyerConnect interacts with, including database systems, runtime environments, external services, and third-party libraries.

#### 7.4.2 Database Interface

##### Microsoft SQL Server

| Attribute | Specification |
|-----------|---------------|
| **Database System** | Microsoft SQL Server |
| **Minimum Version** | SQL Server 2019 |
| **Recommended Version** | SQL Server 2022 |
| **Connection Method** | Entity Framework Core 8.0 |
| **Connection String** | Configured via `appsettings.json` |
| **Authentication** | SQL Server Authentication or Windows Authentication |

##### Entity Framework Core Configuration

| Setting | Value |
|---------|-------|
| **ORM Version** | Entity Framework Core 8.0 |
| **Migration Strategy** | Code-First Migrations |
| **Lazy Loading** | Disabled (explicit loading) |
| **Connection Pooling** | Enabled (default) |
| **Command Timeout** | 30 seconds (default) |

##### Database Entities

| Entity | Table Name | Description |
|--------|------------|-------------|
| `User` | `Users` | User account information |
| `Lawyer` | `Lawyers` | Lawyer profile data |
| `Booking` | `Bookings` | Consultation bookings |
| `PaymentSession` | `PaymentSessions` | Payment transaction records |

#### 7.4.3 Runtime Environment Interfaces

##### Backend Runtime

| Component | Specification |
|-----------|---------------|
| **Runtime** | .NET 8.0 |
| **Framework** | ASP.NET Core 8.0 |
| **Web Server** | Kestrel (development), IIS/Nginx (production) |
| **Process Model** | In-process hosting |

##### Frontend Runtime

| Component | Specification |
|-----------|---------------|
| **Build Tool** | Vite 5.1.4 |
| **Runtime** | Modern JavaScript engines (V8, SpiderMonkey, JavaScriptCore) |
| **Module System** | ES Modules |
| **Transpilation** | TypeScript to JavaScript |

#### 7.4.4 Operating System Interfaces

##### Server Operating Systems

| OS | Version | Support Level |
|----|---------|---------------|
| **Windows Server** | 2019, 2022 | Full Support |
| **Ubuntu Linux** | 20.04 LTS, 22.04 LTS | Full Support |
| **Red Hat Enterprise Linux** | 8, 9 | Full Support |
| **macOS** | 12+ (Monterey) | Development Only |

##### Client Operating Systems

| OS | Version | Support Level |
|----|---------|---------------|
| **Windows** | 10, 11 | Full Support |
| **macOS** | 11+ (Big Sur) | Full Support |
| **Linux** | Modern distributions | Full Support |
| **iOS** | 13+ | Full Support |
| **Android** | 8.0+ (Oreo) | Full Support |
| **ChromeOS** | Latest | Full Support |

#### 7.4.5 External Service Interfaces

##### Current Integrations

| Service | Purpose | Integration Status |
|---------|---------|-------------------|
| **Browser LocalStorage** | Client-side data persistence | Implemented |
| **Browser SessionStorage** | Session data storage | Implemented |

##### Planned Integrations

| Service | Purpose | Integration Status |
|---------|---------|-------------------|
| **Email Service (SMTP)** | Notification delivery | Planned |
| **Payment Gateway (Stripe)** | Payment processing | Planned |
| **Google Maps API** | Location services | Planned |
| **SMS Gateway** | SMS notifications | Planned |
| **Cloud Storage** | Document storage | Planned |

#### 7.4.6 Third-Party Library Interfaces

##### Backend Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **Microsoft.EntityFrameworkCore** | 8.0.x | ORM for database access |
| **Microsoft.EntityFrameworkCore.SqlServer** | 8.0.x | SQL Server provider |
| **Microsoft.AspNetCore.Authentication.JwtBearer** | 8.0.x | JWT authentication |
| **System.IdentityModel.Tokens.Jwt** | 7.x | JWT token handling |
| **Swashbuckle.AspNetCore** | 6.x | API documentation (Swagger) |

##### Frontend Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **react** | 18.3.1 | UI component framework |
| **react-dom** | 18.3.1 | React DOM rendering |
| **react-router-dom** | 7.11.0 | Client-side routing |
| **typescript** | 5.3.3 | Type-safe JavaScript |
| **tailwindcss** | 3.4.1 | Utility CSS framework |
| **framer-motion** | 11.0.0 | Animation library |
| **axios** | 1.6.7 | HTTP client |
| **lucide-react** | - | Icon library |

#### 7.4.7 Browser Interface Requirements

| Browser | Minimum Version | JavaScript Features Required |
|---------|-----------------|------------------------------|
| **Chrome** | 90+ | ES2020, Fetch API, LocalStorage |
| **Firefox** | 88+ | ES2020, Fetch API, LocalStorage |
| **Safari** | 14+ | ES2020, Fetch API, LocalStorage |
| **Edge** | 90+ | ES2020, Fetch API, LocalStorage |
| **Opera** | 76+ | ES2020, Fetch API, LocalStorage |

#### 7.4.8 Development Tool Interfaces

| Tool | Purpose | Version |
|------|---------|---------|
| **Node.js** | Frontend build environment | 18.x LTS or 20.x LTS |
| **npm** | Package management | 9.x or 10.x |
| **dotnet CLI** | Backend build and run | 8.0 |
| **Git** | Version control | 2.x |
| **Visual Studio / VS Code** | IDE | Latest |

### 7.5 Communication Interface Requirements

#### 7.5.1 Overview

This section defines the communication protocols, data formats, and security mechanisms used for data exchange within the LawyerConnect platform.

#### 7.5.2 Network Protocols

##### Transport Layer Security

| Protocol | Specification |
|----------|---------------|
| **HTTPS** | Required for all production traffic |
| **TLS Version** | TLS 1.2 minimum, TLS 1.3 recommended |
| **Certificate** | Valid SSL/TLS certificate from trusted CA |
| **HSTS** | HTTP Strict Transport Security enabled |
| **Certificate Pinning** | Optional for mobile clients |

##### HTTP Protocol

| Attribute | Specification |
|-----------|---------------|
| **HTTP Version** | HTTP/1.1, HTTP/2 supported |
| **Keep-Alive** | Enabled for connection reuse |
| **Compression** | gzip, br (Brotli) supported |
| **Caching** | Cache-Control headers for static assets |

#### 7.5.3 Data Formats

##### JSON (JavaScript Object Notation)

| Attribute | Specification |
|-----------|---------------|
| **Content-Type** | `application/json` |
| **Character Encoding** | UTF-8 |
| **Date Format** | ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`) |
| **Decimal Precision** | Up to 8 decimal places for coordinates |
| **Null Handling** | Explicit null values or omitted fields |

**Example JSON Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "city": "New York",
  "role": "User"
}
```

**Example JSON Response:**

```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "city": "New York",
  "role": "User",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

#### 7.5.4 Authentication Protocol

##### JWT (JSON Web Token)

| Attribute | Specification |
|-----------|---------------|
| **Token Type** | Bearer Token |
| **Algorithm** | HMAC SHA-256 (HS256) |
| **Token Location** | Authorization header |
| **Token Format** | `Bearer {token}` |
| **Expiration** | Configurable (default: 120 minutes) |

**JWT Token Structure:**

| Section | Content |
|---------|---------|
| **Header** | Algorithm (HS256), Token type (JWT) |
| **Payload** | User ID, Email, Role, Expiration |
| **Signature** | HMAC-SHA256 signed with secret key |

**JWT Claims:**

| Claim | Type | Description |
|-------|------|-------------|
| `sub` (NameIdentifier) | string | User ID |
| `email` | string | User email address |
| `role` | string | User role (User, Lawyer, Admin) |
| `exp` | number | Expiration timestamp |
| `iss` | string | Token issuer |
| `aud` | string | Token audience |

**Example Authorization Header:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6IlVzZXIiLCJleHAiOjE3MDM1ODk0MDB9.signature
```

#### 7.5.5 CORS (Cross-Origin Resource Sharing)

| Setting | Configuration |
|---------|---------------|
| **Allowed Origins** | Frontend application URL |
| **Allowed Methods** | GET, POST, PUT, DELETE, OPTIONS |
| **Allowed Headers** | Content-Type, Authorization, Accept |
| **Exposed Headers** | Content-Length, Content-Type |
| **Credentials** | Allowed |
| **Max Age** | 86400 seconds (24 hours) |

#### 7.5.6 Rate Limiting

| Endpoint Category | Rate Limit | Window |
|-------------------|------------|--------|
| **Authentication** | 10 requests | Per minute |
| **API General** | 100 requests | Per minute |
| **Search/Browse** | 60 requests | Per minute |
| **File Upload** | 10 requests | Per minute |

**Rate Limit Response Headers:**

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining in window |
| `X-RateLimit-Reset` | Time when limit resets (Unix timestamp) |

#### 7.5.7 Error Communication

##### Standard Error Response Format

```json
{
  "title": "Error Title",
  "status": 400,
  "message": "Detailed error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ],
  "traceId": "00-abc123-def456-00"
}
```

##### Error Categories

| Category | HTTP Status | Description |
|----------|-------------|-------------|
| **Validation Errors** | 400 | Invalid input data |
| **Authentication Errors** | 401 | Missing or invalid credentials |
| **Authorization Errors** | 403 | Insufficient permissions |
| **Not Found Errors** | 404 | Resource does not exist |
| **Conflict Errors** | 409 | Resource conflict (e.g., duplicate) |
| **Server Errors** | 500 | Internal server error |

#### 7.5.8 WebSocket Interface (Future)

| Attribute | Specification |
|-----------|---------------|
| **Protocol** | WSS (WebSocket Secure) |
| **Purpose** | Real-time notifications |
| **Authentication** | JWT token in connection query |
| **Heartbeat** | 30-second ping/pong |
| **Reconnection** | Automatic with exponential backoff |

#### 7.5.9 API Versioning Strategy

| Strategy | Implementation |
|----------|----------------|
| **Current Version** | v1 (implicit) |
| **Version Location** | URL path (`/api/v1/`) |
| **Deprecation Notice** | 6 months advance notice |
| **Backward Compatibility** | Maintained within major version |

#### 7.5.10 Communication Security Summary

| Security Layer | Implementation |
|----------------|----------------|
| **Transport** | TLS 1.2+ encryption |
| **Authentication** | JWT Bearer tokens |
| **Authorization** | Role-based access control |
| **Input Validation** | Server-side validation |
| **Output Encoding** | JSON encoding |
| **Rate Limiting** | Request throttling |
| **CORS** | Origin restriction |
| **Headers** | Security headers (HSTS, X-Content-Type-Options) |

---

## 8. Appendices

### Appendix A: API Reference

This appendix provides a complete reference of all API endpoints available in the LawyerConnect platform.

#### A.1 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user account | No |
| POST | `/api/auth/login` | Authenticate user and obtain JWT token | No |
| GET | `/api/auth/me` | Get current authenticated user profile | Yes |

##### A.1.1 POST /api/auth/register

**Description:** Register a new user account (Client, Lawyer, or Admin)

**Request Body:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "city": "string",
  "role": "string (optional: User, Lawyer, Admin)",
  "adminSecret": "string (optional: required for Admin registration)"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "User",
  "phone": "+1234567890",
  "city": "New York",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid role specified
- `401 Unauthorized` - Invalid admin secret for Admin registration
- `409 Conflict` - Email already registered

##### A.1.2 POST /api/auth/login

**Description:** Authenticate user and receive JWT token

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-12-26T12:30:00Z",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "phone": "+1234567890",
    "city": "New York",
    "createdAt": "2025-12-26T10:30:00Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials

##### A.1.3 GET /api/auth/me

**Description:** Get current authenticated user's profile

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "User",
  "phone": "+1234567890",
  "city": "New York",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - User not found

---

#### A.2 User Management Endpoints

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/api/users` | Get paginated list of users | Yes | Admin |
| PUT | `/api/users/update` | Update current user's profile | Yes | All |
| PUT | `/api/users/change-password` | Change current user's password | Yes | All |
| PUT | `/api/users/update-role` | Update a user's role | Yes | Admin |

##### A.2.1 GET /api/users

**Description:** Get paginated list of all users (Admin only)

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `limit` (int, default: 10) - Items per page

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "phone": "+1234567890",
    "city": "New York",
    "createdAt": "2025-12-26T10:30:00Z"
  }
]
```

##### A.2.2 PUT /api/users/update

**Description:** Update current user's profile information

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "fullName": "string",
  "phone": "string",
  "city": "string"
}
```

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - User not found

##### A.2.3 PUT /api/users/change-password

**Description:** Change current user's password

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized` - Current password incorrect or invalid token
- `404 Not Found` - User not found

##### A.2.4 PUT /api/users/update-role

**Description:** Update a user's role (Admin only)

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "userId": 1,
  "role": "string (User, Lawyer, or Admin)"
}
```

**Response:** `204 No Content`

**Error Responses:**
- `400 Bad Request` - Invalid role specified
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions

---

#### A.3 Lawyer Management Endpoints

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/api/lawyers/register` | Register as a lawyer | Yes | All |
| GET | `/api/lawyers` | Get paginated list of lawyers | No | - |
| GET | `/api/lawyers/{id}` | Get lawyer by ID | No | - |
| GET | `/api/lawyers/me` | Get current lawyer's profile | Yes | Lawyer, Admin |
| PUT | `/api/lawyers/{id}/verify` | Verify a lawyer | Yes | Admin |

##### A.3.1 POST /api/lawyers/register

**Description:** Register current user as a lawyer

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "specialization": "string (max 100 chars)",
  "experienceYears": 0,
  "price": 0.00,
  "address": "string (max 200 chars)",
  "latitude": 0.000000,
  "longitude": 0.000000
}
```

**Validation Rules:**
- `specialization`: Required, max 100 characters
- `experienceYears`: 0-100
- `price`: Must be positive
- `address`: Required, max 200 characters
- `latitude`: -90 to 90
- `longitude`: -180 to 180

**Response (201 Created):**

```json
{
  "id": 1,
  "userId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "specialization": "Criminal Law",
  "experienceYears": 10,
  "price": 150.00,
  "verified": false,
  "address": "123 Legal Street",
  "latitude": 40.712776,
  "longitude": -74.005974,
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `409 Conflict` - Lawyer profile already exists for this user

##### A.3.2 GET /api/lawyers

**Description:** Get paginated list of lawyers

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `limit` (int, default: 10) - Items per page

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "userId": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "specialization": "Criminal Law",
    "experienceYears": 10,
    "price": 150.00,
    "verified": true,
    "address": "123 Legal Street",
    "latitude": 40.712776,
    "longitude": -74.005974,
    "createdAt": "2025-12-26T10:30:00Z"
  }
]
```

##### A.3.3 GET /api/lawyers/{id}

**Description:** Get lawyer details by ID

**Path Parameters:**
- `id` (int) - Lawyer ID

**Response (200 OK):**

```json
{
  "id": 1,
  "userId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "specialization": "Criminal Law",
  "experienceYears": 10,
  "price": 150.00,
  "verified": true,
  "address": "123 Legal Street",
  "latitude": 40.712776,
  "longitude": -74.005974,
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `404 Not Found` - Lawyer not found

##### A.3.4 GET /api/lawyers/me

**Description:** Get current authenticated lawyer's profile

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
{
  "id": 1,
  "userId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "specialization": "Criminal Law",
  "experienceYears": 10,
  "price": 150.00,
  "verified": true,
  "address": "123 Legal Street",
  "latitude": 40.712776,
  "longitude": -74.005974,
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Lawyer profile not found for this user

##### A.3.5 PUT /api/lawyers/{id}/verify

**Description:** Verify a lawyer's profile (Admin only)

**Path Parameters:**
- `id` (int) - Lawyer ID

**Headers:**
- `Authorization: Bearer {token}`

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions

---

#### A.4 Booking Endpoints

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/api/bookings` | Create a new booking | Yes | All |
| GET | `/api/bookings/{id}` | Get booking by ID | Yes | All |
| GET | `/api/bookings/user` | Get current user's bookings | Yes | All |
| GET | `/api/bookings/lawyer` | Get lawyer's bookings | Yes | Lawyer, Admin |
| PUT | `/api/bookings/{id}/status` | Update booking status | Yes | Lawyer, Admin |

##### A.4.1 POST /api/bookings

**Description:** Create a new booking for a consultation

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "userId": 0,
  "lawyerId": 1,
  "date": "2025-12-30T14:00:00Z"
}
```

**Note:** `userId` is automatically set from token for non-Admin users. Admins can specify `userId` to book on behalf of another user.

**Response (201 Created):**

```json
{
  "id": 1,
  "userId": 1,
  "lawyerId": 1,
  "date": "2025-12-30T14:00:00Z",
  "status": "Pending",
  "paymentStatus": "Pending",
  "transactionId": "",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

##### A.4.2 GET /api/bookings/{id}

**Description:** Get booking details by ID

**Path Parameters:**
- `id` (int) - Booking ID

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
{
  "id": 1,
  "userId": 1,
  "lawyerId": 1,
  "date": "2025-12-30T14:00:00Z",
  "status": "Confirmed",
  "paymentStatus": "Paid",
  "transactionId": "TXN123456",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Booking not found

##### A.4.3 GET /api/bookings/user

**Description:** Get all bookings for the current authenticated user

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "userId": 1,
    "lawyerId": 1,
    "date": "2025-12-30T14:00:00Z",
    "status": "Confirmed",
    "paymentStatus": "Paid",
    "transactionId": "TXN123456",
    "createdAt": "2025-12-26T10:30:00Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

##### A.4.4 GET /api/bookings/lawyer

**Description:** Get all bookings for a lawyer

**Query Parameters:**
- `lawyerId` (int, optional) - Lawyer ID (Admin only, to query other lawyers)

**Headers:**
- `Authorization: Bearer {token}`

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "userId": 1,
    "lawyerId": 1,
    "date": "2025-12-30T14:00:00Z",
    "status": "Confirmed",
    "paymentStatus": "Paid",
    "transactionId": "TXN123456",
    "createdAt": "2025-12-26T10:30:00Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Only admins can query other lawyers' bookings
- `404 Not Found` - Lawyer profile not found

##### A.4.5 PUT /api/bookings/{id}/status

**Description:** Update booking status (Lawyer or Admin only)

**Path Parameters:**
- `id` (int) - Booking ID

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "status": "string (Pending, Confirmed, Completed, Cancelled)"
}
```

**Response:** `204 No Content`

**Error Responses:**
- `400 Bad Request` - Status required
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions

---

#### A.5 Payment Endpoints

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/api/payments/create-session` | Create a payment session | Yes | All |
| POST | `/api/payments/confirm` | Confirm a payment | Yes | All |

##### A.5.1 POST /api/payments/create-session

**Description:** Create a new payment session for a booking

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "bookingId": 1,
  "amount": 150.00,
  "provider": "string (e.g., Stripe, PayPal)"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "bookingId": 1,
  "amount": 150.00,
  "status": "Pending",
  "provider": "Stripe",
  "providerSessionId": "",
  "createdAt": "2025-12-26T10:30:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

##### A.5.2 POST /api/payments/confirm

**Description:** Confirm a payment after successful processing

**Headers:**
- `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "sessionId": 1,
  "providerSessionId": "string (from payment provider)"
}
```

**Response:** `204 No Content`

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

---

#### A.6 API Summary Table

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | POST | `/api/auth/register` | Register new user |
| 2 | POST | `/api/auth/login` | User login |
| 3 | GET | `/api/auth/me` | Get current user |
| 4 | GET | `/api/users` | List all users (Admin) |
| 5 | PUT | `/api/users/update` | Update profile |
| 6 | PUT | `/api/users/change-password` | Change password |
| 7 | PUT | `/api/users/update-role` | Update user role (Admin) |
| 8 | POST | `/api/lawyers/register` | Register as lawyer |
| 9 | GET | `/api/lawyers` | List lawyers |
| 10 | GET | `/api/lawyers/{id}` | Get lawyer by ID |
| 11 | GET | `/api/lawyers/me` | Get lawyer profile |
| 12 | PUT | `/api/lawyers/{id}/verify` | Verify lawyer (Admin) |
| 13 | POST | `/api/bookings` | Create booking |
| 14 | GET | `/api/bookings/{id}` | Get booking by ID |
| 15 | GET | `/api/bookings/user` | Get user's bookings |
| 16 | GET | `/api/bookings/lawyer` | Get lawyer's bookings |
| 17 | PUT | `/api/bookings/{id}/status` | Update booking status |
| 18 | POST | `/api/payments/create-session` | Create payment session |
| 19 | POST | `/api/payments/confirm` | Confirm payment |

### Appendix B: Database Schema

This appendix provides detailed database schema definitions for all entities in the LawyerConnect platform.

#### B.1 Database Overview

| Database | Microsoft SQL Server 2019+ |
|----------|---------------------------|
| ORM | Entity Framework Core 8.0 |
| Connection | Connection string in appsettings.json |
| Migrations | EF Core Code-First Migrations |

#### B.2 Table Definitions

##### B.2.1 Users Table

**Table Name:** `Users`

**Description:** Stores all user accounts including clients, lawyers, and administrators.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique user identifier |
| `FullName` | NVARCHAR(MAX) | NOT NULL | User's full name |
| `Email` | NVARCHAR(450) | NOT NULL, UNIQUE | User's email address |
| `PasswordHash` | NVARCHAR(MAX) | NOT NULL | SHA-256 hashed password |
| `Role` | NVARCHAR(MAX) | NOT NULL | User role (User, Lawyer, Admin) |
| `Phone` | NVARCHAR(MAX) | NOT NULL | Contact phone number |
| `City` | NVARCHAR(MAX) | NOT NULL | User's city |
| `CreatedAt` | DATETIME2 | NOT NULL | Account creation timestamp |

**Indexes:**
- Primary Key on `Id`
- Unique Index on `Email`

**SQL Definition:**

```sql
CREATE TABLE [dbo].[Users] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [FullName] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [Email] NVARCHAR(450) NOT NULL DEFAULT '',
    [PasswordHash] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [Role] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [Phone] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [City] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [CreatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE UNIQUE INDEX [IX_Users_Email] ON [dbo].[Users] ([Email]);
```

##### B.2.2 Lawyers Table

**Table Name:** `Lawyers`

**Description:** Stores lawyer professional profiles linked to user accounts.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique lawyer identifier |
| `UserId` | INT | FOREIGN KEY, UNIQUE | Reference to Users table |
| `Specialization` | NVARCHAR(100) | NOT NULL | Legal specialization area |
| `ExperienceYears` | INT | NOT NULL | Years of experience |
| `Price` | DECIMAL(18,2) | NOT NULL | Hourly consultation rate |
| `Verified` | BIT | NOT NULL, DEFAULT 0 | Verification status |
| `Address` | NVARCHAR(200) | NOT NULL | Office address |
| `Latitude` | DECIMAL(10,8) | NOT NULL | Location latitude |
| `Longitude` | DECIMAL(11,8) | NOT NULL | Location longitude |
| `CreatedAt` | DATETIME2 | NOT NULL | Profile creation timestamp |

**Indexes:**
- Primary Key on `Id`
- Unique Index on `UserId`
- Foreign Key to `Users(Id)`

**SQL Definition:**

```sql
CREATE TABLE [dbo].[Lawyers] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [UserId] INT NOT NULL,
    [Specialization] NVARCHAR(100) NOT NULL DEFAULT '',
    [ExperienceYears] INT NOT NULL DEFAULT 0,
    [Price] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [Verified] BIT NOT NULL DEFAULT 0,
    [Address] NVARCHAR(200) NOT NULL DEFAULT '',
    [Latitude] DECIMAL(10,8) NOT NULL DEFAULT 0,
    [Longitude] DECIMAL(11,8) NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PK_Lawyers] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Lawyers_Users_UserId] FOREIGN KEY ([UserId]) 
        REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);

CREATE UNIQUE INDEX [IX_Lawyers_UserId] ON [dbo].[Lawyers] ([UserId]);
```

##### B.2.3 Bookings Table

**Table Name:** `Bookings`

**Description:** Stores consultation bookings between clients and lawyers.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique booking identifier |
| `UserId` | INT | FOREIGN KEY, NOT NULL | Reference to client user |
| `LawyerId` | INT | FOREIGN KEY, NOT NULL | Reference to lawyer |
| `Date` | DATETIME2 | NOT NULL | Scheduled consultation date/time |
| `Status` | NVARCHAR(MAX) | NOT NULL | Booking status |
| `PaymentStatus` | NVARCHAR(MAX) | NOT NULL | Payment status |
| `TransactionId` | NVARCHAR(MAX) | NOT NULL | Payment transaction reference |
| `CreatedAt` | DATETIME2 | NOT NULL | Booking creation timestamp |

**Status Values:**
- `Pending` - Awaiting confirmation
- `Confirmed` - Booking confirmed
- `Completed` - Consultation completed
- `Cancelled` - Booking cancelled

**Payment Status Values:**
- `Pending` - Payment not yet made
- `Paid` - Payment completed
- `Refunded` - Payment refunded

**Indexes:**
- Primary Key on `Id`
- Index on `UserId`
- Index on `LawyerId`
- Foreign Key to `Users(Id)`
- Foreign Key to `Lawyers(Id)`

**SQL Definition:**

```sql
CREATE TABLE [dbo].[Bookings] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [UserId] INT NOT NULL,
    [LawyerId] INT NOT NULL,
    [Date] DATETIME2 NOT NULL,
    [Status] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [PaymentStatus] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [TransactionId] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [CreatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PK_Bookings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Bookings_Users_UserId] FOREIGN KEY ([UserId]) 
        REFERENCES [dbo].[Users] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Bookings_Lawyers_LawyerId] FOREIGN KEY ([LawyerId]) 
        REFERENCES [dbo].[Lawyers] ([Id]) ON DELETE NO ACTION
);

CREATE INDEX [IX_Bookings_UserId] ON [dbo].[Bookings] ([UserId]);
CREATE INDEX [IX_Bookings_LawyerId] ON [dbo].[Bookings] ([LawyerId]);
```

##### B.2.4 PaymentSessions Table

**Table Name:** `PaymentSessions`

**Description:** Stores payment transaction sessions for bookings.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `Id` | INT | PRIMARY KEY, IDENTITY | Unique session identifier |
| `BookingId` | INT | FOREIGN KEY, UNIQUE | Reference to booking |
| `Amount` | DECIMAL(18,2) | NOT NULL | Payment amount |
| `Status` | NVARCHAR(MAX) | NOT NULL | Payment session status |
| `Provider` | NVARCHAR(MAX) | NOT NULL | Payment provider name |
| `ProviderSessionId` | NVARCHAR(MAX) | NOT NULL | External provider session ID |
| `CreatedAt` | DATETIME2 | NOT NULL | Session creation timestamp |

**Status Values:**
- `Pending` - Payment initiated
- `Completed` - Payment successful
- `Failed` - Payment failed
- `Refunded` - Payment refunded

**Indexes:**
- Primary Key on `Id`
- Unique Index on `BookingId`
- Foreign Key to `Bookings(Id)`

**SQL Definition:**

```sql
CREATE TABLE [dbo].[PaymentSessions] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [BookingId] INT NOT NULL,
    [Amount] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [Status] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [Provider] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [ProviderSessionId] NVARCHAR(MAX) NOT NULL DEFAULT '',
    [CreatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PK_PaymentSessions] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PaymentSessions_Bookings_BookingId] FOREIGN KEY ([BookingId]) 
        REFERENCES [dbo].[Bookings] ([Id]) ON DELETE CASCADE
);

CREATE UNIQUE INDEX [IX_PaymentSessions_BookingId] ON [dbo].[PaymentSessions] ([BookingId]);
```

#### B.3 Entity Relationship Diagram

```mermaid
erDiagram
    Users ||--o| Lawyers : "has profile"
    Users ||--o{ Bookings : "makes"
    Lawyers ||--o{ Bookings : "receives"
    Bookings ||--o| PaymentSessions : "has payment"

    Users {
        int Id PK
        string FullName
        string Email UK
        string PasswordHash
        string Role
        string Phone
        string City
        datetime CreatedAt
    }

    Lawyers {
        int Id PK
        int UserId FK,UK
        string Specialization
        int ExperienceYears
        decimal Price
        bit Verified
        string Address
        decimal Latitude
        decimal Longitude
        datetime CreatedAt
    }

    Bookings {
        int Id PK
        int UserId FK
        int LawyerId FK
        datetime Date
        string Status
        string PaymentStatus
        string TransactionId
        datetime CreatedAt
    }

    PaymentSessions {
        int Id PK
        int BookingId FK,UK
        decimal Amount
        string Status
        string Provider
        string ProviderSessionId
        datetime CreatedAt
    }
```

#### B.4 Relationship Summary

| Relationship | Type | Description |
|--------------|------|-------------|
| Users → Lawyers | One-to-One (Optional) | A user may have one lawyer profile |
| Users → Bookings | One-to-Many | A user can have multiple bookings |
| Lawyers → Bookings | One-to-Many | A lawyer can have multiple bookings |
| Bookings → PaymentSessions | One-to-One (Optional) | A booking may have one payment session |

#### B.5 Data Constraints Summary

| Table | Constraint | Type | Description |
|-------|------------|------|-------------|
| Users | Email | UNIQUE | No duplicate email addresses |
| Lawyers | UserId | UNIQUE | One lawyer profile per user |
| Lawyers | ExperienceYears | CHECK | Must be 0-100 |
| Lawyers | Price | CHECK | Must be positive |
| Lawyers | Latitude | CHECK | Must be -90 to 90 |
| Lawyers | Longitude | CHECK | Must be -180 to 180 |
| PaymentSessions | BookingId | UNIQUE | One payment session per booking |

### Appendix C: UI Screenshots

This appendix provides placeholder sections for user interface screenshots of the LawyerConnect platform.

#### C.1 Landing Page

**Description:** The main landing page that users see when visiting the LawyerConnect platform.

| Screenshot | Description |
|------------|-------------|
| ![Landing Page Hero](screenshots/landing-hero.png) | Hero section with call-to-action |
| ![Landing Page Features](screenshots/landing-features.png) | Features overview section |
| ![Landing Page How It Works](screenshots/landing-how-it-works.png) | Step-by-step process explanation |
| ![Landing Page Testimonials](screenshots/landing-testimonials.png) | User testimonials section |

*[Screenshots to be added during deployment]*

#### C.2 Authentication Screens

**Description:** User authentication interfaces including login and registration.

| Screenshot | Description |
|------------|-------------|
| ![Login Modal](screenshots/auth-login.png) | User login modal with email/password fields |
| ![Signup Modal](screenshots/auth-signup.png) | User registration modal with role selection |
| ![Lawyer Registration](screenshots/auth-lawyer-signup.png) | Lawyer-specific registration form |

*[Screenshots to be added during deployment]*

#### C.3 Browse Lawyers Page

**Description:** Interface for browsing and searching available lawyers.

| Screenshot | Description |
|------------|-------------|
| ![Lawyers List](screenshots/browse-lawyers-list.png) | Grid view of available lawyers |
| ![Lawyer Filters](screenshots/browse-lawyers-filters.png) | Filter options (specialization, location, price) |
| ![Lawyer Search](screenshots/browse-lawyers-search.png) | Search functionality |

*[Screenshots to be added during deployment]*

#### C.4 Lawyer Profile Page

**Description:** Detailed lawyer profile view with booking capability.

| Screenshot | Description |
|------------|-------------|
| ![Lawyer Profile Header](screenshots/lawyer-profile-header.png) | Lawyer information and credentials |
| ![Lawyer Profile Details](screenshots/lawyer-profile-details.png) | Specialization, experience, and pricing |
| ![Booking Calendar](screenshots/lawyer-profile-calendar.png) | Consultation booking calendar |
| ![Lawyer Location Map](screenshots/lawyer-profile-map.png) | Office location on map |

*[Screenshots to be added during deployment]*

#### C.5 User Dashboard

**Description:** Client dashboard for managing bookings and profile.

| Screenshot | Description |
|------------|-------------|
| ![User Dashboard Overview](screenshots/user-dashboard-overview.png) | Dashboard main view |
| ![User Bookings List](screenshots/user-dashboard-bookings.png) | List of user's bookings |
| ![User Profile Settings](screenshots/user-dashboard-profile.png) | Profile management section |

*[Screenshots to be added during deployment]*

#### C.6 Lawyer Dashboard

**Description:** Lawyer dashboard for managing consultations and profile.

| Screenshot | Description |
|------------|-------------|
| ![Lawyer Dashboard Overview](screenshots/lawyer-dashboard-overview.png) | Dashboard main view |
| ![Lawyer Bookings](screenshots/lawyer-dashboard-bookings.png) | Incoming booking requests |
| ![Lawyer Earnings](screenshots/lawyer-dashboard-earnings.png) | Earnings and statistics |
| ![Lawyer Profile Edit](screenshots/lawyer-dashboard-profile.png) | Profile editing interface |

*[Screenshots to be added during deployment]*

#### C.7 Account Settings Page

**Description:** User account management interface.

| Screenshot | Description |
|------------|-------------|
| ![Account Overview](screenshots/account-overview.png) | Account information display |
| ![Edit Profile](screenshots/account-edit-profile.png) | Profile editing form |
| ![Change Password](screenshots/account-change-password.png) | Password change interface |

*[Screenshots to be added during deployment]*

#### C.8 Admin Dashboard

**Description:** Administrator interface for platform management.

| Screenshot | Description |
|------------|-------------|
| ![Admin Dashboard](screenshots/admin-dashboard.png) | Admin main dashboard |
| ![User Management](screenshots/admin-users.png) | User management interface |
| ![Lawyer Verification](screenshots/admin-lawyer-verification.png) | Lawyer verification queue |
| ![System Reports](screenshots/admin-reports.png) | System analytics and reports |

*[Screenshots to be added during deployment]*

#### C.9 Mobile Responsive Views

**Description:** Mobile-optimized interface views.

| Screenshot | Description |
|------------|-------------|
| ![Mobile Landing](screenshots/mobile-landing.png) | Landing page on mobile |
| ![Mobile Navigation](screenshots/mobile-nav.png) | Mobile navigation menu |
| ![Mobile Lawyer List](screenshots/mobile-lawyers.png) | Lawyers list on mobile |
| ![Mobile Booking](screenshots/mobile-booking.png) | Booking interface on mobile |

*[Screenshots to be added during deployment]*

#### C.10 Screenshot Directory Structure

```
screenshots/
├── landing-hero.png
├── landing-features.png
├── landing-how-it-works.png
├── landing-testimonials.png
├── auth-login.png
├── auth-signup.png
├── auth-lawyer-signup.png
├── browse-lawyers-list.png
├── browse-lawyers-filters.png
├── browse-lawyers-search.png
├── lawyer-profile-header.png
├── lawyer-profile-details.png
├── lawyer-profile-calendar.png
├── lawyer-profile-map.png
├── user-dashboard-overview.png
├── user-dashboard-bookings.png
├── user-dashboard-profile.png
├── lawyer-dashboard-overview.png
├── lawyer-dashboard-bookings.png
├── lawyer-dashboard-earnings.png
├── lawyer-dashboard-profile.png
├── account-overview.png
├── account-edit-profile.png
├── account-change-password.png
├── admin-dashboard.png
├── admin-users.png
├── admin-lawyer-verification.png
├── admin-reports.png
├── mobile-landing.png
├── mobile-nav.png
├── mobile-lawyers.png
└── mobile-booking.png
```

**Note:** Screenshots should be captured at the following resolutions:
- Desktop: 1920x1080 pixels
- Tablet: 768x1024 pixels
- Mobile: 375x812 pixels

### Appendix D: Glossary

This appendix provides definitions for all technical terms, acronyms, and domain-specific vocabulary used throughout this document.

#### D.1 Business Terms

| Term | Definition |
|------|------------|
| **Administrator** | A system user with elevated privileges responsible for platform management, user oversight, and lawyer verification |
| **Booking** | A scheduled consultation appointment between a client and a lawyer |
| **Client** | A registered user who seeks legal consultation services through the platform |
| **Consultation** | A professional meeting between a client and a lawyer for legal advice or services |
| **Hourly Rate** | The fee charged by a lawyer per hour of consultation time |
| **Lawyer** | A verified legal professional who offers consultation services on the platform |
| **Payment Session** | A transaction record created when processing payment for a consultation |
| **Specialization** | The specific area of legal expertise (e.g., Criminal Law, Family Law, Corporate Law) |
| **Stakeholder** | Any person or entity with interest in the system, including users, lawyers, administrators, and business owners |
| **User** | Any person who interacts with the LawyerConnect platform |
| **Verification** | The administrative process of validating a lawyer's credentials and qualifications before their profile becomes publicly visible |

#### D.2 Technical Terms

| Term | Definition |
|------|------------|
| **API (Application Programming Interface)** | A set of protocols and tools for building software applications, enabling communication between different software components |
| **Authentication** | The process of verifying the identity of a user attempting to access the system |
| **Authorization** | The process of determining what actions an authenticated user is permitted to perform |
| **Backend** | The server-side portion of the application that handles business logic, data processing, and database operations |
| **Bearer Token** | A type of access token used in HTTP authentication, typically sent in the Authorization header |
| **CORS (Cross-Origin Resource Sharing)** | A security mechanism that allows or restricts web applications from making requests to a different domain |
| **CRUD** | An acronym for Create, Read, Update, Delete - the four basic operations of persistent storage |
| **Database** | An organized collection of structured data stored electronically |
| **DTO (Data Transfer Object)** | An object used to transfer data between software application subsystems |
| **Endpoint** | A specific URL path in an API that accepts requests and returns responses |
| **Entity** | A distinct object or concept in the system that has data stored about it (e.g., User, Lawyer, Booking) |
| **Foreign Key** | A database field that links one table to another by referencing the primary key of the related table |
| **Frontend** | The client-side portion of the application that users interact with directly |
| **Hash** | A fixed-size string generated from input data using a cryptographic algorithm, used for secure password storage |
| **HTTP (HyperText Transfer Protocol)** | The foundation protocol for data communication on the World Wide Web |
| **HTTPS** | HTTP Secure - HTTP with encryption using TLS/SSL for secure communication |
| **Index** | A database structure that improves the speed of data retrieval operations |
| **JSON (JavaScript Object Notation)** | A lightweight data interchange format that is easy for humans to read and write |
| **JWT (JSON Web Token)** | A compact, URL-safe token format used for securely transmitting information between parties |
| **Middleware** | Software that acts as a bridge between an operating system or database and applications |
| **Migration** | A version-controlled change to the database schema |
| **ORM (Object-Relational Mapping)** | A technique for converting data between incompatible type systems in object-oriented programming languages |
| **Primary Key** | A unique identifier for each record in a database table |
| **Rate Limiting** | A technique to control the number of requests a user can make to an API within a specified time period |
| **Repository Pattern** | A design pattern that mediates between the domain and data mapping layers |
| **REST (Representational State Transfer)** | An architectural style for designing networked applications using HTTP methods |
| **SPA (Single Page Application)** | A web application that loads a single HTML page and dynamically updates content |
| **SQL (Structured Query Language)** | A standard language for managing and manipulating relational databases |
| **TLS (Transport Layer Security)** | A cryptographic protocol designed to provide secure communication over a network |
| **Token** | A piece of data that represents authorization to access resources |
| **UI (User Interface)** | The visual elements through which users interact with the application |
| **UX (User Experience)** | The overall experience of a person using the application |
| **Validation** | The process of checking that data meets specified criteria before processing |

#### D.3 Technology Stack Terms

| Term | Definition |
|------|------------|
| **ASP.NET Core** | A cross-platform, high-performance framework for building modern web applications |
| **Axios** | A promise-based HTTP client for making API requests from JavaScript applications |
| **Entity Framework Core** | A modern object-database mapper for .NET that enables developers to work with databases using .NET objects |
| **Framer Motion** | A production-ready motion library for React |
| **Kestrel** | A cross-platform web server for ASP.NET Core |
| **Lucide React** | A collection of beautiful, consistent icons for React applications |
| **React** | A JavaScript library for building user interfaces |
| **React Router** | A standard library for routing in React applications |
| **SQL Server** | A relational database management system developed by Microsoft |
| **Tailwind CSS** | A utility-first CSS framework for rapidly building custom user interfaces |
| **TypeScript** | A typed superset of JavaScript that compiles to plain JavaScript |
| **Vite** | A modern frontend build tool that provides a faster development experience |

#### D.4 Status Values

| Status Type | Value | Definition |
|-------------|-------|------------|
| **Booking Status** | Pending | Booking has been created but not yet confirmed by the lawyer |
| **Booking Status** | Confirmed | Booking has been accepted by the lawyer |
| **Booking Status** | Completed | Consultation has been completed |
| **Booking Status** | Cancelled | Booking has been cancelled by either party |
| **Payment Status** | Pending | Payment has not yet been processed |
| **Payment Status** | Paid | Payment has been successfully completed |
| **Payment Status** | Refunded | Payment has been refunded to the client |
| **Payment Session Status** | Pending | Payment session created, awaiting completion |
| **Payment Session Status** | Completed | Payment successfully processed |
| **Payment Session Status** | Failed | Payment processing failed |
| **Payment Session Status** | Refunded | Payment has been refunded |
| **User Role** | User | Standard client user |
| **User Role** | Lawyer | Legal professional user |
| **User Role** | Admin | System administrator |
| **Verification Status** | Verified | Lawyer credentials have been approved |
| **Verification Status** | Unverified | Lawyer credentials pending review |

#### D.5 HTTP Status Codes

| Code | Name | Usage in LawyerConnect |
|------|------|------------------------|
| 200 | OK | Successful GET or PUT request |
| 201 | Created | Successful POST request creating a new resource |
| 204 | No Content | Successful request with no response body |
| 400 | Bad Request | Invalid input data or validation failure |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Authenticated but insufficient permissions |
| 404 | Not Found | Requested resource does not exist |
| 409 | Conflict | Resource conflict (e.g., duplicate email) |
| 500 | Internal Server Error | Unexpected server-side error |

#### D.6 Acronyms Quick Reference

| Acronym | Full Form |
|---------|-----------|
| API | Application Programming Interface |
| CORS | Cross-Origin Resource Sharing |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| DB | Database |
| DTO | Data Transfer Object |
| EF | Entity Framework |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| ID | Identifier |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| REST | Representational State Transfer |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| SRS | Software Requirements Specification |
| TLS | Transport Layer Security |
| UI | User Interface |
| UX | User Experience |

### Appendix E: Index

This appendix provides an alphabetical index of key terms, concepts, and topics covered in this document for quick reference.

#### A

| Term | Section(s) |
|------|------------|
| Access Control | 2.4, 4.2 |
| Account Deactivation | 3.2 |
| Admin Dashboard | 5.4, C.8 |
| Administrator | 2.2.3, D.1 |
| API Endpoints | 7.2, A |
| API Versioning | 7.5.9 |
| ASP.NET Core | 2.3.2, 2.6, D.3 |
| Authentication | 3.1, 4.2, 7.5.4 |
| Authorization | 4.2, 7.5.4 |
| Axios | 2.3.2, D.3 |

#### B

| Term | Section(s) |
|------|------------|
| Backend Architecture | 2.6.2 |
| Bearer Token | 7.5.4, D.2 |
| Booking | 3.4, 6.2, B.2.3, D.1 |
| Booking Calendar | C.4 |
| Booking Status | 3.4, D.4 |
| Browser Support | 2.3.3, 4.7 |

#### C

| Term | Section(s) |
|------|------------|
| Cancellation | 3.4 |
| Client (User Class) | 2.2.1, D.1 |
| Communication Interface | 7.5 |
| Compatibility | 4.7 |
| Constraints | 2.4 |
| Consultation | 1.2, D.1 |
| CORS | 7.5.5, D.2 |
| CRUD Operations | 3.2, D.2 |

#### D

| Term | Section(s) |
|------|------------|
| Data Flow | 2.6.4 |
| Data Models | 6.2 |
| Data Retention | 6.5 |
| Data Validation | 6.4, B.5 |
| Database Schema | 6, B |
| Dependencies | 2.5.2 |
| Deployment | 2.6.6 |
| DTO | 2.6.2, D.2 |

#### E

| Term | Section(s) |
|------|------------|
| Email Uniqueness | 6.4, B.2.1 |
| Entity Framework Core | 2.3.2, 2.6, D.3 |
| Entity Relationships | 6.3, B.4 |
| Error Handling | 7.5.7 |
| Experience Years | 3.3, B.2.2 |

#### F

| Term | Section(s) |
|------|------------|
| Fault Tolerance | 4.3 |
| Foreign Key | B.2, D.2 |
| Framer Motion | 2.3.2, D.3 |
| Frontend Architecture | 2.6.2 |
| Functional Requirements | 3 |

#### G-H

| Term | Section(s) |
|------|------------|
| Glossary | 1.4, D |
| Hardware Interface | 7.3 |
| Hardware Requirements | 2.3.1 |
| Hourly Rate | 3.3, D.1 |
| HTTP Status Codes | D.5 |
| HTTPS | 7.5.2, D.2 |

#### I-J

| Term | Section(s) |
|------|------------|
| IEEE 830 | 1.1, 1.5.1 |
| Index (Database) | B.2 |
| Interface Requirements | 7 |
| JSON | 7.5.3, D.2 |
| JWT | 3.1, 7.5.4, D.2 |

#### K-L

| Term | Section(s) |
|------|------------|
| Kestrel | 2.6.6, D.3 |
| KPIs | 1.3.3 |
| Latitude/Longitude | 3.3, B.2.2 |
| Lawyer | 2.2.2, 3.3, D.1 |
| Lawyer Dashboard | 5.3, C.6 |
| Lawyer Management | 3.3 |
| Lawyer Profile | 3.3, C.4 |
| Lawyer Verification | 3.3, 3.6 |
| Login | 3.1, A.1.2 |

#### M-N

| Term | Section(s) |
|------|------------|
| Maintainability | 4.6 |
| Middleware | 2.6.2, D.2 |
| Migration | 2.4.4, D.2 |
| Mobile Responsive | C.9 |
| Multi-language | 1.3.2, 2.4.2 |
| Network Requirements | 2.3.4 |
| Non-Functional Requirements | 4 |
| Notifications | 3.4 |

#### O-P

| Term | Section(s) |
|------|------------|
| Objectives | 1.3.2 |
| Operating Environment | 2.3 |
| ORM | 2.6, D.2 |
| Password Change | 3.2, A.2.3 |
| Password Hashing | 4.2, D.2 |
| Payment Processing | 3.5 |
| Payment Session | 3.5, 6.2, B.2.4, D.1 |
| Payment Status | D.4 |
| Performance | 4.1 |
| Primary Key | B.2, D.2 |
| Profile Management | 3.2, 3.3 |

#### Q-R

| Term | Section(s) |
|------|------------|
| Rate Limiting | 7.5.6, D.2 |
| React | 2.3.2, 2.6, D.3 |
| References | 1.5 |
| Registration | 3.1, A.1.1 |
| Reliability | 4.3 |
| Repository Pattern | 2.4.4, 2.6.2, D.2 |
| REST API | 2.6.3, D.2 |
| Role-Based Access | 2.2, 4.2 |

#### S

| Term | Section(s) |
|------|------------|
| Scalability | 4.5 |
| Scheduling | 3.4 |
| Scope | 1.2 |
| Search/Filter | 3.3 |
| Security | 2.6.5, 4.2 |
| Service Layer | 2.6.2 |
| Software Interface | 7.4 |
| Software Requirements | 2.3.2 |
| SPA | 2.6, D.2 |
| Specialization | 3.3, D.1 |
| SQL Server | 2.3.2, D.3 |
| Stakeholder | D.1 |
| Status Values | D.4 |
| System Architecture | 2.6 |
| System Context | 2.1.1 |
| System Perspective | 2.1 |

#### T

| Term | Section(s) |
|------|------------|
| Tailwind CSS | 2.3.2, D.3 |
| Testing Strategy | Design Document |
| TLS | 7.5.2, D.2 |
| Token | 3.1, 7.5.4, D.2 |
| Transaction ID | B.2.3 |
| TypeScript | 2.3.2, D.3 |

#### U

| Term | Section(s) |
|------|------------|
| UI Requirements | 7.1 |
| UI Screenshots | C |
| Usability | 4.4 |
| Use Cases | 5 |
| User | 2.2.1, 6.2, B.2.1, D.1 |
| User Classes | 2.2 |
| User Dashboard | 5.2, C.5 |
| User Interface | 7.1 |
| User Management | 3.2 |
| User Registration | 3.1 |
| User Role | D.4 |

#### V-W

| Term | Section(s) |
|------|------------|
| Validation Rules | 6.4, B.5 |
| Verification | 3.3, 3.6, D.1 |
| Verification Status | D.4 |
| Vision Statement | 1.3.1 |
| Vite | 2.3.2, D.3 |
| WebSocket | 7.5.8 |

#### X-Z

| Term | Section(s) |
|------|------------|
| (No entries) | - |

---

#### Quick Section Reference

| Section | Title | Page |
|---------|-------|------|
| 1 | Introduction | - |
| 1.1 | Purpose | - |
| 1.2 | Scope | - |
| 1.3 | Vision and Objectives | - |
| 1.4 | Definitions, Acronyms, and Abbreviations | - |
| 1.5 | References | - |
| 2 | Overall Description | - |
| 2.1 | System Perspective | - |
| 2.2 | User Classes and Characteristics | - |
| 2.3 | Operating Environment | - |
| 2.4 | Design and Implementation Constraints | - |
| 2.5 | Assumptions and Dependencies | - |
| 2.6 | System Architecture | - |
| 3 | Functional Requirements | - |
| 3.1 | Authentication Module | - |
| 3.2 | User Management Module | - |
| 3.3 | Lawyer Management Module | - |
| 3.4 | Booking System Module | - |
| 3.5 | Payment Processing Module | - |
| 3.6 | Admin Module | - |
| 4 | Non-Functional Requirements | - |
| 4.1 | Performance Requirements | - |
| 4.2 | Security Requirements | - |
| 4.3 | Reliability Requirements | - |
| 4.4 | Usability Requirements | - |
| 4.5 | Scalability Requirements | - |
| 4.6 | Maintainability Requirements | - |
| 4.7 | Compatibility Requirements | - |
| 5 | Use Cases | - |
| 5.1 | Use Case Diagram | - |
| 5.2 | Client Use Cases | - |
| 5.3 | Lawyer Use Cases | - |
| 5.4 | Admin Use Cases | - |
| 6 | Data Requirements | - |
| 6.1 | Entity-Relationship Diagram | - |
| 6.2 | Entity Descriptions | - |
| 6.3 | Data Relationships | - |
| 6.4 | Data Validation Rules | - |
| 6.5 | Data Retention Requirements | - |
| 7 | Interface Requirements | - |
| 7.1 | User Interface Requirements | - |
| 7.2 | API Interface Requirements | - |
| 7.3 | Hardware Interface Requirements | - |
| 7.4 | Software Interface Requirements | - |
| 7.5 | Communication Interface Requirements | - |
| 8 | Appendices | - |
| A | API Reference | - |
| B | Database Schema | - |
| C | UI Screenshots | - |
| D | Glossary | - |
| E | Index | - |

---

*End of Document*
