# Vercel Deployment

1. Push the repo to GitHub.
2. Import the project in Vercel — framework preset TanStack Start / Vite.
3. Build command: `bun run build`. Output: default.
4. Add environment variables (Production + Preview):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_ADMIN_EMAILS`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
5. Add your Vercel domain to Firebase Auth → Settings → Authorized domains.
6. Custom domain: Project Settings → Domains.
7. Troubleshooting: blank page → check env vars; auth popup blocked → domain not authorized in Firebase.
