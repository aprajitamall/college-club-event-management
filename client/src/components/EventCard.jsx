function EventCard({ event, onRegister }) {
  return (
    <div className="event-card">
      <div className="event-card-top">
        <span className="category-badge">{event.category}</span>
      </div>

      <h3>{event.name}</h3>

      <div className="event-info">
        <p>📅 {event.date}</p>
        <p>🕐 {event.time}</p>
        <p>📍 {event.venue}</p>
      </div>

      <p className="event-description">
        {event.description}
      </p>

      <button
        className="register-btn"
        onClick={() => onRegister(event)}
      >
        Register Now →
      </button>
    </div>
  );
}

export default EventCard;