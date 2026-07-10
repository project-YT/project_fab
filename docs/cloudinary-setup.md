# Cloudinary Setup

1. Create an account at https://cloudinary.com (free tier is enough).
2. In Settings → Upload, create an unsigned upload preset (e.g. `aurelle_unsigned`) with folder `aurelle`.
3. Add to `.env`:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=aurelle_unsigned
```

4. Images uploaded from the admin dashboard land in Cloudinary; only the `secure_url` and `public_id` are stored in Firestore.
5. Troubleshooting: `Upload preset must be whitelisted` → mark the preset as unsigned. CORS errors → verify the cloud name spelling.
