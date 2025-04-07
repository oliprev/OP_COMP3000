![SecuLearnLogo](https://github.com/oliprev/OP_COMP3000/blob/b7505b567cbf87bbd642994d27647f74ddd41618/frontend/public/seculearnlogo.svg)

# **SecuLearn - An AI-Driven Cybersecurity Learning Platform**

---

## **Creator**

- **Name**: Oliver Prevett
- **Course**: BSc Computer Science (Hons)
- **Email**: oliver.prevett@students.plymouth.ac.uk

## **Supervisor**

- **Name**: Professor Nathan Clarke
- **Specialisation**: Cyber Security and Digital Forensics
- **Email**: N.Clarke@plymouth.ac.uk

## **Project vision**

The aim of this project is to develop a multi-platform solution targeted at everyday users of technology who wish to improve their cybersecurity knowledge - specifically students. SecuLearn also aims to prove that artificial intelligence can foster unique learning experiences when implemented correctly.

SecuLearn is designed to address the exponential increase in risk that comes from being online, which can lead to significant social, economic, and even political repercussions for individuals and organisations alike. Users will also be able to develop a profound understanding of complex concepts that have historically been difficult to convey efficiently.

The proposed solution will be a full-stack (MERN) web-based application. It will integrate with Google Gemini to provide practical, AI-driven content tailored to the users’ needs. There may also be scope for monetisation in the future through advertisements and subscriptions, as well as an offline version.

It will follow an Agile approach, with sprints lasting two weeks each - culminating with a Scrum meeting with my supervisor at the end of each one. As well as this, I will use the Software Development Life Cycle (SDLC) framework to guide the implementation of SecuLearn.
 
This project seeks to deliver a challenging, yet engaging educational platform that not only sharpens cybersecurity skills but also offers companies and individuals a way to monitor and improve their overall online security toolkit.

### **Key Features**

Key features of my application will consist of:
 
- **Dynamic Content Creation** - leverages Google Gemini through API calls
- **Lessons** - using the CyBOK (Cybersecurity Body of Knowledge) curriculum and adhering to Bloom's Taxonomy Model, lessons are generated based on the section name, subtopic name, and topic name - with the option for quizzes whenever the user decides they want to test their knowledge
- **Progress Storage** - lesson progress is stored in the database, so you can see what sections you have completed, and which you have not
- **Phishing Email Simulations** - users can have emails generated with artificial intelligence, of which they will need to decide whether they are phishing emails or legitimate emails - increases recognition through being able to spot key signs
- **Chatbot Interface** - users can interact with a chatbot that uses Gemini to provide a chatbot exclusively limited to cybersecurity - I used NLP to train a classifier that deduces relevance
- **Full-Stack MERN Architecture** - a fully integrated solution using MongoDB, Express.JS, React, and Node.js to ensure seamless communication across/between the stack
- **RESTful API Design** - with the backend being built using Express.js, it will integrate structured routing, input validation, as well as relevant middleware
- **API Integration with Axios** - it fetches and sends data to APIs using Axios - with async/await blocks for maintainable, readable code
- **Secure Data Management** - stores and retrieves user data using a NoSQL (MongoDB) database with appropriate security measures - such as hashing and salting of user passwords before storage
- **Profile Management** - users can view their profile information, update their password and delete their profile with instant effect if they desire
- **Adhering to Agile & SDLC** - being built following Agile principles, as well as the SDLC
- **Version Control** - regular, meaningful commits to my GitHub repository with clear documentation - GitHub actions was also used to showcase a working CI/CD pipeline, in which SecuLearn is tested, built, and deploye

## **Running the Project**

There are two options when it comes to running the project - you can either access the deployed version at **https://SecuLearn.org.uk** which shows evidence of my fully working pipeline (you can contact me to whitelist your IP address, as it is only available to me).

Alternatively, you can follow the steps below:

1) Navigate to the GitHub repository to ensure you have access (**https://github.com/oliprev/OP_COMP3000**)
2) Ensure you have the latest version of Git installed (**https://git-scm.com/downloads**)
3) Launch Command Prompt (if using Windows) or Terminal (if using MacOS)
4) Ensure Git has successfully installed, by inputting
```
git --version
```
5) Go to the directory (using cd) you would like to clone the repository to
6) Input the code below
```
git clone --recursive https://github.com/oliprev/OP_COMP3000.git
```
7) Once this is successful, you will have cloned my repository successfully
8) Install / launch VS Code
9) Hover over 'File', and then press 'Open Folder...'
10) From there, select the OP_COMP3000 repository and open
11) You will require environment variables - contact me at **oliver.prevett@students.plymouth.ac.uk** and I will send them promptly with comprehensive instructions
12) If successful, go to the Terminal - if not launched already, hover over 'Terminal', and click 'New Terminal'
13) Input the following below in the root of the project
```
npm install && npm install --prefix backend && npm install --prefix frontend
```
14) From there, input
```
npm run build && npm start
```
15) Now, navigate to localhost:9000
16) You should now be able to access my project!
17) If you wish to stop hosting, click on the terminal and hit CTRL + C
18) If you wish to run through the tests, run the following in the project root
```
npm test
```

## **Technologies**

- **MongoDB** - database for storing user and CyBOK information
- **Express.js** - backend framework for building RESTful API
- **React** - frontend framework for building seamless user interfaces
- **Node.js** - runtime environment for executing JavaScript on the server
- **Jest** - used for integration testing

I chose to use the MERN stack because I wanted the option to use JavaScript for the entire implementation - within the backend as well as the frontend. As well as this, the extensive range of libraries and frameworks through NPM were also beneficial to providing extra functionality. I explored the possibility of using Angular rather than React, but vastly preferred the flexibility that React offers through picking and choosing different libraries to install and work with. As well as this, I am much more proficient with React as a developer. It also seems to be much more sought after in industry.

### **Libraries & Frameworks**

- **Axios** - for making asynchronous HTTP requests to APIs
- **Environment variables** - eliminates hardcoding of sensitive values
- **express-validator** - middleware for validating and sanitising user input
- **swagger-ui-express** - provides a UI to document and test RESTful API endpoints
- **cors** - middleware which enables Cross-Origin Resource Sharing between frontend and backend
- **dotenv** - loads environment variables from .env files into process.env
- **mongoose** - ODM library for interacting with MongoDB using schemas and models
- **http** - Node.js module used to create HTTP server functionality
- **helmet** - adds security headers to HTTP responses to protect SecuLearn from known vulnerabilities
- **express-rate-limit** - limits repeated requests to API endpoints to prevent abuse
- **path** - used for handling and transforming file paths
- **bcrypt** - used to hash and salt passwords before database storage
- **jsonwebtoken** - allows JSON Web Token implementation for secure user authentication
- **yaml** - parses / loads YAML-based configuration - used for Swagger
- **@google/generative-ai** - provides access to Google Gemini for content generation
- **natural** - NLP library used for text analysis
- **@mui/material** - library used extensively for a modern, responsive UI
- **react-dom** - provides DOM-specific means of rendering React components
- **react-router-dom** - enables routing through React components within application
- **concurrently** - runs multiple scripts simultaneously

### **Developer Tools**

- **Git / GitHub** - extensively used for version control, as well as DevOps & CI/CD pipeline
- **Visual Studio Code** - resourceful IDE used for writing, testing, and debugging code - seamless Git integration
- **Vite** - frontend bundler and development server for React - with hot reloading
- **Postman** - used to test APIs through sending requests and inspecting responses
- **npm** - Node.js package manager, for the installing and managing of dependencies through package.json files

## **Project Management**

I used Trello to plan my sprints and get a visual depiction of my backlog. You can visit it at the following link: https://trello.com/b/XX2Dc1pz

## **Software Engineering Principles**

Throughout my implementation, I have kept in mind an array of key principles that aim to make the development process easier. The principles I have adhered to in particular are listed below.

- **SoC (Separation of Concerns)** - the idea behind it is that programs are broken down into seperate modules that do not neccesarily overlap - my use of this is demonstrated by using segregating each page into a different 'component' - a key feature of React
- **DRY (Don't Repeat Yourself)** - aims to reduce the repetition of information - implemented through use of middleware in the backend, as well as defining CSS styles by class rather than by individual component
- **YAGNI (You Aren't Gonna Need It)** - ensures developers are thinking in the present, rather than the future - has been beneficial to me through promoting efficiency

## **Repository Structure**

I used the following line of code to generate the structure of my repository.
```
tree -I 'node_modules|.git' -L 2 > directorystructure.txt
```
Below, you can find the general file structure.
```
.
├── backend
│   ├── functions
│   ├── models
│   ├── package.json
│   ├── routes
│   ├── server.js
│   ├── swagger.js
│   ├── swagger.yaml
│   └── tests
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tests
│   └── vite.config.js
├── LICENSE
├── package.json
├── PRIVACY.md
├── README.md
└── TERMS.md
```

I have employed a hierarchical structure for my project, consisting of three main categories: backend, frontend, and root.

### **`backend/`**

Contains server-side logic, as well as API endpoint information.

- `functions/` - middleware/helper functions used across backend - e.g. token authentication
- `models/` - defines MongoDB schemas through Mongoose models, used to organise data
- `routes/` - defines Express routes
- `tests/`- unit / integration tests exclusively for backend
- `server.js` - main entry point for backend server
- `swagger.js` & `swagger.yaml` - Swagger documentation setup
- `package.json` - backend-specific dependencies and scripts

### **`frontend/`**

Contains client-side code, including pages, CSS, and more

- `public/` - static assets e.g. images / icons
- `src/` - core React components, pages, and logic
- `tests/` - unit / integration tests exclusively for frontend
- `index.html` - main HTML file used by Vite
- `eslint.config.js` & `vite.config.js` - configuration for linting and frontend build tool
- `package.json` - frontend dependencies and scripts

### **Root Directory**

- `LICENSE` - licensing information for repository (Creative Commons)
- `README.md` - this file
- `PRIVACY.md` - privacy policy for this project
- `TERMS.md` - terms and conditions for use / registration
- `package.json` - project-level scripts e.g. npm run build

## **License**

As specified to do so in the brief, this project adheres to the Creative Commons license - which is specified in the 'LICENSE' file within the root of my repository.

## **Terms of Service and Privacy Policy**

There are Terms of Service and a Privacy Policy that must be agreed with / acknowledged in order to use the platform. They ensure transparency and demonstrate compliance with ethical and professional standards.

These documents can be found when registering for a SecuLearn account, or alternatively see below:

- **Terms of Service**: [Read Terms of Service](TERMS.md)
- **Privacy Policy**: [Read Privacy Policy](PRIVACY.md)

## **Limitations**

Given the ambitious nature of my project, some limitations were to be expected given the relatively short timeframe of the project. These are listed below.

- SecuLearn requires an internet connection at all times, so it can interact with the database
- Only supports English in terms of languages
- API response times can be slow sometimes
- Google Gemini responses for the phishing email simulation sometimes give the answer within the text

## **Future Improvements**

SecuLearn has evolved a lot since Sprint 0, and future development will consist of the following:

- Monetisation, through advertisements / subscription plans
- Expand the functionality of phishing email simulations, to make them seamless from real emails
- Offline mode e.g. option to download a given knowledge area and all of its contents for learning on-the-go
- Support for different languages - perhaps using translation APIs?
- Means of gamification - through use of achievements, leaderboards among users, or incentivised competitions
- Visual dashboard which can show personal statistics
- Specialised admin dashboard / features
- Feedback system so users can report inaccurate or inappropriate AI responses
- Single Sign On (SSO) integration


