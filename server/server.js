const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "data", "db.json");

function readDB() {
  if (!fs.existsSync(dbPath)) {
    return {
      events: [],
      registrations: [],
    };
  }

  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify(data, null, 2)
  );
}

/* =========================
   API ROUTES
========================= */

// API test route
app.get("/api", (req, res) => {
  res.json({
    message: "College Club Event Management API is running",
  });
});

// Get all events
app.get("/api/events", (req, res) => {
  const db = readDB();
  res.json(db.events);
});

// Add event
app.post("/api/events", (req, res) => {
  const db = readDB();

  const event = {
    id: Date.now().toString(),
    ...req.body,
  };

  db.events.push(event);
  writeDB(db);

  res.status(201).json(event);
});

// Update event
app.put("/api/events/:id", (req, res) => {
  const db = readDB();

  const index = db.events.findIndex(
    (event) => event.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  db.events[index] = {
    ...db.events[index],
    ...req.body,
  };

  writeDB(db);

  res.json(db.events[index]);
});

// Delete event
app.delete("/api/events/:id", (req, res) => {
  const db = readDB();

  const exists = db.events.some(
    (event) => event.id === req.params.id
  );

  if (!exists) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  db.events = db.events.filter(
    (event) => event.id !== req.params.id
  );

  writeDB(db);

  res.json({
    message: "Event deleted successfully",
  });
});

// Get registrations
app.get("/api/registrations", (req, res) => {
  const db = readDB();
  res.json(db.registrations);
});

// Register student
app.post("/api/registrations", (req, res) => {
  const db = readDB();

  const registration = {
    id: Date.now().toString(),
    registeredAt: new Date().toISOString(),
    ...req.body,
  };

  db.registrations.push(registration);
  writeDB(db);

  res.status(201).json(registration);
});

// Delete registration
app.delete("/api/registrations/:id", (req, res) => {
  const db = readDB();

  const exists = db.registrations.some(
    (registration) =>
      registration.id === req.params.id
  );

  if (!exists) {
    return res.status(404).json({
      message: "Registration not found",
    });
  }

  db.registrations = db.registrations.filter(
    (registration) =>
      registration.id !== req.params.id
  );

  writeDB(db);

  res.json({
    message: "Registration deleted successfully",
  });
});

/* =========================
   PRODUCTION FRONTEND
========================= */

const clientPath = path.join(
  __dirname,
  "../client/dist"
);

app.use(express.static(clientPath));

app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api")
  ) {
    res.sendFile(
      path.join(clientPath, "index.html")
    );
  } else {
    next();
  }
});



app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});