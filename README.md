# Community Watch Crime Reporting System - GitHub Deployment Files

This folder contains standalone files ready for GitHub deployment.

## Files Included

- **index.html** - Documentation and landing page for the Community Watch system
- **script.js** - API configuration and JavaScript utilities for backend integration
- **style.css** - Complete stylesheet for the documentation page
- **schema.sql** - PostgreSQL database schema for the crime reporting system

## What These Files Do

### index.html
A comprehensive documentation page that includes:
- System overview and features
- Technology stack information
- Database setup instructions
- Default login credentials
- Validation rules (IC, phone, password)
- Incident types reference

### script.js
JavaScript configuration and utilities including:
- Database connection configuration
- API endpoint definitions
- Validation functions (password, IC, phone, email)
- Authentication helpers
- Report management functions
- Staff management functions
- Analytics functions

### style.css
Complete styling for the documentation page with:
- Responsive design
- Color palette variables
- Grid layouts
- Card components
- Mobile-friendly navigation

### schema.sql
Complete PostgreSQL database schema with:
- 7 main tables (CITIZEN, STAFF, INCIDENT_TYPE, REPORT, REPORT_MEDIA, AUTHORITY_ACTION, REPORT_RESOLUTION)
- Foreign key relationships
- Indexes for performance
- Views and functions
- Sample data for testing
- Comprehensive documentation

## How to Use

### Option 1: GitHub Pages Documentation
1. Copy all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch / root or docs folder
4. Access your documentation at `https://yourusername.github.io/repository-name`

### Option 2: Local Documentation
1. Open `index.html` in any web browser
2. Review system features and setup instructions
3. Use `schema.sql` to set up your PostgreSQL database
4. Reference `script.js` for API implementation guidance

### Option 3: Backend Integration
1. Use `schema.sql` to create your database:
   ```bash
   createdb community_watch_db
   psql -d community_watch_db -f schema.sql
   ```
2. Reference `script.js` for API endpoint structure
3. Implement the backend according to the defined endpoints
4. Update `DB_CONFIG` in `script.js` with your database credentials

## Database Setup

### Prerequisites
- PostgreSQL 12 or higher
- Node.js 18 or higher (for the React application)
- pnpm package manager (for the React application)

### Quick Start
```bash
# Create database
createdb community_watch_db

# Run schema
psql -d community_watch_db -f schema.sql

# Verify installation
psql -d community_watch_db -c "SELECT * FROM INCIDENT_TYPE;"
```

## Default Login Credentials

**Citizen Account:**
- Email: jane@example.com
- Password: Password123!

**Authority (Ajk Kampung):**
- Email: ahmad@authority.gov
- Password: Admin123!

**Admin Account:**
- Email: admin@authority.gov
- Password: Admin123!

## React Application

These files are part of a larger React + TypeScript application. To run the full application:

1. Navigate to project root: `cd /workspaces/default/code`
2. Install dependencies: `pnpm install`
3. Set up database using `schema.sql`
4. Start development server: `pnpm dev`

The React application is located in the `src/app` directory.

## API Implementation Notes

The `script.js` file defines the expected API structure. When implementing your backend:

1. **Authentication**: Implement JWT-based authentication
2. **Authorization**: Use role-based access control (Citizen, Authority, Admin)
3. **Validation**: Apply server-side validation for IC, phone, and password
4. **Security**: Hash passwords with bcrypt, sanitize inputs, use prepared statements

## System Architecture

```
┌─────────────────┐
│   React App     │ (Frontend)
│  TypeScript +   │
│  Tailwind CSS   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   REST API      │ (Backend - To be implemented)
│   Node.js +     │
│   Express       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL DB  │ (Database - Use schema.sql)
│   7 Tables      │
└─────────────────┘
```

## Support

For questions or issues:
- Review the documentation in `index.html`
- Check the database schema comments in `schema.sql`
- Reference API structure in `script.js`
- Contact your local Ajk Kampung for community-specific support

## Coverage Area

**Taman Tambun Perdana 1, Durian Tunggal, Melaka**

---

*Community Watch Crime Reporting System © 2026*
