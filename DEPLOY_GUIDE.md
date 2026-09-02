# Portfolio Deploy Karne Ka Guide

## Step 1: GitHub Account Banao (Agar nahi hai)

1. https://github.com pe jao
2. "Sign up" pe click karo
3. Apni details bharo aur account banao

## Step 2: GitHub pe Repository Banao

1. GitHub pe login karo
2. "+" icon pe click karo (top right)
3. "New repository" select karo
4. Repository name: `portfolio` rakho
5. "Public" select karo
6. "Create repository" pe click karo

## Step 3: Code Upload Karo

GitHub terminal mein ye commands run karo:

```bash
# Remote add karo (apna username dalo)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Branch rename karo
git branch -M main

# Code push karo
git push -u origin main
```

**Note:** `YOUR_USERNAME` ki jagah apna GitHub username dalo.

## Step 4: GitHub Pages Enable Karo

1. Repository kholo
2. "Settings" pe click karo
3. Left sidebar mein "Pages" pe jao
4. "Source" mein "main" branch select karo
5. "Save" pe click karo

## Step 5: Live Portfolio Dekho

1-2 minute wait karo
Apna portfolio live ho jayega:
`https://YOUR_USERNAME.github.io/portfolio/`

---

## Agar Koi Problem Aaye

1. **Git command nahi chal raha**: Git install karo https://git-scm.com se
2. **Push nahi ho raha**: Username/password galat hai, GitHub token banao
3. **Site nahi dikh rahi**: 5 minute wait karo, cache clear karo

## Portfolio Customize Karna

### Name Change Karna:
`index.html` mein `VIVEK` ki jagah apna naam dalo

### Color Change Karna:
`style.css` mein ye lines change karo:
```css
--primary: #6c63ff;  /* Primary color */
--secondary: #ff6584;  /* Secondary color */
```

### Social Links Update Karna:
`index.html` mein `#` ki jagah apne URLs dalo:
- GitHub: `https://github.com/YOUR_USERNAME`
- LinkedIn: `https://linkedin.com/in/YOUR_PROFILE`
- Twitter: `https://twitter.com/YOUR_HANDLE`

### Projects Add Karna:
`index.html` mein `<div class="projects-container">` ke andar naye project cards add karo

---

## Quick Deploy Option (Netlify)

Agar GitHub Pages se easy chahiye:

1. https://app.netlify.com pe jao
2. GitHub se login karo
3. "New site from Git" pe click karo
4. Apna portfolio repository select karo
5. "Deploy site" pe click karo

2 minute mein live ho jayega!
