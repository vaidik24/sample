import { useState, useEffect } from "react";
import "./App1.css";

function App1() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [timer, setTimer] = useState(20);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Timer expired, reset form and timer
      setFormData({ name: "", email: "" });
      setIsSubmitted(false);
      setTimer(null);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    setIsSubmitted(true);
    // Simulating form submission with a timeout
    setTimeout(() => {
      alert("Form submitted successfully!");
    }, 1000); // Simulating a delay of 1 second
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      {timer > 0 && (
        <form onSubmit={handleSubmit}>
          <h2>Enter your Shipping information</h2>
          <label>
            <input
              placeholder="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder="Contact"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder="Shipping Address"
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
      {timer !== null && timer <= 0 && (
        <div className="timeout-section">
          <h3>Timeout</h3>
          <button className="refresh-button" onClick={handleRefresh}>
            x
          </button>
          <h3>Cart has timed out. Please try again.</h3>
        </div>
      )}
      {timer > 0 && (
        <div>
          <h3>Time Remaining:</h3>
          <p>
            You have {Math.floor(timer / 60)} minutes,{" "}
            {timer % 60 < 10 ? "0" : ""}
            {timer % 60} seconds before confirming the order.
          </p>
        </div>
      )}
      {isSubmitted && timer !== null && <p>Form submitted successfully!</p>}
    </div>
  );
}

export default App1;
