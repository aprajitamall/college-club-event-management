import { useEffect, useState } from "react";

function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState("events");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [eventForm, setEventForm] = useState({
    name: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  const [registrationSearch, setRegistrationSearch] = useState("");

  useEffect(() => {
    loadEvents();
    loadRegistrations();
  }, []);

  const loadEvents = async () => {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data);
  };

  const loadRegistrations = async () => {
    const response = await fetch("/api/registrations");
    const data = await response.json();
    setRegistrations(data);
  };

  const handleEventChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `/api/events/${editingId}`
      : "/api/events";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventForm),
    });

    resetForm();
    loadEvents();
  };

  const editEvent = (event) => {
    setEditingId(event.id);

    setEventForm({
      name: event.name,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
    });

    setShowForm(true);
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    loadEvents();
  };

  const resetForm = () => {
    setEventForm({
      name: "",
      category: "Technical",
      date: "",
      time: "",
      venue: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const search = registrationSearch.toLowerCase();

    return (
      registration.name?.toLowerCase().includes(search) ||
      registration.email?.toLowerCase().includes(search) ||
      registration.eventName?.toLowerCase().includes(search)
    );
  });

  return (
    <main className="admin-page">
      <div className="admin-header">
        <span className="section-label">ADMINISTRATION</span>

        <h1>Admin Dashboard</h1>

        <p>
          Manage college events and monitor student registrations.
        </p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${
            activeTab === "events" ? "active" : ""
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>

        <button
          className={`admin-tab ${
            activeTab === "registrations" ? "active" : ""
          }`}
          onClick={() => setActiveTab("registrations")}
        >
          Registrations
        </button>
      </div>

      {activeTab === "events" && (
        <section className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2>Manage Events</h2>
              <p>{events.length} events available</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              + Add Event
            </button>
          </div>

          {showForm && (
            <div className="admin-form-card">
              <h3>
                {editingId ? "Edit Event" : "Add New Event"}
              </h3>

              <form onSubmit={handleEventSubmit}>
                <div className="form-grid">
                  <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={eventForm.name}
                    onChange={handleEventChange}
                    required
                  />

                  <select
                    name="category"
                    value={eventForm.category}
                    onChange={handleEventChange}
                  >
                    <option>Technical</option>
                    <option>Innovation</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Workshop</option>
                    <option>Other</option>
                  </select>

                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleEventChange}
                    required
                  />

                  <input
                    type="text"
                    name="time"
                    placeholder="Time (e.g. 10:00 AM)"
                    value={eventForm.time}
                    onChange={handleEventChange}
                    required
                  />

                  <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={eventForm.venue}
                    onChange={handleEventChange}
                    required
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={handleEventChange}
                  required
                />

                <div className="form-actions">
                  <button type="submit" className="primary-btn">
                    {editingId ? "Update Event" : "Create Event"}
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="admin-events">
            {events.map((event) => (
              <div className="admin-event-row" key={event.id}>
                <div>
                  <span className="category-badge">
                    {event.category}
                  </span>

                  <h3>{event.name}</h3>

                  <p>
                    📅 {event.date} &nbsp; | &nbsp; 📍 {event.venue}
                  </p>
                </div>

                <div className="row-actions">
                  <button
                    className="edit-btn"
                    onClick={() => editEvent(event)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "registrations" && (
        <section className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2>Registered Students</h2>
              <p>
                {registrations.length} total registrations
              </p>
            </div>

            <input
              className="registration-search"
              type="text"
              placeholder="Search registrations..."
              value={registrationSearch}
              onChange={(e) =>
                setRegistrationSearch(e.target.value)
              }
            />
          </div>

          <div className="registration-table-wrapper">
            <table className="registration-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College / Year</th>
                  <th>Phone</th>
                  <th>Event</th>
                </tr>
              </thead>

              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <tr key={registration.id}>
                      <td>{registration.name}</td>
                      <td>{registration.email}</td>
                      <td>{registration.collegeYear}</td>
                      <td>{registration.phone}</td>
                      <td>{registration.eventName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-table">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}

export default Admin;

