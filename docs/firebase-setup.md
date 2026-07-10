# Firebase Setup

1. Create a project at https://console.firebase.google.com
2. Enable Authentication → Email/Password.
3. Create a Firestore database in production mode.
4. Copy the web app config into `.env` as `VITE_FIREBASE_*` variables.
5. Set `VITE_FIREBASE_ADMIN_EMAILS=projectet235@gmail.com`.
6. Create the admin user in Firebase Auth (Users → Add user) with the email above and a strong password (never hardcode it).
7. Firestore security rules (paste into Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
        request.auth.token.email in ['projectet235@gmail.com'];
    }
    match /products/{doc}   { allow read: if true; allow write: if isAdmin(); }
    match /categories/{doc} { allow read: if true; allow write: if isAdmin(); }
    match /brands/{doc}     { allow read: if true; allow write: if isAdmin(); }
    match /banners/{doc}    { allow read: if true; allow write: if isAdmin(); }
    match /coupons/{doc}    { allow read: if true; allow write: if isAdmin(); }
    match /settings/{doc}   { allow read: if true; allow write: if isAdmin(); }
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if isAdmin();
    }
    match /orders/{doc} {
      allow create: if true;
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || isAdmin());
      allow update, delete: if isAdmin();
    }
  }
}
```

8. Local dev: `cp .env.example .env`, fill values, then `bun dev`.
9. Vercel: add the same `VITE_*` variables in Project Settings → Environment Variables.
10. Troubleshooting: `auth/invalid-api-key` → check `VITE_FIREBASE_API_KEY`. `Missing or insufficient permissions` → check rules and admin email.
