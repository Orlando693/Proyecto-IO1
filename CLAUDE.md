# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

Ok

*Session: be1e253f5b46f90edc182cb6e3d63626 | Generated: 3/7/2025, 8:49:00 p.m.*

### Analysis Summary

# Proyecto-IO1 Codebase Overview

## High-Level Architecture

The `Proyecto-IO1` codebase is structured as a full-stack application, comprising a distinct **backend** service and a **frontend** client. This separation allows for independent development and deployment of both components. The **backend** provides API services, handles data persistence, and contains the core optimization logic. The **frontend** is a web-based user interface that consumes these APIs to provide interactive functionality to users.

### Main Components

*   **Backend Service** [backendIO1/](backendIO1/)
*   **Frontend Application** [frontendIO1/](frontendIO1/)

## Backend Service [backendIO1/](backendIO1/)

The **backend** is a Python-based application, likely built with FastAPI, responsible for serving data, managing user authentication, and executing optimization algorithms.

### Internal Structure

*   **Application Entry Point**: The main application instance is defined in [main.py](backendIO1/main.py), which orchestrates the various API routes.
*   **Database Management**:
    *   [database.py](backendIO1/database.py) handles database connection and session management.
    *   [init_db.py](backendIO1/init_db.py) is likely used for initial database setup or migrations.
    *   [modelos.py](backendIO1/modelos.py) (or [models/models.py](backendIO1/models/models.py)) defines the database schemas and ORM models.
*   **API Routes**: The [routes/](backendIO1/routes/) directory contains modules defining specific API endpoints:
    *   [auth.py](backendIO1/routes/auth.py): Handles user authentication and authorization.
    *   [optimization.py](backendIO1/routes/optimization.py): Exposes endpoints related to the optimization logic.
    *   [user.py](backendIO1/routes/user.py): Manages user-related operations.
*   **Business Logic**:
    *   [optimizador.py](backendIO1/optimizador.py) likely contains the core implementation of the optimization algorithms.
    *   [services.py](backendIO1/services.py) might contain business logic that interacts with the database and other components.
*   **Data Schemas**: The [schemas/](backendIO1/schemas/) directory defines Pydantic models for request and response data validation and serialization:
    *   [auth.py](backendIO1/schemas/auth.py)
    *   [user.py](backendIO1/schemas/user.py)
*   **Configuration**: The [config/](backendIO1/config/) directory holds application-wide configuration settings:
    *   [db.py](backendIO1/config/db.py): Database configuration.
    *   [openapi.py](backendIO1/config/openapi.py): OpenAPI (Swagger) documentation configuration.
*   **Dependencies**: [requirements.txt](backendIO1/requirements.txt) lists all Python dependencies required for the backend.

### External Relationships

The **backend** exposes a RESTful API that is consumed by the **frontend** application. It persists data in a database, whose connection details are managed through [database.py](backendIO1/database.py) and [config/db.py](backendIO1/config/db.py).

## Frontend Application [frontendIO1/](frontendIO1/)

The **frontend** is a web application, likely built with React, providing the user interface for interacting with the backend services.

### Internal Structure

*   **Application Entry Point**: The main React application is initialized in [main.jsx](frontendIO1/src/main.jsx), which renders the root component [App.jsx](frontendIO1/src/App.jsx).
*   **Components**: The [components/](frontendIO1/src/components/) directory contains reusable UI components:
    *   [AsignacionTable.jsx](frontendIO1/src/components/AsignacionTable.jsx)
    *   [AulaForm.jsx](frontendIO1/src/components/AulaForm.jsx)
    *   [GrupoForm.jsx](frontendIO1/src/components/GrupoForm.jsx)
    *   [HorarioForm.jsx](frontendIO1/src/components/HorarioForm.jsx)
    *   [LayoutPrivado.jsx](frontendIO1/src/components/LayoutPrivado.jsx)
    *   [Loginpage.jsx](frontendIO1/src/components/Loginpage.jsx)
    *   [ParametrosForm.jsx](frontendIO1/src/components/ParametrosForm.jsx)
    *   [RutaPrivada.jsx](frontendIO1/src/components/RutaPrivada.jsx)
*   **Pages**: The [pages/](frontendIO1/src/pages/) directory contains top-level components representing different views or pages of the application:
    *   [Home.jsx](frontendIO1/src/pages/Home.jsx)
    *   [Resultados.jsx](frontendIO1/src/pages/Resultados.jsx)
*   **Contexts**: The [contexts/](frontendIO1/src/contexts/) directory likely manages global state using React Context API:
    *   [AuthContext.js](frontendIO1/src/contexts/AuthContext.js) (or [AuthContext.jsx](frontendIO1/src/contexts/AuthContext.jsx)): Manages authentication state.
*   **Hooks**: The [hooks/](frontendIO1/src/hooks/) directory contains custom React hooks for reusable logic:
    *   [useAuth.js](frontendIO1/src/hooks/useAuth.js): Likely provides convenient access to authentication context.
*   **API Services**: [api.js](frontendIO1/src/services/api.js) is responsible for making HTTP requests to the backend API.
*   **Styling**: [index.css](frontendIO1/src/index.css) defines global styles.
*   **Build Configuration**: [package.json](frontendIO1/package.json) and [vite.config.js](frontendIO1/vite.config.js) define project dependencies and build configurations (using Vite).

### External Relationships

The **frontend** communicates with the **backend** service via HTTP requests, primarily through the API client defined in [api.js](frontendIO1/src/services/api.js). It relies on the backend for data retrieval, authentication, and triggering optimization processes.

