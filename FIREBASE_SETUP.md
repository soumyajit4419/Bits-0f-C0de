# Firebase Setup Guide (Fixing `auth/invalid-api-key` & Admin SDK)

This project uses Firebase for Google login, comments, and post likes. The Firebase keys are **not included in the repository**, so after you clone it and run it, you will see this error in the browser:

```
Server Error
FirebaseError: Firebase: Error (auth/invalid-api-key).
Firebase\Firebase.js (18:21) @ eval
> 18 | const auth = getAuth(app);
```

This is expected. The fix is to create your own free Firebase project and put its keys in a file called `.env.local`. This guide walks through every step.

---

## Why this error happens

`Firebase/Firebase.js` reads its client-side configuration from environment variables:

| Variable the code reads | Firebase config field |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `apiKey` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `projectId` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `NEXT_PUBLIC_FIREBASE_SENDER_ID` | `messagingSenderId` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `appId` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `measurementId` (optional) |

If these variables do not exist, every value is `undefined`, and Firebase throws `auth/invalid-api-key` when `getAuth(app)` runs.

Additionally, the backend API routes for post likes (`/api/like-blog`, `/api/likes/[pid]`) and fetching comments (`/api/comments/[pid]`) use `Firebase/Firebase-admin.js`, which reads server-side service account credentials:

| Variable the code reads | Service Account field |
|---|---|
| `FIREBASE_CLIENT_EMAIL` | `client_email` |
| `FIREBASE_PRIVATE_KEY` | `private_key` |
| `FIREBASE_PROJECT_ID` | `project_id` |
| `FIREBASE_DATABASE_URL` | `https://<project-id>.firebaseio.com` |

---

## Prerequisites

- [Node.js](https://nodejs.org) installed (this is a Next.js project)
- [Git](https://git-scm.com) installed
- A Google account (to sign in to Firebase)

---

## Step 1: Clone and install the project

```bash
git clone <your-repo-url>
cd Bits-0f-C0de
npm install
```

Do not run `npm run dev` yet. It will show the error above until Steps 2 to 6 are done.

---

## Step 2: Create a Firebase project

1. Open <https://console.firebase.google.com> and sign in with your Google account.
2. Click **Create a project** (or **Add project**).
3. Enter any project name, for example `tryOpenSrc`, and continue.
4. Google Analytics is optional. You can turn it off. If you turn it off, you will not get a measurement ID, which is fine (see Step 5).
5. Click **Create project** and wait until it finishes, then click **Continue**.

You will land on the **Project Overview** page. The free **Spark plan** is enough.

---

## Step 3: Register a web app inside the project

This is the step that is easy to miss.

1. On the **Project Overview** page, click **+ Add app**. It is the button under the project name near the top left (or click the **`</>` Web** icon).
2. Choose the **web** platform. It is the icon that looks like `</>`.
3. Enter an app nickname, for example `bits-of-code`.
4. Leave **Also set up Firebase Hosting** unchecked.
5. Click **Register app**.
6. The next screen is titled **Add Firebase SDK**. Keep **Use npm** selected.
   - Ignore the `npm install firebase` command. The project already installed Firebase in Step 1.
   - Find the `firebaseConfig` object in the code block. It looks like this:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

Keep this page open. You need these values in Step 5.

**Lost the page?** Open the Firebase console, click the gear icon next to **Project Overview**, choose **Project settings**, stay on the **General** tab, scroll to **Your apps**, and select your web app. The same config is shown under **SDK setup and configuration**.

---

## Step 4: Generate Firebase Admin SDK Service Account credentials

To make server-side API routes work (fetching comments and recording likes), generate a service account private key:

1. Open the **Firebase Console** and click the gear icon (⚙️) next to **Project Overview**, then select **Project settings**.
2. Click the **Service accounts** tab at the top.
3. Under **Admin SDK configuration snippet**, keep **Node.js** selected.
4. Click the blue **Generate new private key** button at the bottom.
5. A confirmation dialog will appear. Click **Generate key**.
6. A `.json` file will automatically download to your computer. Open this file in VS Code or any text editor. It contains:
   - `"project_id"`
   - `"private_key"`
   - `"client_email"`

> **Security Note:** Keep this downloaded `.json` file private. Never commit it to git or share it publicly.

---

## Step 5: Create the `.env.local` file

Create a new file named exactly `.env.local` in the **project root**, the same folder that contains `package.json`.

- In VS Code: right-click an empty area of the Explorer panel, choose **New File**, and type `.env.local`.

Paste this template into it:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_DATABASE_URL=
```

### 1. Fill Client Keys (from Step 3 `firebaseConfig`):

| Firebase Web App gives you | Put it after |
|---|---|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY=` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID=` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_SENDER_ID=` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID=` |
| `measurementId` (only if shown) | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=` |

### 2. Fill Admin Keys (from Step 4 Service Account `.json` file):

| Service Account JSON gives you | Put it after |
|---|---|
| `"client_email"` | `FIREBASE_CLIENT_EMAIL="`...`"` |
| `"private_key"` | `FIREBASE_PRIVATE_KEY="`...`"` |
| `"project_id"` | `FIREBASE_PROJECT_ID="`...`"` |
| URL: `https://<project_id>.firebaseio.com` | `FIREBASE_DATABASE_URL="https://your-project.firebaseio.com"` |

Rules for the file:

- Copy and paste the values instead of typing them. One wrong character breaks the key.
- Do **not** put spaces around `=`. Write `KEY=VALUE` or `KEY="VALUE"`.
- **Keep double quotes `"` around `FIREBASE_PRIVATE_KEY`**: The private key contains line breaks (`\n`). Wrapping it in quotes ensures Next.js reads the complete multi-line string.
- The client variable is named `..._SENDER_ID`, not `..._MESSAGING_SENDER_ID`. The name must match `Firebase/Firebase.js` exactly.
- Save the file (`Ctrl+S`). In VS Code, a white dot on the tab means it is unsaved.

**About the measurement ID:** it only exists if Google Analytics is enabled for the project. If your config has no `measurementId`, leave `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=` empty.

**About the database URL:** Firestore connects using `FIREBASE_PROJECT_ID`. Setting `FIREBASE_DATABASE_URL="https://<your-project-id>.firebaseio.com"` fulfills the admin initialization cleanly.

Example of a finished `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyExampleExampleExampleExample"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="my-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="my-project"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="my-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_SENDER_ID="123456789012"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789012:web:abcdef1234567890"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@my-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
FIREBASE_PROJECT_ID="my-project"
FIREBASE_DATABASE_URL="https://my-project.firebaseio.com"
```

---

## Step 6: Enable Google Authentication & Firestore Database

To make login and comments functional:

1. **Authentication:**
   - In the Firebase console, navigate to **Build** (or **Security**) $\rightarrow$ **Authentication**.
   - Click **Get started**.
   - Open the **Sign-in method** tab and click **Google**.
   - Toggle **Enable**, choose your project support email, and click **Save**.

2. **Firestore Database:**
   - In the Firebase console, navigate to **Build** (or **Databases & Storage**) $\rightarrow$ **Firestore Database**.
   - Click **Create database**.
   - Choose a database location.
   - For local development/testing, select **Start in test mode** and click **Create** / **Enable**. (Test mode allows read/write access for 30 days without complex security rules).

---

## Step 7: Run the project

Next.js only reads `.env.local` when the server starts, so if the server is already running, stop it with `Ctrl+C` first.

```bash
npm run dev
```

Open <http://localhost:3000>. The `auth/invalid-api-key` error should be gone and the site should load.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Still seeing `auth/invalid-api-key` | Restart the dev server (`Ctrl+C`, then `npm run dev`). Check that the file is saved and named exactly `.env.local`. |
| Error persists after restart | Make sure `.env.local` is in the project root next to `package.json`, not inside a subfolder. |
| Values seem ignored | Check the variable names against the table in this guide. Check there are no spaces around `=`. |
| Cannot find the config again | Firebase console, gear icon, **Project settings**, **General** tab, scroll to **Your apps**. |
| 500 error on opening blog posts | Verify that `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` are provided in `.env.local`. |
| Private key error | Ensure `FIREBASE_PRIVATE_KEY` is wrapped in double quotes `"` and contains the full key including `-----BEGIN...` and `-----END...`. |
| No `measurementId` anywhere | Leave `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=` empty. It is optional. |
| Login button does nothing | Enable Google sign-in under Authentication in Step 6. |
| Comments fail to post | Ensure Cloud Firestore Database has been created in Step 6. |

---

## Security notes

- **Never commit `.env.local`.** Open `.gitignore` and confirm it contains `.env.local` or `.env*.local`. If it does not, add it before you run `git add`.
- **Never commit downloaded service account `.json` files.**
- Do not paste your keys into issues, pull requests, or screenshots.

---

## For AI coding agents (Claude Code, Codex, Cursor, etc.)

If a person asks you to follow this guide, here is what you can and cannot do.

**You can do:**
1. Run `npm install` in the project root.
2. Create `.env.local` in the project root (the folder containing `package.json`) using the template in Step 5.
3. Check `.gitignore` and ensure `.env.local` is present.
4. Run `npm run dev` after the values are filled in.

**You cannot do, so ask the person to do it:**
- Creating the Firebase project (Step 2), registering the web app (Step 3), and downloading the Service Account private key (Step 4) require the person's own signed-in Google account in the Firebase console. Give them those steps, then ask them to paste the values into `.env.local`.

**Rules:**
- Never invent or guess Firebase values. Placeholder text may get past the first error, but login and comments will not work.
- Use the exact variable names from the table above.
- Do not commit `.env.local`.
- After editing `.env.local`, restart the dev server. A running server does not pick up env changes.
- Success means `http://localhost:3000` loads with no `auth/invalid-api-key` error and blog post pages load without 500 API errors.
