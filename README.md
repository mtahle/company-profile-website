# KloudKiq Company Profile

The KloudKiq Company Profile project is a marketing website for KloudKiq, a software development company. It aims to showcase the company's services, achievements, and expertise through a smart and attractive web presence. The website is designed to be both informative and engaging, filled with sample content to highlight the capabilities and offerings of KloudKiq.

## Overview

This project utilizes a traditional web application architecture with a backend powered by Node.js and Express for server-side logic, and MongoDB for database management. The frontend is dynamically rendered using EJS templates and styled with Bootstrap for a responsive and modern design. The application's structure follows MVC principles, organizing the codebase into models for data, views for the UI, and routes for handling business logic.

### Project Structure

- **Server-side**: Node.js with Express for routing and server logic.
- **Database**: MongoDB, with Mongoose as the ODM for interacting with the database.
- **Frontend**: EJS for template rendering, Bootstrap for styling.
- **Security**: bcrypt for hashing passwords, dotenv for managing environment variables.
- **Email Integration**: Nodemailer for sending emails for contact form submissions.

## Features

- **User Authentication**: Secure login and registration for admin users.
- **Dynamic Content Management**: Admins can manage testimonials, blog posts, and view contact form submissions.
- **Responsive Design**: Ensures a great user experience across all devices.
- **Contact Form**: Allows visitors to submit inquiries directly through the website, with submissions emailed to the company.

## Getting started

### Requirements

- Node.js
- MongoDB (Local or MongoDB Atlas)
- npm (Node Package Manager)

### Quickstart

1. Clone the repository to your machine.
2. Install MongoDB locally or set up a MongoDB Atlas account for cloud-based storage.
3. Run `npm install` in the project directory to install dependencies.
4. Copy `.env.example` to a new file named `.env` and fill in your MongoDB URL, session secret, and email settings.
5. Use `npm start` to launch the server. Access the application at `http://localhost:3000`.

## License

Copyright (c) 2024.