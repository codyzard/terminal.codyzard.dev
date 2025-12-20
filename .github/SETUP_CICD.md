# CI/CD Setup Guide

This guide will help you set up the CI/CD pipeline with GitHub Actions and Vercel deployment.

## Prerequisites

- GitHub repository for your project
- Vercel account
- Access to repository settings

## 1. Vercel Setup

### Step 1: Install Vercel CLI

```bash
pnpm add -g vercel
```

### Step 2: Link Your Project to Vercel

```bash
vercel login
vercel link
```

Follow the prompts to link your project to Vercel.

### Step 3: Get Vercel Tokens

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token with a descriptive name (e.g., "GitHub Actions")
3. Copy the token - you'll need it for GitHub secrets

### Step 4: Get Project Information

Run these commands to get your Vercel project details:

```bash
# Get your Vercel Organization ID (Team ID)
vercel whoami

# Your project details are in .vercel/project.json
cat .vercel/project.json
```

You'll need:

- `VERCEL_ORG_ID` - Your organization/team ID
- `VERCEL_PROJECT_ID` - Your project ID
- `VERCEL_TOKEN` - The token you created

## 2. GitHub Secrets Setup

### Required Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

| Secret Name         | Description             | Where to Find                                 |
| ------------------- | ----------------------- | --------------------------------------------- |
| `VERCEL_TOKEN`      | Vercel API token        | Created in Vercel Account Settings            |
| `VERCEL_ORG_ID`     | Your Vercel org/team ID | From `.vercel/project.json` (orgId field)     |
| `VERCEL_PROJECT_ID` | Your Vercel project ID  | From `.vercel/project.json` (projectId field) |

### Optional Secrets

| Secret Name     | Description          | Required For          |
| --------------- | -------------------- | --------------------- |
| `CODECOV_TOKEN` | Codecov upload token | Code coverage reports |

## 3. GitHub Environments Setup (Optional)

For better deployment management, set up GitHub environments:

1. Go to Settings → Environments
2. Create two environments:
   - **Preview** - For pull request deployments
   - **Production** - For main branch deployments

### Environment Protection Rules (Recommended)

For Production environment:

- ✅ Required reviewers (1-2 people)
- ✅ Wait timer (optional: 5 minutes)
- ✅ Deployment branches: Only `main`

For Preview environment:

- No protection rules needed

## 4. Workflow Overview

### CI Workflow (`ci.yml`)

**Triggers:** Push to `main`, Pull requests to `main`

**Jobs:**

1. **Code Quality** - Linting, formatting, type checking
2. **Tests** - Run unit tests and generate coverage
3. **Build** - Build the Next.js application

**Status checks:** All jobs must pass before merging PRs

### Preview Deployment (`deploy-preview.yml`)

**Triggers:** Pull requests to `main`

**Actions:**

- Deploys to Vercel Preview environment
- Comments on PR with preview URL
- Automatic deployment for every push to PR

### Production Deployment (`deploy-production.yml`)

**Triggers:** Push to `main` branch

**Actions:**

- Deploys to Vercel Production
- Updates production environment
- Creates deployment summary

## 5. Vercel Project Settings

### Recommended Settings

1. **Build & Development Settings**
   - Framework Preset: `Next.js`
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
   - Output Directory: `.next`

2. **Git Integration**
   - Enable GitHub integration
   - Disable automatic deployments (GitHub Actions will handle this)
   - Settings → Git → Ignored Build Step: `git diff HEAD^ HEAD --quiet . ':(exclude).github'`

3. **Environment Variables**
   - Add any required environment variables in Vercel dashboard
   - Variables are automatically pulled by the workflow

## 6. Branch Protection Rules (Recommended)

Go to Settings → Branches → Add rule for `main`:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - `Code Quality`
  - `Tests`
  - `Build`
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging

## 7. Testing the Setup

### Test Preview Deployment

1. Create a new branch:

   ```bash
   git checkout -b test-deployment
   ```

2. Make a small change and push:

   ```bash
   git add .
   git commit -m "test: CI/CD setup"
   git push origin test-deployment
   ```

3. Create a pull request
4. Check GitHub Actions tab for workflow runs
5. Preview deployment URL will be commented on the PR

### Test Production Deployment

1. Merge the PR to `main`
2. Production deployment will trigger automatically
3. Check the Actions tab for deployment status

## 8. Monitoring and Logs

### GitHub Actions

- View workflow runs: Repository → Actions tab
- View logs: Click on any workflow run
- Re-run failed workflows: Click "Re-run jobs"

### Vercel Deployments

- View deployments: Vercel Dashboard → Deployments
- View logs: Click on any deployment
- Rollback: Click "..." → Redeploy

## Troubleshooting

### Common Issues

**1. "Vercel token is invalid"**

- Regenerate the token in Vercel settings
- Update `VERCEL_TOKEN` secret in GitHub

**2. "Project not found"**

- Verify `VERCEL_PROJECT_ID` matches your project
- Run `vercel link` again

**3. "Build failed"**

- Check build logs in GitHub Actions
- Test build locally: `pnpm build`
- Verify all dependencies are installed

**4. "Tests failing in CI but passing locally"**

- Check Node.js versions match
- Clear cache and reinstall: `pnpm install --frozen-lockfile`
- Verify environment variables

### Getting Help

- GitHub Actions docs: https://docs.github.com/actions
- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment

## Security Best Practices

1. ✅ Never commit secrets to the repository
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate tokens periodically (every 90 days)
4. ✅ Use environment-specific secrets when needed
5. ✅ Review deployment logs for sensitive data exposure
6. ✅ Enable branch protection rules
7. ✅ Require code reviews before merging

## Performance Optimization

### Caching Strategy

The workflows use pnpm caching to speed up builds:

- Dependencies are cached based on `pnpm-lock.yaml`
- Cache hit reduces installation time from ~2min to ~30s

### Parallel Jobs

CI workflow runs jobs in parallel:

- Quality checks, tests, and build run simultaneously
- Total CI time: ~3-5 minutes

### Build Optimization

- Vercel builds are cached automatically
- Only changed files trigger rebuilds
- Preview deployments reuse production builds when possible

---

**Setup Complete!** 🎉

Your CI/CD pipeline is now configured. Every push and PR will trigger automated checks, and deployments will happen automatically.
