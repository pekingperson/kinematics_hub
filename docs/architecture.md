# Kinematics Hub Architecture

## Overview
Kinematics Hub is a microservices-based platform for the robotics community.

## Services
1.  **Auth Service**: User management and JWT authentication.
2.  **Community Service**: Forums and course discussions.
3.  **Events Service**: Webinar and event management.
4.  **Projects Service**: Student project gallery.
5.  **Tools Service**: Web-based analysis tools (4-bar, DOF).
6.  **Chat Service**: Real-time chat (WebSocket).
7.  **LLM Gateway**: AI assistant and RAG pipeline.
8.  **Papers Service**: Semantic Scholar integration.
9.  **News Service**: RSS aggregator.

## Frontend
- **Next.js**: React-based frontend shell.
- **Tailwind CSS**: Styling.
- **Axios**: API client.

## Infrastructure
- **Docker Compose**: Local orchestration.
- **PostgreSQL**: Primary database (with `pgvector` for AI).
