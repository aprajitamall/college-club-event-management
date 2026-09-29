import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import RegistrationModal from "../components/RegistrationModal";

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-label">
            COLLEGE CLUB EVENT MANAGEMENT
          </div>

          <h1>
            Discover. Connect.
            <br />
            <span>Experience Campus.</span>
          </h1>

          <p>
            Your one-stop platform to discover exciting college
            events, connect with communities and make your campus
            experience unforgettable.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events →
            </Link>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-one">
            <span>🎤</span>
            <div>
              <strong>Live Events</strong>
              <small>Happening on campus</small>
            </div>
          </div>

          <div className="circle-main">
            <span>✦</span>
          </div>

          <div className="floating-card card-two">
            <span>✓</span>
            <div>
              <strong>Easy Registration</strong>
              <small>Join in seconds</small>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>{events.length}+</strong>
          <span>Upcoming Events</span>
        </div>

        <div>
          <strong>10+</strong>
          <span>Club Categories</span>
        </div>

        <div>
          <strong>500+</strong>
          <span>Students Connected</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Event Access</span>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-heading">
          <div>
            <span className="section-label">WHAT'S HAPPENING</span>
            <h2>Upcoming Events</h2>
          </div>

          <Link to="/events" className="view-all">
            View All Events →
          </Link>
        </div>

        <div className="events-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={setSelectedEvent}
            />
          ))}
        </div>
      </section>

      <section className="feature-section">
        <div>
          <span className="section-label">WHY CAMPUSCONNECT?</span>

          <h2>
            Everything you need to
            <br />
            <span>experience more.</span>
          </h2>

          <p>
            From technical workshops to cultural celebrations,
            discover opportunities that match your interests and
            connect with people who share your passion.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-box">
            <span>01</span>
            <h3>Discover</h3>
            <p>
              Find events across technical, cultural, sports and
              innovation clubs.
            </p>
          </div>

          <div className="feature-box">
            <span>02</span>
            <h3>Register</h3>
            <p>
              Secure your spot with a simple and quick registration
              process.
            </p>
          </div>

          <div className="feature-box">
            <span>03</span>
            <h3>Connect</h3>
            <p>
              Meet students and become part of the campus community.
            </p>
          </div>
        </div>
      </section>

      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

export default Home;