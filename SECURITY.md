# Security Notice

## ⚠️ Important: Git History Cleanup Required

The sensitive configuration files (containing Firebase API keys and project IDs) were previously committed to git history. Before making this repository public, you **must** clean the git history to remove these secrets.

### Files that need to be removed from history:
- `src/environments/environment.ts`
- `.firebaserc`
- `dataconnect/dataconnect.yaml`

### Steps to Clean Git History:

1. **If you haven't pushed yet or the repo is still private:**
   ```bash
   # Remove sensitive files from all commits
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch src/environments/environment.ts .firebaserc dataconnect/dataconnect.yaml" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push to update remote (WARNING: This rewrites history)
   git push origin --force --all
   ```

2. **Alternative using git-filter-repo (recommended, but requires installation):**
   ```bash
   # Install git-filter-repo first: pip install git-filter-repo
   git filter-repo --path src/environments/environment.ts --invert-paths
   git filter-repo --path .firebaserc --invert-paths
   git filter-repo --path dataconnect/dataconnect.yaml --invert-paths
   
   git push origin --force --all
   ```

3. **After cleaning history, rotate your Firebase credentials:**
   - Go to Firebase Console → Project Settings
   - Generate new API keys
   - Update your local `environment.ts` with new credentials
   - Review and restrict API key usage in Google Cloud Console

### If Repository is Already Public:

If you've already made the repository public and pushed these commits, **assume your credentials are compromised**. You must:
1. Rotate ALL Firebase credentials immediately
2. Review access logs in Firebase Console
3. Clean the git history (as above) to prevent further exposure
4. Consider creating a new Firebase project if the exposure was significant

### Current Status:

✅ Sensitive files are now in `.gitignore`  
✅ Example files created for public reference  
✅ Files removed from git tracking  
✅ **Git history has been cleaned - secrets removed from all commits**

### Final Steps to Complete:

1. **Force push to GitHub** (rewrites remote history):
   ```bash
   git push origin --force --all
   ```

2. **Rotate your Firebase credentials** (since they were in git history):
   - Go to [Firebase Console](https://console.firebase.google.com) → Your Project → Project Settings
   - Under "Your apps" → Web app, you can restrict API keys or create new ones
   - Go to [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
   - Restrict your API keys to only allow requests from your domains
   - Consider generating new API keys if the repository was already public

3. **Make repository public** - You're now safe to make it public! 🎉

