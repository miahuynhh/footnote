# Developer Guidelines

## How to obtain the source code

The source code of footnote can be found in its public [GitHub repository](https://github.com/miahuynhh/footnote).

## The layout of Footnote's directory structure

### Frontend

```
footnote-frontend
├── public # Reusable actions, e.g., navigating, opening, creating entities
├── src
│ ├── api # Medias used in UI
│ ├── pages # Website pages
│ ├── components # Reusable React components across scenes
│ ├── hooks # Reusable hooks
│ ├── types # data types
│ ├── context # authorization context
│ └── routes # Route definitions
└── congif # backend endpoint configuration
```

### Backend

```
footnote-backend
├── routes # All API routes
│ ├── api # API endpoints
│ └── auth # Authentication routes
├── config # Database configuration
├── services # Services (e.g., S3)
└── test # Test helpers
```

## How to build the software

1. Make sure Git, Node.js (and npm), and ffmpeg are installed on your OS, following these guides:

   - [Git guide](https://github.com/git-guides/install-git)
   - [Node guide](https://nodejs.org/en)
   - [FFmpeg guide](https://www.ffmpeg.org/download.html) (Homebrew installation recommended for Mac users)

2. In the directory of your choice, clone the remote repository by running this command on the command line:
   ```
   git clone git@github.com:miahuynhh/footnote.git
   ```
3. You should now see a local `footnote` directory. From that root `footnote` directory, run the following commands:
   ```
   npm run install-all  # to install all dependencies in the footnote, footnote-backend, and footnote-frontend folders
   npm run build        # to build the frontend; commonly used for deployment, can skip during development
   ```
4. For the backend to properly build, you will need to:
   1. Navigate to the `footnote-backend/app.js` file and uncomment these lines:
      ```
      app.use(
      cors({
         origin: "http://localhost:5173", // url of frontend
         credentials: true, // allow credentials (cookies) to be sent
      })
      );
      ```
   2. Navigate to the `footnote-backend` directory and create a `.env` file
   3. Navigate to the `footnote-backend/config` directory and create a `ca-certificate.crt` file
   4. Email <miahuynh@cs.washington.edu> for the content of these secure files. Once you have the content, make sure to save.
   5. Navigate back to the root `footnote` directory, and run:
      ```
      npm start  # to start the server (on port 3000) and the app (on port 5173) concurrently
      ```
5. If the build was successful, you should see a build log that looks something like this:

   ```
   > footnote@1.0.0 start
   > concurrently "npm start --prefix footnote-backend" "npm run dev --prefix footnote-frontend"

   [1]
   [1] > footnote-frontend@0.0.0 dev
   [1] > vite
   [1]
   [0]
   [0] > login@0.0.0 start
   [0] > node ./bin/www
   [0]
   [1]
   [1]   VITE v5.4.10  ready in 219 ms
   [1]
   [1]   ➜  Local:   http://localhost:5173/
   [1]   ➜  Network: use --host to expose
   [0] Setting port to 3000
   [0] Connected to the database as 1320368
   [0] USERS_dev table created
   [0] PROJECTS_dev table created
   [0] ANNOTATIONS_dev table created
   ```

6. Navigate to <http://localhost:5173/> on your browser with a working internet connection and interact with the Footnote app.
7. For any errors encountered during these steps, refer to the Troubleshooting section below.

## How to test the software

1. Follow the build steps as listed in the [How to build the software](../DeveloperGuidelines.md#how-to-build-the-software) section
2. To run the full test suite:
   ```
   npm run test  # from the root directory
   ```
3. To run the backend test suite:
   ```
   npm test      # from the footnote-backend directory
   ```
4. To run the frontend test suite (in progress):
   ```
   npm test      # from the footnote-frontend directory
   ```

## How to add new tests

1. Navigate to the `test` directory - either in footnote-backend or footnote-frontend - and write tests using [Mocha](https://mochajs.org/) and the default node [assert](https://nodejs.org/api/assert.html) library, either by adding to an existing file with the `.mjs` extension, or by creating a new one. For a new file, import the assertion library:

   ```
   import * as assert from 'assert';
   ```

2. If your tests involve testing and making `http` requests, import and use:

   - The [Supertest](https://www.npmjs.com/package/supertest) library if you're testing `http` requests that don't rely on login sessions
     ```
     import request from 'supertest';
     ```
   - The [Supertest-session](https://www.npmjs.com/package/supertest-session) library if you're testing `http` requests that rely on login sessions
     ```
     import session from 'supertest-session';
     ```

3. Also import `app.js`.

   ```
   import app from '../app.js'
   ```

4. If the new test you add involves testing a file upload (ex: Testing the code for uploading videos) and you need to upload fake files, navigate to the directory within the `test` directory titled `test-<insert-file-type-here>` and add the file within the new directory (ex: the `test-videos` directory). If no suitable directory exists, create one within the `test` directory.

## How to build a release of the software

1. Run an appropriate command from the following to update the version:

   ```
   npm run version:patch  # for a patch update
   npm run version:minor  # for a minor update
   npm run version:major  # for a major update
   ```

   These commands increments the version in `package.json`, commit the change, and tag the commit with the new version.

2. Perform sanity checks on the version update:

   1. Brief option: run the following commands from the root directory

   ```
   npm run build  # build the frontend to ensure it’s ready for deployment
   npm start      # start the server (on port 3000) and the app (on port 5173) concurrently
   npm run test   # run the test suite to confirm all tests pass
   ```

   2. Thorough option: follow steps 4-8 of [How to build the software](../DeveloperGuidelines.md#how-to-build-the-software) section and then step 2 of [How to test the software](#how-to-test-the-software) section

3. Ensure that the git tag generated by the versioning command matches the intended version.

4. After reviewing the version update, push it to the remote repository:
   ```
   git push         # push the version update
   git push --tags  # push the version update tag
   ```

## Troubleshooting

For database connection troubleshooting, refer to Digital Ocean Cluster documentation:

- [Access denied](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-access-denied-error/)
- [Unsupported auth mode](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-authentication-error/)
- [Connection timed out](https://docs.digitalocean.com/support/when-connecting-to-my-database-i-get-a-connection-timed-out-error/)
- [Unknown host](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-unknown-host-error/)
- [Lost connection during query](https://docs.digitalocean.com/support/when-issuing-a-query-on-mysql-i-get-a-lost-connection-error/)
- [Unknown database](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-unknown-database-error/)
- [Host blocked by too many connection errors](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-a-host-is-blocked-error/)

For any issues at all, or those requiring admin access, please email <miahuynh@cs.washington.edu>.
