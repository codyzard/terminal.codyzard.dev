# Running CI/CD Locally with Docker

You can test GitHub Actions workflows locally using [act](https://github.com/nektos/act), which runs workflows in Docker containers.

## Installation

### macOS (using Homebrew)

```bash
brew install act
```

### Linux

```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### Windows (using Chocolatey)

```bash
choco install act-cli
```

## Basic Usage

### Run all workflows

```bash
act
```

### Run specific workflow

```bash
# Run CI workflow
act -W .github/workflows/ci.yml

# Run specific job
act -j quality
act -j test
act -j build
```

### Run on specific events

```bash
# Simulate push event
act push

# Simulate pull request event
act pull_request
```

## Testing Your Workflows

### 1. Test CI workflow locally

```bash
# Run the entire CI pipeline
act -W .github/workflows/ci.yml

# Run only quality checks
act -j quality -W .github/workflows/ci.yml

# Run only tests
act -j test -W .github/workflows/ci.yml

# Run only build
act -j build -W .github/workflows/ci.yml
```

### 2. Test with secrets

Create `.secrets` file (add to .gitignore):

```bash
VERCEL_TOKEN=your_token_here
CODECOV_TOKEN=your_token_here
```

Run with secrets:

```bash
act --secret-file .secrets
```

### 3. Dry run (list jobs without executing)

```bash
act -l
```

## Common Options

```bash
# Use specific platform
act -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Verbose output
act -v

# Reuse containers (faster subsequent runs)
act --reuse

# Run specific event
act push -W .github/workflows/ci.yml

# Skip specific jobs
act --job quality --job test

# Use different Docker image sizes
act -P ubuntu-latest=catthehacker/ubuntu:act-latest     # Full (~20GB)
act -P ubuntu-latest=catthehacker/ubuntu:runner-latest  # Medium (~12GB)
act -P ubuntu-latest=node:20-bullseye                   # Minimal (smaller)
```

## Configuration File

Create `.actrc` in project root for default settings:

```bash
# Use smaller images
-P ubuntu-latest=catthehacker/ubuntu:runner-latest

# Reuse containers
--reuse

# Load secrets
--secret-file .secrets

# Use specific container architecture
--container-architecture linux/amd64
```

## Example Workflows

### Test quality checks locally

```bash
# Run linting, formatting, and typecheck
act -j quality -W .github/workflows/ci.yml
```

### Test full CI pipeline

```bash
# This will run quality → test → build in sequence
act push -W .github/workflows/ci.yml
```

### Test preview deployment workflow

```bash
# Simulate PR event
act pull_request -W .github/workflows/deploy-preview.yml \
  --secret-file .secrets
```

## Limitations

1. **Vercel CLI**: Deployment steps won't actually deploy, but you can test the build process
2. **GitHub Context**: Some GitHub-specific features may not work exactly the same
3. **Secrets**: Need to provide locally via `.secrets` file
4. **Artifacts**: Upload/download artifacts work differently
5. **Docker-in-Docker**: Some Docker operations may require special configuration

## Troubleshooting

### Issue: "Docker daemon not running"

**Solution**: Start Docker Desktop

### Issue: "Permission denied"

**Solution**:

```bash
sudo usermod -aG docker $USER
# Then logout and login again
```

### Issue: "Image pull failed"

**Solution**: Use smaller images

```bash
act -P ubuntu-latest=node:20-bullseye
```

### Issue: "Out of disk space"

**Solution**: Clean Docker

```bash
docker system prune -a
```

## Best Practices

1. **Use .actrc** for consistent settings across team
2. **Add .secrets to .gitignore** to prevent committing sensitive data
3. **Use --reuse** flag for faster iterations
4. **Test specific jobs** instead of full workflows during development
5. **Use smaller Docker images** for faster startup times

## Quick Commands Reference

```bash
# List all jobs
act -l

# Test quality checks
act -j quality

# Test with verbose output
act -v -j test

# Dry run to see what would execute
act -n

# Use specific event
act push

# Skip pulling latest images
act --pull=false

# Run with platform
act -P ubuntu-latest=node:20-bullseye
```

## Integration with Development Workflow

```bash
# Before pushing, test locally:
# 1. Run quality checks
act -j quality -W .github/workflows/ci.yml

# 2. Run tests
act -j test -W .github/workflows/ci.yml

# 3. Test build
act -j build -W .github/workflows/ci.yml

# 4. If all pass, push to GitHub
git push
```

## Resources

- [act Documentation](https://github.com/nektos/act)
- [act Docker Images](https://github.com/catthehacker/docker_images)
- [GitHub Actions Local Runner](https://docs.github.com/en/actions/hosting-your-own-runners)
