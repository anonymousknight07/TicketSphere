# TicketSphere - Event Ticketing Application for Entrepreneurship Cell of IARE
![image](https://github.com/user-attachments/assets/d9b2dc95-f305-4937-baaa-bc19fc24c0c5)


**TicketSphere** is a comprehensive event ticketing application designed for the **Entrepreneurship Cell (E-Cell)** of **IARE**. The platform enables users to explore and RSVP for events hosted by the E-Cell, including workshops, networking events, seminars, and more. This app provides a seamless way for attendees to register for events and manage their participation.

## Tech Stack

- **Next.js**: A powerful React framework that enables server-side rendering and static site generation for optimal performance and SEO.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid styling and customization of the application with minimal effort.
- **Appwrite Cloud**: A powerful backend-as-a-service (BaaS) platform that handles authentication, databases, file storage, and more, ensuring smooth backend operations for the app.
- **React Toastify**: A simple library used to display notifications to users for various actions such as event registration, reminders, and errors.
- **EmailJS**: A service used to send event-related emails such as confirmation of RSVP, reminders, and updates.

## Features

### 1. **Event Listing and Details**
   - Users can view a list of upcoming events hosted by the Entrepreneurship Cell.
   - Each event has detailed information including the event title, date, time, description, and the ability to RSVP.

### 2. **RSVP Functionality**
   - Attendees can register for events by RSVPing directly through the application.
   - The platform ensures that only those who RSVP are counted as participants and can access the event.

### 3. **Email Notifications**
   - **EmailJS** is integrated to send automated email notifications when users RSVP for an event, confirming their participation and providing event details.
   - Attendees will also receive reminders and updates about the event as the date approaches.

### 4. **User Authentication and Registration**
   - Users can create an account and log in securely using the **Appwrite Cloud** authentication system.
   - Authentication is handled via email and password for easy user management.

### 5. **Admin Panel (Future Enhancement)**
   - The platform allows admins to add, update, or remove events directly from the dashboard, keeping the event listings current.

## How to Use

### 1. **Sign Up / Login**
   - To get started, users need to sign up or log in to the application using their email and password.

### 2. **Browse Events**
   - After logging in, users can browse a list of upcoming events organized by the Entrepreneurship Cell of IARE.
   - Each event includes information such as the event title, description, date, and time.

### 3. **RSVP for Events**
   - If you’re interested in attending an event, simply click on the "RSVP" button.
   - Once your RSVP is confirmed, you’ll receive an email with event details and a confirmation of your attendance.

### 4. **Email Reminders**
   - As the event date approaches, the app will send reminder emails to ensure you don’t miss out.

## Installation

### Prerequisites:
- **Node.js** (v16 or above)
- **npm** or **yarn**

### Steps to Set Up Locally:
1. Clone the repository:
```bash
   git clone https://github.com/yourusername/ticketsphere.git
```
2. Navigate into the project directory:

```bash
cd ticketsphere
```
3. Install dependencies:

```bash
npm install
or
yarn install
```
4. Set up environment variables:
```bash
Create a .env.local file in the root of the project.
Add the necessary environment variables for Appwrite, EmailJS, and other configuration settings.
```
5. Run the development server:

```bash
npm run dev
or
yarn dev
```
This will start the app on http://localhost:3000.


## Contributing
We welcome contributions to TicketSphere! Whether you’re fixing bugs, adding new features, or improving the documentation, feel free to fork the project and submit a pull request. Please ensure to follow the code style and include tests for any new features.

## Steps to Contribute:
- Fork the repository
- Create a new branch for your feature/fix
- Make your changes
- Test your changes
- Submit a pull request


## Contact
For any questions or support, please contact us at ecelliare.ac.in.
![transparentlogo](https://github.com/user-attachments/assets/07b16e6e-d07c-44d6-8b21-8717e7ff5d04)
   
   
