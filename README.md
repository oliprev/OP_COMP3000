# **Seculearn - An AI-Driven Cybersecurity Learning Platform**

## **Supervisor**

- **Name**: Professor Nathan Clarke
- **Email**: N.Clarke@plymouth.ac.uk

## **Project vision**

The aim of this project is to develop a multi-platform solution targeted at everyday users of technology who wish to improve their cybersecurity knowledge - specifically students. Seculearn is designed to address the exponential increase in risk that comes from being online, which can leaad to significant social, economic, and even political repercussions for individuals and organisations alike. Users will also be able to develop a profound understanding of complex concepts that have historically been difficult to convey efficiently. This project also aims to prove that artificial intelligence can foster unique learning experiences when implemented correctly.

The proposed solution will be a full-stack (MERN) web-based application. It will integrate with Google Gemini to provide practical, AI-driven content tailored to the users’ needs. There may also be scope for monetisation in the future through advertisements and subscriptions, as well as an offline version.

It will follow an Agile approach, with sprints lasting two weeks each - culminating with a Scrum meeting with my supervisor at the end of each one. As well as this, I will use the Software Development Life Cycle (SDLC) framework to guide the implentation of Seculearn.
 
This project seeks to deliver a challenging, yet engaging educational platform that not only sharpens cybersecurity skills but also offers companies and individuals a way to monitor and improve their overall online security toolkit.

### **Key Features**

Key features of my application will consist of:
 
- **Dynamic Content Creation** - leverages Google Gemini through API calls
- **Lessons** - using the CyBOK (Cybersecurity Body of Knowledge) curriculum, lessons are generated based on the section name, subtopic name, and topic name - with the option for quizzes whenever the user decides they want to test their knowledge
- **Phishing Email Simulations** - users can have emails generated with artificial intelligence, of which they will need to decide whether they are phishing emails or legitimate emails - increases recognition through being able to spot key signs
- **Full-Stack MERN Architecture** - a fully integrated solution using MongoDB, Express.JS, React, and Node.js to ensure seamless communication across/between the stack
- **RESTful API Design** - with the backend being built using Express.js, it will integrate structured routing, input validation, as well as relevant middleware
- **API Integration with Axios** - it fetches and sends data to APIs using Axios - with async/await blocks for maintainable, readable code
- **Secure Data Management** - stores and retrieves user data using a NoSQL (MongoDB) database with appropriate security measures - such as hashing and salting of user passwords before storage
- **Profile Management** - users can view their profile information, update their password and delete their profile with instant effect if they desire
- **Version Control** - regular, meaningful commits to my GitHub repository with clear documentation - which showcases a professional CI/CD pipeline with working GitHub actions

## **Running the Project**

There are two options when it comes to running the project - you can either access the deployed version at **https://seculearn.org.uk** which shows evidence of my fully working pipeline (you can contact me to whitelist your IP address, as it is only available to me).

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
11) You will require environmental variables - contact me at **oliver.prevett@students.plymouth.ac.uk** and I will send them promptly
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
17) If you wish to stop hosting, click on the terminal and hit CTRL + C (Command + C on MacOS)
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

## **Libraries & Frameworks**

- **Axios** - for making HTTP requests to APIs
- **Environmental variables** - eliminates hardcoding of sensitive values
- **express-validator** - middleware for validating and sanitising user input
- **swagger-ui-express** - documents API routes and how they work
- **cors**
- **dotenv**
- **mongoose**
- **http**
- **helmet**
- **express-rate-limit**
- **path**
- **bcrypt**
- **jsonwebtoken**
- **yaml**
- **@google/generative-ai**
- **natural**
- **@mui/material**
- **react-dom**
- **react-router-dom**
- **concurrently**

## **Developer Tools**

- **Git / GitHub**
- **Visual Studio Code**
- **Vite**
- **Postman**
- **npm**

