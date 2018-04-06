# Student Assessment Helper

The process of adding students to the GitLab assessments is quite annoying in my opinion. So, I went ahead and made a quick app, with the lovable styles of the other DevMtn apps, that streamlines the entire process for mentors. All you need to do is get a GitLab personal access token (which I'll show you how to get) and know your student's GitLab usernames.

## Getting started

Like I mentioned earlier, you'll need a GitLab personal access token (and account but I'm going to assume you already have one of those). Head over to [https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) and follow the directions given. Make sure that you give this specific token access to your API since that is the core behind this entire thing. Copy that key down and keep it somewhere nice and safe since we will be needing it very soon.

## Install

`yarn`

The only other step to get this app up and running is creating a `.env` file, based on the `example.env`, and pasting in your personal access token.

## Running the app

We can run either `npm run dev` to run all three pieces or run all three pieces below in separate terminals.

In the first terminal we will get the react app started with `yarn start`

In the next terminal we will start the `json-server` so we can store the students for convenience. The `json-server` automatically defaults to port 3000, since we have our react app on that specific port we will need to tell it to run elsewhere. The command to get the `json-server` running is `json-server --watch db.json --port 3001`

The last terminal will house our server. By default `nodemon` will restart each time it senses a change so we need to tell it ignore our `db.json` file. We can create a nodemon.json file telling nodemon to ignore changes to the db.json file as well as the public folder.  Or we can start it's command with `nodemon --ignore db.json`.

Whew...

## Directions

Using the app is very straight forward.

### Adding a student to the list of students

To add a student to `db.json` select the add button in the students column. This is where you will need the student's GitLab username. Once the student's name appears give it a click and they will be added to the list.

### Adding a student to an assessment

To add a student to an assessment simply select the student and the assessment. Once you have done so you will see a button appear. Give it a click and you will recieve an alert of whether it was successful or not. When you add a student to an assessment they are given the reporter access level and their access will expire the following day.

### If you see an error or think of an improvement by all means submit a PR.
