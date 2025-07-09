# Docker Setup for PostgreSQL

## Files Created

1. **Dockerfile.postgres** - PostgreSQL Docker image configuration
2. **docker-compose.yml** - Docker Compose configuration for easy setup
3. **init-scripts/01-init.sql** - Database initialization script

## Usage

### Option 1: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL container
docker-compose up -d postgres

# View logs
docker-compose logs postgres

# Stop the container
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -f Dockerfile.postgres -t expense-tracker-postgres .

# Run the container
docker run -d \
  --name expense-tracker-postgres \
  -e POSTGRES_DB=expense_tracker \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  expense-tracker-postgres

# View logs
docker logs expense-tracker-postgres

# Stop and remove
docker stop expense-tracker-postgres
docker rm expense-tracker-postgres
```

## Configuration

The PostgreSQL container uses the following configuration:
- **Database Name**: expense_tracker
- **Username**: postgres
- **Password**: postgres
- **Port**: 5432

These values match your `.env` file configuration.

## Data Persistence

The `docker-compose.yml` includes a volume (`postgres_data`) that persists your database data even when the container is stopped or removed.

## Initialization Scripts

Any SQL files placed in the `init-scripts/` directory will be executed when the database is first created. This is useful for:
- Creating initial schemas
- Inserting seed data
- Setting up database users and permissions

## Connecting from Your Application

Your backend application can connect to the PostgreSQL database using the same configuration from your `.env` file:
- Host: localhost (when running locally)
- Port: 5432
- Database: expense_tracker
- Username: postgres
- Password: postgres
