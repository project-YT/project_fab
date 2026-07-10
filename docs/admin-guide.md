# Admin Guide

Login: go to `/auth`, sign in with the admin email (`projectet235@gmail.com`). Visit `/admin`.

Add a product: Admin → Products → Add product. Fill name, price, stock, category. Drag & drop images. Save.

Upload images: multiple, live progress, stored on Cloudinary. Firestore keeps only URLs.

Edit a product: pencil icon in the products table.

Orders: Admin → Orders. Change status via dropdown.

Banners: Admin → Banners. Add title, subtitle, image URL, CTA, toggle active.

Inventory: Admin → Inventory. Edit stock inline; low stock (<5) highlighted.

Categories / Brands / Coupons / Settings: sidebar CRUD screens; live via Firestore snapshots.
