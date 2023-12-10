# Task Manager

## Set up

Prior to running the application you will need to install MongoDB locally: https://www.mongodb.com/docs/manual/installation/

For mac this can be done via brew:

```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Install all packages with `npm i`

Run server and client concurrently: `npm run dev`

## Getting started

There are no users in your database so you will need to signup. Once you sign up you will land on the dashboard where you can begin to create tasks.

## Features

- There are two different views available on the dashboard. The default view has the tasks arranged into columns, sorted by their status. The second view can be seen by pressing the 'All tasks' button, which will show all tasks unordered.
- Filtering - tasks can be filtered by priority
- Search - tasks can be searched by title
