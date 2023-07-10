# Ygacs quiz

A Node.js-based quiz platform with JWT authentication, Express, Mongoose, pug templates, and Sass. Create an account, take quizzes, and manage your progress.

## Demo

https://ygacs-quiz.onrender.com/

Note: The website is currently hosted on a free hosting platform, which may result in slightly longer initial loading times. To ensure a faster user experience, I recommend running the service on your local machine.

## Features

Account Registration:

- Allow users to create new accounts on the website.
- Request essential registration information such as - username, email address, and password.

Authentication with JSON Web Token (JWT):

- Enable users to authenticate and access protected resources using JWT.
- Generate and issue JWT tokens upon successful login or registration.
- Verify the authenticity and validity of JWT tokens for secure authentication.

Quiz Creation: (in work)

- Provide the ability for users to create their own quizzes
- Offer an interface to add questions and answer choices to the quiz.
- Allow setting the correct answer for each question.

Quiz Taking:

- Allow users to choose available quizzes to take.
- Display questions and answer choices to the user.
- Verify user answers and provide quiz results upon completion.

Viewing Quiz Results:

- Store quiz results for each user.
- Grant users access to their own quiz results.
- Display overall statistics for quizzes, such as the number of correct answers and average score. (in work)

Design and User Interface:

- Develop an attractive and intuitive website design.
- Ensure responsiveness and adaptability of the interface for various devices.
- Enhance user interaction with animations, visual cues, and user-friendly navigation.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` - Set it to either `development` or `production` depending on the desired environment.

`PORT` - The port on which the server will run. If no port is specified, the application will default to using port 3000.

`DB` - This variable should contain the connection string for MongoDB. Instead of including the user and password directly in the string, use the format `<USER:PASSWORD>`.

Example of `DB` variable:
`mongodb+srv://<USER:PASSWORD>@cluster0.dsyfuih.mongodb.net/ygacs-quiz?retryWrites=true&w=majority`

`DB_USER` - Enter the username for the database.

`DB_PASSWORD` - Enter the password for the database.

`JWT_SECRET` - Set this variable to the desired secret string for JWT (JSON Web Token) authentication.

`JWT_EXPIRES_IN` - Specify the expiration time for JWT tokens in days, using only numeric values (e.g. `30`).

## Run Locally

Install dependencies

```
npm install
```

Start the server

```
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
