# Portfolio

## Description

This is my personal portfolio website, showcasing my projects, skills, and experiences. It is built using Astro, a modern static site generator, and is designed to be fast, responsive, and visually appealing.

The site is generated as a static website and includes SEO metadata, a sitemap,
`robots.txt`, and a custom 404 page.

## Installation

To run this project locally, follow these steps:

> You need to have at least Node.js version 22.0.0 installed on your machine, as required by Astro. You can download it from the [official Node.js website](https://nodejs.org/).

1. Clone the repository:
   ```bash
   git clone
    ```

2. Navigate to the project directory:
    ```bash
    cd portfolio
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the development server and view the portfolio locally, run:

```bash
npm run dev
```

To generate the production build:

```bash
npm run build
```

The generated files are written to `dist/`.

## Continuous deployment

The workflow [`release.yml`](./.github/workflows/release.yml) builds and
deploys the site when a GitHub release is published. The release tag must use
semantic versioning, for example:

```text
1.0.0
v1.0.0
```

The workflow uses Node.js `22.12.0`, runs `npm ci`, builds the static site, and
copies the contents of `dist/` to the production server with `rsync`.

### Required GitHub secrets

Configure these secrets in **Settings > Secrets and variables > Actions**.
They may be stored at repository level or in the `production` environment:

| Secret | Description |
| --- | --- |
| `SERVER_HOST` | DNS name or IP address of the deployment server |
| `SERVER_USER` | SSH user used for deployment |
| `SERVER_SSH_KEY` | Dedicated private SSH key used by GitHub Actions |
| `SERVER_KNOWN_HOSTS` | Verified host key returned by `ssh-keyscan` |
| `SERVER_PATH` | Absolute path of the published website on the server |
| `SERVER_PORT` | SSH port; optional, `22` by default |

The server must accept SSH connections from `SERVER_USER`, allow this user to
write to `SERVER_PATH`, and have `rsync` installed. The public key matching
`SERVER_SSH_KEY` must be present in the user's `authorized_keys` file.

### Optional Google site verification

The Google verification file is not committed to the repository. If Google
provides an HTML verification file, configure these optional secrets:

| Secret | Description |
| --- | --- |
| `GOOGLE_VERIFICATION_FILENAME` | Exact file name provided by Google |
| `GOOGLE_VERIFICATION_CONTENT` | Exact content of the verification file |

For example:

```text
GOOGLE_VERIFICATION_FILENAME=google-site-verification=abc123.html
GOOGLE_VERIFICATION_CONTENT=google-site-verification: abc123...
```

During the build, the workflow temporarily creates this file in `public/`.
Astro copies it to the root of `dist/`, where it is deployed with the rest of
the site. If either secret is missing, the verification step is skipped and
the build continues normally.

The file name must be a simple file name at the root of `public/`; subdirectories
and hidden file names are rejected.

For the complete server and environment setup, see the
[CI/CD configuration guide](./.github/workflows/README.md).
