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

## How to Reset/Delete and Re-upload

If you have already uploaded files and want to replace them with this new version, here are the two best ways:

### Method 1: The "Clean Slate" (Easiest for Web Users)
If you find it confusing to delete individual files:
1. Go to your repository on GitHub.
2. Click **Settings** (top tab).
3. Scroll all the way to the bottom to the **"Danger Zone"**.
4. Click **Delete this repository**.
5. Type the name of the repo to confirm and delete it.
6. Create a **New repository** with the same name and follow the "Uploading via Browser" steps above.

### Method 2: Overwriting (GitHub Desktop)
If you are using **GitHub Desktop**:
1. Simply copy the new files into your local project folder.
2. GitHub Desktop will automatically detect the changes (additions, deletions, and modifications).
3. Type a message like "Updated privacy policies", click **Commit**, and then **Push/Origin**. This will automatically remove any files you deleted locally and update everything else.

### Method 3: Deleting Files Manually (Web Interface)
1. Go to the file you want to delete.
2. Click the **...** (three dots) in the top right.
3. Select **Delete file**.
4. Commit the change.
*Note: This is slow if you have many files.*

---
Developed by IPREU - Independent & Practical Everyday Utility.
