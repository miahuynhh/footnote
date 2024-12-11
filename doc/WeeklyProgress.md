# Progress

---

## Week 1

Group hasn't been formed

---

## Week 2

## Assignment: Project pitch

Initial meeting with team:

- get to know each other and the project's main goals
- discussed personal dev strengths

#### Kirupa Gunaseelan

- Wrote user-cases. Discussed with the team to make sure we didn't have overlapping use cases
- Discussed with Mia to get a better understanding of the product
- Did research on frontend tools (HTML/CSS/React) as well as Figma
- Started working on screens on Figma for Sign in, Login, and the Project page (video + annotations)

#### Mia Huynh

- Discussed the project in further details with team so we all get a better understanding of the project
- Delegated tasks
- Wrote user cases and worked on team's living document
- Started researching services for backend

#### Catherine Jin

- Wrote user cases and discussed with team for feedback
- Refreshed frontend and backend knowledge from previous courses

#### Elainie Kassa

- Wrote user-cases. Discussed with team for feedback.
- Researched Figma app for initial frontend design.

#### Lauren Yarrington

- Wrote and discussed user-cases
- Did research on video components and displays using video.js
- Discussed database implementation with Mia about project and annotation fields
- Drew out our UI for home page and the main project page

#### Alicia Z.

- Wrote 3 user-cases. Shared my work with team and asked for their feedback. Give my thoughts for others' work.
- Researched cloud service and frameworks.
- Decided on digitalOcean together with Mia and set that up.
- Generated sprint boot for backend.
- Start to learn spring.

---

## Week 3

## Assignment: Proposal and requirements

#### Kirupa Gunaseelan

- Finished up Figma screens and showed my work to the team.
- Created HTML/CSS for the Sign in and Login Screens
- Showed team during weekly meeting and gathered feedback on the screens (getting rid of forgot password)

#### Mia Huynh

- Created the public GitHub repository, later changed to private, added members and TA
- Purchased the footnote.us domain for team on GoDaddy
- Delegated tasks for proposal and requirements assignment
- Talked through the UI with teammates
- Researched cloud services and designed SQL schema

#### Catherine Jin

- Wrote some basic tests for creating a user and logging in (note: eventually rewritten by Lauren)
- Began considering testing frameworks to use

#### Elainie Kassa

- Took a break from research/implementation due to personal reasons
- Communicated clearly with team and re-assigned roles temporarily

#### Lauren Yarrington

- Updated Schedule and divided schedule by person
- Further clarified project page UI and button orders

#### Alicia Z.

- Team decided to switch to javascript for backend. So, I deleted all spring stuff and generated express js.
- Implemented video uploading logic in the backend and tested successfully with postman.
- Wrote software architecture for software architecture. Shared with team and asked for their feedback.

---

## Week 4

## Assignment: Revisions and Architecture

#### Kirupa Gunaseelan

- Worked on learning typescript and shifted existing code to typescript (vite React)
- Split signin/login into two components in order to keep track of data more efficiently.
- Made interfaces to keep track of username, password, and confirm password for Sign in page and Login page.
- Worked on the documentation for Frontend components and their functionality
- Updated my personal schedule and wrote a risk assessment for the doc

#### Mia Huynh

- Set up database configurations for DigitalOcean Cluster
- Connected the database in database.js
- Implemented createTables(), clearTables(), userCreate(), userLogin() in users.js
- Set up and initialized all USERS, PROJECTS, and ANNOTATIONS tables in app.js

#### Catherine Jin

- Rewrote and expanded upon unit tests for creating an account and logging in
- Researched Javascript-specific testing frameworks
- Set up testing branch
- Installed successfully ran a dummy test with Jest

#### Elainie Kassa

- Stayed up to date with current implementation

#### Lauren Yarrington

- Created annotation branch to work on annotation implementation
- Implemented createAnnotation(), editAnnotation(), saveAnnotation(), and deleteAnnotation()
- Wrote a Risk assessment for the doc
- Wrote Coding Guidelines, determining which company’s guidelines to follow that best suite our needs
- Wrote our test plans for Usability testing

#### Alicia Z.

- Wrote two risk cases for the assignment and also personal schedule.
- Revised software architecture and software design based on my own understanding, shared with team and asked for their feedback.
- Moved to front-end, started to learn react.
- Generated vite for front-end framework and moved Kirupa's code there.
- Cleaned up git main branch. Because at that time most of the team members are pushing to main, leading to 70+ commits on main branch, and lots of unnecessary files, such as the leftover stuff from spring and node_modules.
- Started to implement user homepage. Halfway done: logic set up but lack styling.

---

## Week 5

## Assignment: Design

#### Kirupa Gunaseelan

- Was able to change and update the state of variables (username, password, confirm password) in the input fields.
- Created handleSubmit function that sends this data via a POST request.
- Was able to console.log(data) but had to conduct more research in order to figure out how to link this to the
  backend for the sign up page.
- Revised documentation based on comments for frontend

#### Mia Huynh

- Delegated tasks for Design assignment and weekly timeline/deadline for team
- Implemented getProjects(), createProject(), addUrl(), deleteProject() in projects.js
- Improved database schema
- Troubleshot database configurations and connectivity
- Improved code quality for my previously written code

#### Catherine Jin

- Switched to using Mocha for testing due to performance issues with Jest
- Researched Mocha and Mocha assertion libraries
- Installed Mocha and reconfigured testing suite to use it and the default node assertion library
- Set up GitHub Actions for CI with Mia

#### Elainie Kassa

- Stayed up to date with current implementation

#### Lauren Yarrington

- Wrote the unit tests for the user creation and logging in
- Learned how to use mocha for our testing purposes
- Implemented createUser() tests and loginUser() tests
- Used the clearTable function for our tests but needs to be removed for final testing to not destroy user data
- Updated the variable for username, password, and confirm password for our tests

#### Alicia Z.

- Completed Homepage implementation
- Added CreateNewPage (draft) as a placeholder
- Revised Software design for frontend

---

## Week 6

## Assignment: Testing

#### Kirupa Gunaseelan

- Was able to finish up the code for Sign in
- Worked with Mia to try to figure out how to link the frontend and backend, but ran into issues with
  my computer architecture.
- Mia was able to get the code to work on her computer, so I created a handleSubmit function for Login
  (similar to how I implemented this for the Sign in component) in order to pass that information to that
  backend as well.
- Looked into frontend testing and added some information to the living document

#### Mia Huynh

- Delegated tasks for Testing assignment and weekly timeline/deadline for team
- Revised backend software design section
- Set up GitHub Actions for CI with Catherine
- Improved database schema
- CD:
  - Integrated front end and back end in app.js, users.js, SignUp.tsx, and Login.tsx
  - Added package.json to root directory to deploy through DigitalOcean, reorganized .gitignore
  - Configured so that backend and frontend can run concurrently in one command from the root directory
  - Troubleshooting footnote-frontend: installed dependencies, fixed TS errors

#### Catherine Jin

- Ran a new set of dummy tests with Mocha
- Created .env file on local machine and configured testing suite to run database tests
- Began researching Supertest for http request testing
- Wrote the testing-related sections in the Developer Guidelines

#### Elainie Kassa

- Designed linting based on Airbnb style guide
- Integrated command line to lint check all files

#### Lauren Yarrington

- Wrote the How to use the software portion of the User Documentation markdown file
- Switched to frontend side to work with Kirupa on editing the video component on the project page
- Worked on learning React to better understand how to implement the video component
- Sent a pull request to main for unit testing

#### Alicia Z.

- Improved userHome page, by adding mocking projects while backend is offline.
- Wrote my assignment part of the documentation.
- Restructured the frontend with team.

---

## Week 7

## Assignment: Documentation

#### Kirupa Gunaseelan

- Worked on navigation: making sure that the Sign in page and Login pages navigated to the home page successfully.
- Started working on the page layout
  - Worked on making the title and input format so that users could edit it
- Worked with Lauren to conduct research on video players and find the one that was most compatible with our existing code
- Researched react-player and replaced the video placeholder with an actual video
  - turned on controls so that the video player had play, pause, speed adjustment, volume adjustment, and scrubber capabilities
- Kept track of the timestamp (# of seconds played) when a user paused the video as well as the title.
- Created the video upload functionality so users could directly upload mp4 files to our website.
- Added bug documentation to the living document

#### Mia Huynh

- Delegated tasks: for Documentations, Beta release, Demo presentation and weekly timeline/deadline for team
- Merged homepage frontend: debugged front and back end and resolved conflicts
- Revised tables: Refactored tables creation code into services/tables.js, changed naming conventions
- Documentation assignment: set up version update automation, contributed to user manual (description, install the software, run the software) and developer guidelines (build the software, build a release)
- Living document: revised CI set up on GitHub Actions and incorporate TA feedback
- Restructured backend directory
- Helped teammates with database connection and configuration, as well as debugging video upload tests
- Integrated homepage front and back end: with Kirupa and Alicia
- Implemented full-stack session handling for login, signup, homepage
- Set up GitHub Secrets for sensitive info like .env and certificates, set up GitHub Actions to reflect that, reconfigured DigitalOcean database so GitHub Actions can connect

#### Catherine Jin

- Installed Supertest
- Completed project tests - tests run successfully
- Configured testing suite on local machine to upload files to Digital Ocean spaces
- Successfully ran a http post request test using Supertest
- Completed video upload tests - tests run successfully
- Set up new test-suite branch without the .env file

#### Elainie Kassa

- Revising testing commands for frontend/backend testing.

#### Lauren Yarrington

- Editing a project page front end with Kirupa to implement the video player component
- Testing video file types that are compatible with our code
- Integrate back and front end with Kirupa and Mia
- Ensured we had a full test suite for each - login, signup, homepage, video upload with Cat
- Added issue to github issues page
- Working to add a video upload post feature for the Annotation page

#### Alicia Z.

- Editing top level README.md
- Modularized userHome
  - Making card a reusable component
  - Implementing a customized hook to fetch project data from backend
  - Making mock data for display when backend returns error || no data
  - Changed styling of all the above
- Started implementation of Annotation component
  - Drafted Annotation component that has a few other supporting files.
  - Created toy page for a demo of the annotation component
- Draft architecture diagram for presentation
- Add my stuff in the bug report and for github issue.
- Integrated Annotation component with backend.
- Adding mocking data to display annotation component even if the backend is not present.

---

## Week 8

## Assignment: Beta Release and Demo Presentation

#### Kirupa Gunaseelan

- Updated the project page header (title), added video player using react-player, incorporated all controls (play, pause, scrubber, etc), added video upload functionality
- Added function to pass project name and pid to backend #44
- Used useParam to keep track of the pid (project id)
- Created a handleTitleChange that updated the title after the user stopped typing for 1 second
- Created an async function to pass the project title and project id to the backend
- Fixed Sign Up button so it was consistent with the Log In button and fixed alignment of the forgot password text
- Worked on styling the sign up/login containers, the video player component, and the title of the project page (fonts, colors, sizing, box shadows).

#### Mia Huynh

- Facilitated communications for the beta release push between the different subteams, organized additional team meeting
- Implemented annotations backend, including:
  - adding ANNOTATIONS table
  - retrieve all annotations endpoint
  - add an annotation endpoint
  - edit an annotation endpoint
  - delete an annotation endpoint
- Revised frontend routes
- Revised backend and a bit of frontend so that:
  - the homepage actually shows a user's existing project
  - clicking on each project from home page routes to the corresponding project page
  - clicking on "create new project" button fetches a new project id from backend then routes to the corresponding project page
- Fixed backend so that an uploaded video's URL is updated in the database for the given project id
- Worked on frontend and backend so that when a user clicks on an existing project, it correctly loads the saved Project Name and Uploaded video
- Added a function to frontend to seek when a user manually move the scrubber and track that timestamp
- Added a function that convert timestamp (number) to mm:ss string format
- Revised GitHub Secrets and GitHub Actions for DigitalOcean Spaces connection
- Improved documentation formatting and content based on TA's feedback (README, UserManual, DeveloperGuidelines)
- Worked on demo slides and script

#### Catherine Jin

- Rewrote video and project tests to account for changes in the code and implementation
- Updated testing sections in the Developer Guidelines based on TA feedback
- Added some minor test bug documentation
- Worked on demo script

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Draft architecture diagram for presentation
- Restructured documents and added a template for bug reports.
- Integrated annotation component with backend.

- Debugged for beta release to make sure everything was running properly for beta, including but not limited to the following files:

  - frontend hooks for both annotations and projects
  - frontend userHome and Project page
  - frontend annotation component, project card component
  - backend api for video, project, annotation

---

## Week 9

## Assignment: Peer review

#### Kirupa Gunaseelan

- Worked with the Husky Swap team to obtain proper credentials and complete set up
- Peer reviewed and assigned issues/bugs to the HuskySwap team commenting on feedback
- Looked through the annotation components and useAnnotation hooks in order to understand
  how the code worked so I could start working on population timestamps in annotations
- Developed a plan for integrating the timestamp in the annotation and briefed Mia
  about it. I asked Mia to add an additional field to the SQL Table (timestampStr
  and timestampNum).

#### Mia Huynh

- Delegated tasks for peer review assignment
- Helped peer review team get set up to test our app
- Peer reviewed Husky Swap with team
- Incorporated beta's code with more styling with teammates
- Revised DeveloperGuidelines.md
- Added more thorough session handling to backend projects routes
- Created separate tables for development and production (USERS_dev, USERS_prod, etc.):
  - Modified .env to respond to development/production environment
  - Updated ci.yml and GitHub Secrets to always run CI and tests in development mode
  - Modified SQL queries to respond to development/production environment
    - Factored SQL queries from tables.js, users.js, projects.js, videos.js, annotations.js into sqlConstants.js
- Fixed bug: Enter key from login/signup page now works, in addition to Submit button

#### Catherine Jin

- Changed tests to expect error codes that more accurately reflect the error that occurs
- Implemented the throwing of the correct error codes that accurately reflect the error that occurs
- Implemented the display of the correct error messages for sign in and login (ex: displays "Incorrect Password" below the input fields when user attempt to log in with incorrect password)
- Removed the alert() methods used previously
- Implemented an alert for when the user attempts to change the project title to something longer than 100 characters
- Addressed issue #89

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Reviewing code from HuskySwap
- Implemented reusable Button for logout
- Implemented back to project list button
- Implemented protected routing
- Implemented reusable password input and added visibility option. Addressed issue #65.

## Week 10

## Assignment: Final demo

#### Kirupa Gunaseelan

- Actually implemented the timestamp into the annotation. When a user pauses or scrubs
  to a certain point in the video and makes an annotation, the timestamp at that moment will
  be saved with the annotation text and shown on the page.
  - Added an additional timestamp prop to Annotation, passed this prop to Annotation Item,
    and then AnnotationBaseItem (which has the html/css that shows the timestamp)
  - Utilized the timestampString function to convert the timestamp number to string format
    and pass that information via the "addAnnotation" function in the useAnnotation hook
    (this also passes the information to the database).

#### Mia Huynh

- Worked on thumbnail functionality
  - Configured DigitalOcean Spaces for thumbnails
  - Implemented capturing a thumbnail, uploading it to DO Spaces, displaying on webapp
- Updated GitHub Secrets
- Worked on video mirroring functionality
- Create a separate video upload button
  - Users can now click on the video to play/pause rather than being prompted to upload another video
- Designed new hologram style for the webpage and graphic elements on Canva and Photoshop
- Added the styling for:
  - Login, Signup pages: includes graphics/styling, Password manager, Error message rendering
  - UserHome page: includes graphics/styling, better thumbnail scaling, pixel window over thumbnails
  - Logout button: includes graphics/styling
  - Cursor: still a bit buggy - will improve!

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Updated userHome layout, addressed issue #70.
- Adding documentation to
  - ProtectedRoute.tsx
  - UserHome.tsx
  - Annotation.tsx
  - AnnotationList.tsx
  - NewAnnotationItem.tsx
  - AnnotationBaseItem.tsx

---

## Week 11

## Assignment: Final demo

#### Kirupa Gunaseelan

- Fixed timestamp so it rounded down, and updated documentation for annotation components
- Now looked into the backend code (Apis for the annotations) to implement the
  timestamp clicking functionality.
- Implement the timestamp click (when a user clicks on timestamp it takes them to
  the appropriate spot in the video)
  - Updated the AnnotationData component to store the timestampNum as well
  - Created a callback function for onTimestampClick() in AnnotationBaseItem
    - Created a handleTimestamp() function in ProjectPage that seeks to the given timestamp
      in the video player.
  - Updated annotation API and useAnnotation hooks to properly handle the timestamp number
    and string data.
  - Ensured backward compatibility with existing code (and updated all variables
    to account for the timestamp variable change -- splitting timestamp into a number
    version and string version)
  - Edited SQL queries so that GET/INSERT Annotations extracted both the timestampStr and
    timestampNum.

#### Mia Huynh

- Added more styling for ProjectPage
  - Overall background, components layout and spacing, shadow on hovers
  - Scrollable annotation component - the component no longer overflows when many annotations are created
  - Designed and added new y2k styling: edit icon, delete icon, annotation pixel window, Home button, Delete button
  - Styled AnnotationItem, NewAnnotationItem, AnnotationList, Video placeholder
  - Removed the unneeded check button for saving an annotation (just press Enter instead)
  - Designed a welcome message that pops up when no video is uploaded prompting user to import a video, a user can press a close button to close the window
- Made sure password icons on login/signup page have transparent background
- Updated documentation:
  - doc files
    - DeveloperGuidelines.md, especially build steps
    - UserManual.md, especially updated app using instructions
  - backend files:
    - database.js
    - tables.js
    - sqlConstants.js
    - annotations.js
    - index.js
    - projects.js
    - thumbnails.js
    - videos.js
    - users.js
    - s3Service.js
- Delegated sections and tasks for member for the final presentation
- Cleaned up DigitalOcean Spaces: removed unnecessary testing/development videos/thumbnails
- Defined backend route and implemented handling for favorite/unfavorite an annotation in annotations.js. Adjusted the ANNOTATIONS table schema and annotations database queries accordingly in sqlConstants.js.

#### Alicia Z.

- Deploy to domain
- Added documentation for the following files
  - LogoutButton.tsx
  - PasswordInput.tsx
  - ProjectCard.tsx
  - AuthContext.tsx
  - useAnnotations.ts
  - useProject.ts
  - types.ts
