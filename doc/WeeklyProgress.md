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

#### Mia Huynh

- Set up database configurations for DigitalOcean Cluster
- Connected the database in database.js
- Implemented createTables(), clearTables(), userCreate(), userLogin() in users.js
- Set up and initialized all USERS, PROJECTS, and ANNOTATIONS tables in app.js

#### Catherine Jin

- Write unit tests for creating an account and logging in
- (won't run the unit tests until those functions are complete and a delete account function is implemented so we can remove any dummy accounts added during unit testing)
- Set up testing branch
- Started researching Javascript-specific testing frameworks

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

#### Mia Huynh

- Delegated tasks for Design assignment and weekly timeline/deadline for team
- Implemented getProjects(), createProject(), addUrl(), deleteProject() in projects.js
- Improved database schema
- Troubleshot database configurations and connectivity
- Improved code quality for my previously written code

#### Catherine Jin

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
- Fixed Sign Up button so it was consistent with the Log In button
- Fixed alignment of the forgot password text

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
- Revised GitHub Secrets and GitHub Actions for DigitalOcean Spaces connection
- Improved documentation formatting and content based on TA's feedback (README, UserManual, DeveloperGuidelines)
- Worked on presentation slides (intro, demo, reflection, q&a) and script
- Added video element enhancement and clearing tables bug to GitHub Issues

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Draft architecture diagram for presentation
- Restructured documents and added a template for bug reports.
- Integrated annotation component with backend.
- Fixed bug and wrote detailed comment for my code so other teammates can easily use.

---

## Week 9

## Assignment

#### Kirupa Gunaseelan

#### Mia Huynh

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

---

## Week 10

## Assignment

#### Kirupa Gunaseelan

#### Mia Huynh

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

---
