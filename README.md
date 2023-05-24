### Table of Contents

- [Project Info](#project-info)
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [How to run the code](#how-to-run-the-code)
- [API Documentation](#Documentation)
- [Additional Info](#additional-info)

#

### Project Info

Project is simple RESTful API for Contact Management System which allows user to perform CRUD operations. It consits of creating new contacts, updating existing ones, retrieving single or all contacts, and deleting contacts as needed.

#

### Prerequisites

- Node.js
- npm

#

### Tech Stack

- Express.js
- MySQL

#

### How to run the code

Clone the repository

```sh
- git clone https://github.com/lasha-darchiashvili/Newage-project.git
```

Open project directory

```sh
- cd 'your directory'
```

Instal packages

```sh
- npm install
```

Create .env file, paste this code there and change YOUR_USERNAME and YOUR_PASSWORD to your credintials

```sh
DB_HOST=localhost
DB_USER=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=contact_management
```

Run following command:

```sh
npm start
```

#

### API Documentation

The API documentation is generated using Swagger. To view the documentation and interact with the API endpoints, follow these steps:

1. Ensure that the server is running by executing the `npm start` command.
2. Open your web browser and navigate to the following URL: `http://localhost:3000/api-docs`
3. The Swagger UI interface will be displayed, showing the available endpoints, request/response details, and allowing you to make test requests directly from the documentation page.

#

### Additional Info

Please keep in mind that for testing purposes seeding of sample data is included.
