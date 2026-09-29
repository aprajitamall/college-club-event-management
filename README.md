\# College Club Event Management Website



A responsive full-stack web application for managing and discovering college club events. Students can explore upcoming events, search and filter events, and register online, while administrators can manage events and view student registrations.



\## Features



\### Student / User Side



\* Responsive home page

\* College club introduction

\* Upcoming events section

\* Featured event

\* Complete events listing

\* Search events by name

\* Filter events by category

\* Event details including:



&#x20; \* Event name

&#x20; \* Date \& time

&#x20; \* Venue

&#x20; \* Description

\* Online event registration

\* Registration form with:



&#x20; \* Full Name

&#x20; \* Email

&#x20; \* College / Year

&#x20; \* Phone Number

\* Registration success confirmation

\* Light / Dark mode



\### Admin Side



\* Admin dashboard

\* Add new events

\* Edit existing events

\* Delete events

\* View registered students

\* Search and filter registrations

\* Event and registration data stored through the backend



\## Tech Stack



\### Frontend



\* React

\* Vite

\* React Router

\* HTML5

\* CSS3

\* JavaScript



\### Backend



\* Node.js

\* Express.js

\* CORS

\* REST API



\### Data Storage



\* JSON-based database (`server/data/db.json`)



\## Project Structure



```text

college-club-event-management/

│

├── client/

│   ├── public/

│   └── src/

│       ├── components/

│       │   ├── EventCard.jsx

│       │   ├── Navbar.jsx

│       │   └── RegistrationModal.jsx

│       │

│       ├── pages/

│       │   ├── Admin.jsx

│       │   ├── Events.jsx

│       │   └── Home.jsx

│       │

│       ├── App.jsx

│       ├── App.css

│       ├── index.css

│       └── main.jsx

│

├── server/

│   ├── data/

│   │   └── db.json

│   ├── package.json

│   └── server.js

│

├── .gitignore

└── README.md

```



\## API Endpoints



\### Events



| Method | Endpoint          | Description     |

| ------ | ----------------- | --------------- |

| GET    | `/api/events`     | Get all events  |

| POST   | `/api/events`     | Create an event |

| PUT    | `/api/events/:id` | Update an event |

| DELETE | `/api/events/:id` | Delete an event |



\### Registrations



| Method | Endpoint                 | Description           |

| ------ | ------------------------ | --------------------- |

| GET    | `/api/registrations`     | Get all registrations |

| POST   | `/api/registrations`     | Create a registration |

| DELETE | `/api/registrations/:id` | Delete a registration |



\## Installation \& Setup



\### 1. Clone the repository



```bash

git clone https://github.com/aprajitamall/college-club-event-management.git

cd college-club-event-management

```



\### 2. Install backend dependencies



```bash

cd server

npm install

```



\### 3. Install frontend dependencies



Open another terminal:



```bash

cd client

npm install

```



\### 4. Start the backend



From the `server` directory:



```bash

node server.js

```



The backend will run at:



```text

http://localhost:5000

```



\### 5. Start the frontend



From the `client` directory:



```bash

npm run dev

```



The frontend will run at:



```text

http://localhost:5173

```



\## Development



During development, Vite proxies `/api` requests from the React frontend to the Express backend.



Frontend:



```text

http://localhost:5173

```



Backend:



```text

http://localhost:5000

```



\## Production Build



Build the React frontend using:



```bash

npm run build --prefix client

```



The generated production files will be placed inside:



```text

client/dist

```



The Express server is configured to serve the production frontend as well as the API.



\## Responsive Design



The application is designed to work across:



\* Desktop

\* Laptop

\* Tablet

\* Mobile devices



\## Future Improvements



\* User authentication and authorization

\* Secure admin login

\* MongoDB / PostgreSQL database

\* Email confirmation after registration

\* Event image uploads

\* Event reminders and notifications

\* Cloud-based persistent storage

\* Advanced analytics for administrators



\## Author



\*\*Aprajita Mall\*\*



GitHub:

https://github.com/aprajitamall



\## License



This project is developed as a college recruitment task and educational project.



