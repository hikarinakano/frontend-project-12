### Hexlet tests and linter status:
[![Actions Status](https://github.com/hikarinakano/frontend-project-11/workflows/hexlet-check/badge.svg)](https://github.com/hikarinakano/frontend-project-12/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7d09e9646dc955da3c82/maintainability)](https://codeclimate.com/github/hikarinakano/frontend-project-12/maintainability)

# Hexlet Chat

A real-time chat application similar to Slack, featuring channels, messages, and user authentication.

## Demo

🔗 [Live Demo](https://chat-slack-4-project.onrender.com/)

## Features

- Real-time messaging
- Channel management (create, rename, delete)
- User authentication
- Responsive design
- Localization support

## Requirements

- Node.js version 20.16 or higher
- npm or yarn package manager
- A working terminal
- Supported operating systems: MacOS, Linux, and Windows

## Installation

1. Clone the repository:
```bash
git clone git@github.com:hikarinakano/frontend-project-12.git
cd frontend-project-12
```

2. Install dependencies:
```bash
make install # or npm ci
```

## Development

To start the development server:
```bash
make start # or npm start
```

The application will be available at `http://localhost:3000`

## Production Build

To create a production build:
```bash
make build # or npm run build
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `build` directory

3. You can deploy the built files to any static hosting service (Render, Vercel, Netlify, etc.)

4. Make sure to set up the following environment variables in your deployment environment:
   - `REACT_APP_API_URL` - Backend API URL
   - Any other environment variables your app requires

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run lint` - Runs the linter
