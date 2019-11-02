# Haunt the Union: Rogue App

This is the codebase for the 2019 OU Haunt the Union interactive app. This app was a collaboration between the OU Union Programming Board and the OU Game Dev Association.

## Setup

If you would like to run this app yourself, you will need to do the following steps. These instructions assume that you have a machine running Ubuntu 18.04 or later and have npm 10.x or later.

1. Clone this repository.
2. Run `npm install` in both the `app` and `server` directories.
3. In `server`, run `npm run build` to build the back-end code. You can then run `npm run start` to start the server. We recommend putting this a dedicated tmux server.
4. In `app`, run `npm run build` to create a build of the front-end code. This will compile html, js, and css to the `build` directory in `app`.
5. Point your webserver to look for files in `app/build`.