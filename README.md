# IPREU Project Deployment Guide

This guide explains how to upload your files to GitHub and set up your website using GitHub Pages.

## Project Structure
Your project is organized as follows:
- `index.html`: The main landing page.
- `style.css`: Styles for the main landing page.
- `privacy/`: Contains all privacy policy pages.
    - `index.html`: The Privacy Hub.
    - `style.css`: Styles specifically for privacy pages.
    - `[app-name].html`: Individual privacy policies for each app.

## How to Upload to GitHub

### Option 1: GitHub Desktop (Recommended for beginners)
1. **Download & Install**: [GitHub Desktop](https://desktop.github.com/).
2. **Create Repository**: Open the app, go to `File` > `New Repository`.
3. **Local Path**: Choose the folder `c:\Users\Naveen\Desktop\IPREU`.
4. **Publish**: Click `Publish Repository` to upload it to your GitHub account.

### Option 2: Uploading via Browser
1. Go to [github.com](https://github.com/) and log in.
2. Click the **+** icon in the top right and select **New repository**.
3. Give it a name (e.g., `ipreu-website`) and click **Create repository**.
4. On the next screen, click the link that says **"uploading an existing file"**.
5. **Drag and drop everything** from your `IPREU` folder (including the `privacy` folder) into the browser window.
6. Scroll down, type a commit message (e.g., "Initial upload"), and click **Commit changes**.

## How to Enable the Website (GitHub Pages)
Once your files are uploaded:
1. Go to the **Settings** tab of your repository on GitHub.
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** > **Source**, select `Deploy from a branch`.
4. Under **Branch**, select `main` (or `master`) and Click **Save**.
5. Wait a few minutes. You will see a banner with your URL (e.g., `https://yourusername.github.io/ipreu-website/`).

---
Developed by IPREU - Independent & Practical Everyday Utility.
