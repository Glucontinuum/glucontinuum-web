# Mirroring Releases from Private to Public

To keep your source code private but make your releases public on the website, follow these steps:

### 1. Create a Personal Access Token (PAT)
- Go to [GitHub Settings > Tokens](https://github.com/settings/tokens).
- Generate a new token (Classic) with the `repo` scope.
- Copy this token.

### 2. Add Secret to your PRIVATE Repository
- Go to your **Private Glucontinuum Repo** > Settings > Secrets and variables > Actions.
- Create a new repository secret named `PUBLIC_REPO_TOKEN`.
- Paste the PAT you created.

### 3. Create the Workflow File
In your **Private Repository**, create a file at `.github/workflows/mirror-to-web.yml` and paste this:

```yaml
name: Mirror Release to Public Web

on:
  release:
    types: [published]

jobs:
  mirror:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Private Repo
        uses: actions/checkout@v4

      - name: Mirror to Public Repo
        env:
          GH_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
          PUBLIC_REPO: Glucontinuum/glucontinuum-web
        run: |
          # 1. Download assets from the current private release
          gh release download ${{ github.event.release.tag_name }} --dir ./assets

          # 2. Create the release in the public repo
          gh release create ${{ github.event.release.tag_name }} \
            --repo $PUBLIC_REPO \
            --title "${{ github.event.release.name }}" \
            --notes "${{ github.event.release.body }}" \
            ./assets/*
```

### 4. How it works
Every time you publish a release in your private repo, this action will:
1.  Download the APKs/Exes from the private release.
2.  Create a matching release in the **public** `glucontinuum-web` repo.
3.  Upload the files there.
4.  The website will automatically detect the new release and update the "Latest Version" and "Download" button!
