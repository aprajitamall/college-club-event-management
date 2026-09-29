import { useState } from "react";

function RegistrationModal({ event, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    collegeYear: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            eventId: event.id,
            eventName: event.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSubmitted(true);
    } catch (error) {
      alert("Unable to register. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span>EVENT REGISTRATION</span>
              <h2>{event.name}</h2>
              <p>
                {event.date} • {event.time}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="collegeYear"
                placeholder="College / Year"
                value={form.collegeYear}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <button type="submit" className="submit-btn">
                Submit Registration
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>

            <h2>Registration Successful!</h2>

            <p>
              You are registered for <strong>{event.name}</strong>.
            </p>

            <button className="submit-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationModal;