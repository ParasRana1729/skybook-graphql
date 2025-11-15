# GitHub Setup Guide

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `skybook-flight-booking`)
5. Choose Public or Private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files uploaded
3. The commit message should appear in the commit history

## Quick Commands Reference

```bash
# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline
```

## Current Repository Status

✅ Git initialized
✅ Initial commit created
✅ .gitignore configured (excludes node_modules)
✅ Ready to push to GitHub

## Next Steps

1. Create repository on GitHub
2. Run the `git remote add origin` command with your repository URL
3. Run `git push -u origin main` to upload your code

