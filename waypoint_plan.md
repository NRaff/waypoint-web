# **Waypoint**


## Resources

### [Guide to NextJS and Firebase](https://nextjs.org/learn/excel/typescript)

### [Adding redux to the project](https://dev.to/theallegrarr/adding-redux-to-next-js-app-4n5o)

### [Example from nextjs using redux](https://github.com/vercel/next.js/tree/canary/examples/with-redux-thunk)

## Stack

### Redux

### React

### Firebase Realtime Database

### Typescript

### Webpack

### Google Maps

### Testing

- Jest (Unit)

- Cypress / Playwright (Integration / End to End)

### Tooltips

- popper.js

### Consider tailwind

## Web

### Auth

- Google

- Apple

### Courses

- View my courses

- Make route public

- Create new course

- Favorite routes

### Races

- Organizer

	- Create a Race

	- Approve racer to join

	- Invite racer

	- Start race

	- End race

- Racer

	- Join a race

	- View my races

	- Review race

- Watch race

## Mobile

### Auth

- Google

- Apple

### Courses

- View my courses

- Favorite routes

### Races

- Join a race

- View my races

### Race

- Countdown

- Organizer

	- Start race

	- End race

	- Watch racers

- Racer

	- Waypoint guidance

	- Lead time gap

## Data structure

https://firebase.google.com/docs/database/web/structure-data  

- the arrays noted may need to be indices as explained in the structure documentation

### Users

- username: string

- name: string

- created_courses: [course_ids]

- favorite_courses: [fav_course_ids]

- raced_in: [race_ids]

- races_organized: [race_ids]

### Courses

- course_name: string

- course_length: number

- course_duration: string

- type: {public, private}

- waypoints: [waypoint_id]

### Races

- name: string

- race_id: string

- racers: [user_ids]

- course: course_id

- race_paths: [path_ids]

- status: {planned, started, complete, cancelled}

- type: {public, private}

### Race_paths

- racer_id: string

- race_id: string

- paths: [path]

	- latitude: float

	- longitude: float

	- timestamp: timestamp

### Waypoints

- name: string

- course_id: string

- type: string {point, gate, finish}

- points: [point]

	- latitude: float

	- longitude: float

- pass_direction: string {starboard, port, through}

- order: number

