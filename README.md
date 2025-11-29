# Kinematics Hub

A modular platform for the kinematics and robotics community.

## Architecture

This project follows a modular, service-oriented architecture.

### Services

- **Auth Service**: User identity, JWT issuance, role management.
- **Frontend**: Next.js shell application.
- **(Planned) Community Service**: Forums and Q&A.
- **(Planned) Projects Service**: Student gallery and project management.
- **(Planned) Events Service**: Webinars and events.
- **(Planned) Chat Service**: Real-time communication.
- **(Planned) LLM Gateway**: AI assistance.
# Kinematics Hub

A modular platform for the kinematics and robotics community.

## Architecture

This project follows a modular, service-oriented architecture.

### Services

- **Auth Service**: User identity, JWT issuance, role management.
- **Frontend**: Next.js shell application.
- **(Planned) Community Service**: Forums and Q&A.
- **(Planned) Projects Service**: Student gallery and project management.
- **(Planned) Events Service**: Webinars and events.
- **(Planned) Chat Service**: Real-time communication.
- **(Planned) LLM Gateway**: AI assistance.
- **(Planned) Papers Service**: Semantic Scholar integration.

## Status
- **Phase 1**: Core Infrastructure & Auth (Completed)
- **Phase 2**: Community & Events (Completed)
- **Phase 3**: Projects, Tools & Chat (Completed)
- **Phase 4**: LLM Gateway (Completed)
- **Phase 5**: Papers (Completed)
- **Phase 6**: News (Completed)
- **Phase 7**: Refinement (Completed)

## Quick Start
1.  Ensure Docker and Docker Compose are installed.
2.  Run `docker-compose up --build`.
3.  Access the frontend at `http://localhost:3000`.

## Documentation
See `docs/architecture.md` for system design details.
4. Access the Auth Service API docs at `http://localhost:8000/docs`.

## Development

- **Frontend**: `cd frontend` && `npm install` && `npm run dev`
- **Auth Service**: `cd services/auth-service` && `pip install -r requirements.txt` && `uvicorn main:app --reload`
