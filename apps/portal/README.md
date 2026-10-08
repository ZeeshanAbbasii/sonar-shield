# Portal

The dashboard hub for the monorepo. A React (CRA) front end that embeds the
**denoise** (`:3001`) and **sat** (`:3002`) apps, backed by an Express + MongoDB
service providing JWT authentication.

## Structure

```
src/ public/     React dashboard (runs on :3000)
backend/         Express API — auth routes, Mongo models (runs on :5001)
backend/.env     PORT, MONGODB_URI, JWT_SECRET  (copy from .env.example)
```

## Run

```bash
# Backend (needs MongoDB on :27017)
cp backend/.env.example backend/.env     # then set a real JWT_SECRET
npm install                              # in backend/ if it has its own package.json
node backend/server.js                   # http://localhost:5001

# Frontend
npm install
npm start                                # http://localhost:3000
```

The embedded app URLs and the backend's CORS origins are hard-coded to
`localhost:3000/3001/3002`; keep those dev ports or update `src/App.js` and
`backend/server.js` together.

> Security: `backend/.env` holds the JWT secret and Mongo URI and is git-ignored.
> Never commit the real `.env`; use `.env.example` as the template.
