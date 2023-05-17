# Meegu Test
[![wakatime](https://wakatime.com/badge/user/ae2057ea-cc3f-4b79-9a69-3f14457d33da/project/f182adf7-cabe-4b7a-bc84-6d1396bd2ccf.svg)](https://wakatime.com/badge/user/ae2057ea-cc3f-4b79-9a69-3f14457d33da/project/f182adf7-cabe-4b7a-bc84-6d1396bd2ccf)

This project is a coding challenge that demonstrates a user CRUD (Create, Read, Update, Delete) application. The application is built using the following technologies:

 - Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
 - Prisma: A modern database toolkit for TypeScript and Node.js that provides an ORM (Object-Relational Mapping) and query builder.
 - MySQL: A popular open-source relational database management system used to store and retrieve data.
 - Next.js: A React framework for building server-side rendered and statically generated web applications.

The goal of this coding challenge is to showcase the implementation of a basic user management system with the ability to create, read, update, and delete user records. It provides a foundation for understanding how these technologies work together to build a functional application.

Please note that this project focuses on the core functionality of user management and may not include advanced features or extensive error handling. It serves as a starting point for further development and customization based on specific project requirements.

## API Documentation

For detailed API documentation, please refer to the [API Documentation](https://documenter.getpostman.com/view/1241471/2s93eePUTa#8cbecf76-50a0-429d-a7e0-0bdac11a66e6). It provides information about the available endpoints, request payloads, and response formats.

## Installation

To run the project, please ensure that you have the following prerequisites installed:

- Node.js v18.16 or later
- Docker Compose

Follow the steps below to install and configure the project:

### Server Setup

1. Navigate to the server directory:
```bash
cd server/
```

2. Install the server dependencies:
```bash
npm install
```

3. Start the development database using Docker Compose:
```bash
docker-compose up -d
```

4. Apply the Prisma migrations for the development environment:
```bash
npm run db:dev
```

5. Start the server:
```bash
npm start
```

The server will start running at http://localhost:3000.

### Client Setup

1. Navigate to the client directory:
```bash
cd client/
```

2. Install the client dependencies:
```
npm install
```

3. Start the client development server:
```bash
npm start
```

The client application will be accessible at http://localhost:4000.

Make sure to run the commands in the specified order to set up the server and client environments properly. This guide assumes that you are running the development and test databases using Docker Compose and have the necessary configurations in place.

## Running Tests

To run the unit and end-to-end tests, please follow these steps:

1. Make sure you are in the server folder:
```bash
cd server/
```
It's important to navigate to the server folder before executing the following commands.

2. To run the unit tests, use the following command:
```bash
npm test
```
This command will execute the unit test suite, which verifies the functionality and correctness of individual units of code.

3. Before running the end-to-end (e2e) tests, make sure to apply the Prisma migrations for the test environment:
```bash
npm run db:test
```
This command will create the necessary database tables and schema for the test environment.

4. To run the end-to-end tests, use the following command:
```bash
npm run test:e2e
```
This command will execute the end-to-end test suite, which tests the application's behavior as a whole and ensures that different components work together correctly.

Please make sure to run the commands in the server folder for both unit and end-to-end tests.

Feel free to explore and modify the project according to your needs. If you have any questions or need further assistance, please don't hesitate to reach out.
