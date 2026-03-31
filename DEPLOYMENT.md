# Deployment Guide - QueensBags

This guide covers deployment options for the QueensBags landing page.

## Quick Start (Development)

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy this React + Vite app.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: QueensBags landing page"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect the Vite setup
5. Click "Deploy"
6. Your site will be live at `https://yourname.vercel.app`

### Auto-Deploy
Any push to the `main` branch will automatically trigger a new deployment.

---

## Option 2: Deploy with Docker

### Build Docker Image

```bash
docker build -t queenbags:latest .
```

### Run Docker Container Locally

```bash
docker run -p 3000:3000 queenbags:latest
```

Visit `http://localhost:3000`

### Using Docker Compose

```bash
docker-compose up --build
```

### Push to Docker Hub (Optional)

```bash
# Tag image
docker tag queenbags:latest YOUR_DOCKERHUB_USERNAME/queenbags:latest

# Login to Docker Hub
docker login

# Push
docker push YOUR_DOCKERHUB_USERNAME/queenbags:latest
```

---

## Option 3: Manual Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with static files ready for any static host.

### Deploy to Any Static Host

- **Netlify**: Drag & drop the `dist/` folder
- **GitHub Pages**: Configure GitHub Actions or manual push
- **AWS S3**: Upload `dist/` folder
- **Azure Static Web Apps**: Connect your repository
- **Firebase Hosting**: Use `firebase deploy`

---

## Environment Variables

Currently, the app doesn't require environment variables. If you add them later:

1. Create a `.env.local` file (not committed)
2. Add your variables: `VITE_API_URL=...`
3. Access in React: `import.meta.env.VITE_API_URL`

---

## Production Checklist

- [x] Build passes without errors (`npm run build`)
- [x] All assets are optimized and bundled
- [x] Environment variables are set (if needed)
- [x] .gitignore excludes `node_modules`, `dist`, `.env`
- [x] Git is initialized and remote is set
- [x] Code is committed and pushed to GitHub
- [x] All contact links work (Instagram, WhatsApp, phone, email)
- [x] Responsive design tested on mobile, tablet, desktop

---

## Monitoring & Updates

### Vercel Deployments
- View all deployments at https://vercel.com/dashboard
- Check logs for any build errors
- Rollback to previous versions if needed

### Docker Deployments
- Monitor container logs: `docker logs <container-id>`
- Update base images regularly for security

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# For localhost:3000
lsof -i :3000
kill -9 <PID>

# For Docker:
docker ps
docker stop <container-id>
```

### GitHub Push Issues
```bash
# Check remote
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Force push (use with caution)
git push -u origin main --force
```

---

## Support

For Vercel issues: [vercel.com/docs](https://vercel.com/docs)

For Docker issues: [docker.com/docs](https://docker.com/docs)
