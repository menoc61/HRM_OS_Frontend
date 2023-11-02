# SAI I LAMA - Installation Guide

[![License](https://img.shields.io/github/license/username/erp-os.svg?style=flat-square)](https://github.com/username/erp-os/blob/master/LICENSE)

This setup guide is for setting up the HR; OS application in a local development environment. You can also host this application on various cloud hosting providers such as AWS, GCP, AZURE, DigitalOcean, Heroku, Netlify, Vercel, Render, etc.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Database (PostgreSQL)](#database-postgresql)
- [Backend (Express/Node.js)](#backend-expressnodejs)
- [Frontend (React.js)](#frontend-reactjs)
- [Features and Functionalities](#Features-and-Functionalities)
- [Collaboration](#collaboration)
- [License](#license)

## Prerequisites

Before starting the installation process, you need to ensure that the following prerequisites are met:

- Download and Install the LTS version (Current LTS version is 16.18.0) of the Node.js runtime environment from the official website [here](https://nodejs.org/en/download/).
- Download and Install the PostgreSQL database from the official website [here](https://www.postgresql.org/download/).
- Type command: `npm install --global yarn`. It will install the Yarn package manager globally on your machine if it is not already installed.

Without installing Node.js, you cannot use the npm command. To check whether Node.js has been installed correctly, type the command `node --version` in your terminal. It will show the current Node.js version of your machine.

## Database (PostgreSQL)

1. At the time of installation, make a note of the database username, password, and port number.
2. After installing PostgreSQL, you need to create a database. To create a database, open the psql command shell and type: `CREATE DATABASE hrm;`.
3. Remember your database username, password, port, and the name of the created database. You will need them later in the backend part to set up the environmental variable in the .env file.

## Backend (Express/Node.js)

1. Navigate into the backend folder `ERP_OS_Backend` from your command prompt/terminal.
2. Type command: `yarn`. It will install all the required libraries and packages required for the backend. If you see any warnings while running yarn, you have to activate the script to run the yarn command in your machine. Or you can use the npm install command instead of yarn.
3. You will find a `.env` file in the root directory of the backend `ERP_OS_Backend`, set appropriate values for all the variables. To do this, edit the `.env` file and change all the variables accordingly.
4. Type command: `yarn prisma migrate dev`. It will create the required database table and data in the PostgreSQL database that you have installed previously.
5. Type command: `yarn start`. It will start the backend server on `http://localhost:5000/`.

## Frontend (React.js)

1. Navigate to the frontend folder `HRM_OS_Frontend` from your command prompt/terminal.
2. Type command: `yarn`. It will install all the required libraries and packages required for the frontend.
3. You will find a `.env` file in the root directory of the front and set the variable `REACT_APP_API = http://localhost:5000/v1/`.
4. Type in your terminal command: `yarn start`. It will start the frontend server on `http://localhost:3000/`.

## Features and Functionalities

The Elegant Dashboard Design includes the following features and functionalities:

- Elegant and user-friendly dashboard
- Employee management
- Leave management
- Payroll management
- Performance management
- Recruitment management
- Appraisal management
- Account management
- PWA available on both Android and iOS
- Pagination in all table views and date-wise data view in a table
- Packing Slip printing
- Dynamic Invoice Header, Footer data edit
- Bulk CSV data upload
- Download data as CSV
-  search


## Collaboration

Contributions to this project are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).
