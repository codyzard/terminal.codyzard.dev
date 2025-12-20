# GitHub Actions Workflows

This directory contains the CI/CD workflows for the project.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Trigger:** Push to `main` or pull requests to `main`

**Jobs:**

- **quality** - Code quality checks (lint, format, typecheck)
- **test** - Run unit tests and generate coverage
- **build** - Build the Next.js application

**Purpose:** Ensures code quality and functionality before merging

### 2. Deploy Preview (`deploy-preview.yml`)

**Trigger:** Pull requests to `main`

**Jobs:**

- **deploy-preview** - Deploy to Vercel preview environment

**Features:**

- Automatic preview deployment for every PR
- Comments preview URL on the PR
- Environment: `Preview`

### 3. Deploy Production (`deploy-production.yml`)

**Trigger:** Push to `main` branch

**Jobs:**

- **deploy-production** - Deploy to Vercel production

**Features:**

- Automatic production deployment on merge
- Environment: `Production`
- Creates deployment summary

## Workflow Sequence

### Pull Request Flow

```
1. Create PR → Trigger CI + Preview Deploy
2. CI runs → Lint → Test → Build
3. Preview Deploy → Comment URL on PR
4. Review → Approve → Merge
5. Production Deploy → Auto-deploy to prod
```

### Status Checks

Before merging, these checks must pass:

- ✅ Code Quality (lint, format, typecheck)
- ✅ Tests (all tests passing)
- ✅ Build (successful build)

## Environment Variables

### Repository Secrets

Required secrets in GitHub repository settings:

- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization/team ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `CODECOV_TOKEN` - (Optional) Codecov upload token

### Workflow Environment Variables

Automatically set by GitHub:

- `GITHUB_TOKEN` - GitHub Actions token
- `GITHUB_SHA` - Commit SHA
- `GITHUB_REF` - Branch reference

## Caching Strategy

All workflows use pnpm caching to speed up builds:

```yaml
- uses: actions/cache@v4
  with:
    path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
```

**Benefits:**

- Reduces install time from ~2min to ~30s
- Consistent dependencies across runs
- Cost savings on CI minutes

## Monitoring

### View Workflow Runs

1. Go to **Actions** tab in GitHub
2. Select a workflow from the left sidebar
3. Click on any run to see details

### Check Status

- **Green checkmark** ✅ - All jobs passed
- **Red X** ❌ - One or more jobs failed
- **Yellow circle** 🟡 - Jobs running

### Logs

Click on any job to view:

- Step-by-step execution logs
- Error messages and stack traces
- Timing information

## Troubleshooting

### CI Failing

1. **Linting errors** - Run `pnpm lint:fix` locally
2. **Formatting errors** - Run `pnpm format` locally
3. **Type errors** - Run `pnpm typecheck` locally
4. **Test failures** - Run `pnpm test` locally
5. **Build errors** - Run `pnpm build` locally

### Deployment Failing

1. Check Vercel token is valid
2. Verify project ID and org ID are correct
3. Check Vercel build logs
4. Ensure all environment variables are set

### Cache Issues

If dependencies are causing issues:

1. Go to Actions → Caches
2. Delete old caches
3. Re-run workflow

## Manual Workflow Dispatch

Some workflows can be run manually:

1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow**
4. Select branch and click **Run**

## Best Practices

### 1. Keep Workflows Fast

- Use caching
- Run jobs in parallel when possible
- Only run necessary steps

### 2. Fail Fast

- Run quick checks first (lint, format)
- Stop on first failure
- Provide clear error messages

### 3. Security

- Never log secrets
- Use `secrets.GITHUB_TOKEN` for GitHub API
- Rotate tokens regularly

### 4. Maintenance

- Update actions versions regularly
- Keep workflows DRY (Don't Repeat Yourself)
- Document changes

## Advanced Configuration

### Matrix Builds

To test multiple Node versions:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
```

### Conditional Steps

Run steps only on certain conditions:

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: pnpm deploy
```

### Scheduled Runs

Run workflows on a schedule:

```yaml
on:
  schedule:
    - cron: '0 0 * * 0' # Every Sunday at midnight
```

## Resources

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [pnpm in CI](https://pnpm.io/continuous-integration)
- [Setup Guide](./../SETUP_CICD.md)

---

**Need help?** Check the [setup guide](./SETUP_CICD.md) or open an issue.
