# SkyBook GraphQL Server

Mock GraphQL server for the SkyBook flight booking application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:4000`

## GraphQL Playground

Once the server is running, you can access the GraphQL Playground at:
`http://localhost:4000`

This allows you to test queries and mutations interactively.

## Environment

Make sure your React app has the GraphQL URL set:
- Default: `http://localhost:4000/graphql`
- Or set `REACT_APP_GRAPHQL_URL` environment variable

