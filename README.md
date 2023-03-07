<div align="center">
  <br/>
  <p>
    <h1>MAL Clone</h1>
    <p>An anime tracker web application based on the famous MyAnimeList.</p>
    <a href="https://mal-clone.vercel.app/">Link to the project live.</a>
  </p>
  <br/>
</div>

## Table of contents

- [About](#about)
- [Installation](#installation)

## About

> An anime tracker web application based on the famous site [MyAnimeList](https://www.myanimelist.net) with data regarding different anime, specific data about an anime and to add them to a personal watchlist to track them and complete them when finished watching.
> The application is made with ReactJS, Firebase, Typescript, Axios and uses the Jikan.Moe API to retrieve data from MyAnimeList.

## Installation/Instructions

### To run this project locally:

**1. Clone the repo and move directory:**

```bash
git clone https://github.com/KevinStolk/mal-clone

cd mal-clone
```

**2. Install the dependencies:**

```bash
npm install

or

pnpm install
```

**3. Make a Firebase project to connect the application to a Firestore database.**

- To create a Firebase project, go to the [Firebase](https://www.firebase.com) console and create a new project.
- Enable the Firestore database feature.
- After this, go to the Firebase console and enable the authentication feature from Firebase.
- Follow the .ENV step closely.
- The project should run fine without any issues moving forward.

**4. Make an `.ENV` file in the root directory with the following variables:**

```bash
VITE_REACT_APP_API_KEY=(your api key here)
VITE_REACT_APP_AUTH_DOMAIN=(your auth domain here)
VITE_REACT_APP_PROJECT_ID=(your project id here)
VITE_REACT_APP_STORAGE_BUCKET=(your storage bucket here)
VITE_REACT_APP_MESSAGING_SENDER_ID=(your messaging sender id here)
VITE_REACT_APP_APP_ID=(your app id here)
```

**5. Run the project with either npm or pnpm, the project is located at http://localhost:5173**

```bash
npm run dev

or

pnpm run dev
```
