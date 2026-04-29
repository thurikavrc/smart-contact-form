import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ FEATURE 1 — Validation logic
  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation first
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://thurikavrc.app.n8n.cloud/webhook/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #eef2f7;
        }

        .page {
          min-height: 100vh;
          background: #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .blob1 {
          position: fixed;
          top: -80px;
          left: -80px;
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, rgba(100,210,180,0.25), rgba(60,130,220,0.15));
          border-radius: 50%;
          z-index: 0;
        }

        .blob2 {
          position: fixed;
          bottom: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, rgba(60,130,220,0.15), rgba(100,210,180,0.1));
          border-radius: 50%;
          z-index: 0;
        }

        .blob3 {
          position: fixed;
          top: 50%;
          left: 5%;
          width: 18px;
          height: 18px;
          background: #4caf92;
          border-radius: 50%;
          z-index: 0;
        }

        .blob4 {
          position: fixed;
          top: 30%;
          right: 3%;
          width: 28px;
          height: 28px;
          background: rgba(60,130,220,0.3);
          border-radius: 50%;
          z-index: 0;
        }

        .dots-left {
          position: fixed;
          top: 15%;
          left: 2%;
          display: grid;
          grid-template-columns: repeat(5, 8px);
          gap: 6px;
          z-index: 0;
        }

        .dots-right {
          position: fixed;
          top: 10%;
          right: 2%;
          display: grid;
          grid-template-columns: repeat(5, 8px);
          gap: 6px;
          z-index: 0;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: rgba(100, 150, 200, 0.3);
          border-radius: 50%;
        }

        .card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          width: 100%;
          max-width: 460px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .card-header {
          background: linear-gradient(135deg, #43c6a0 0%, #3a7bd5 100%);
          padding: 36px 40px 70px;
          text-align: center;
          color: white;
          position: relative;
        }

        .header-icon-wrap {
          width: 64px;
          height: 64px;
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 28px;
        }

        .card-header h1 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .card-header p {
          font-size: 14px;
          opacity: 0.9;
        }

        .wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
        }

        .card-body {
          padding: 28px 36px 36px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .input-label span {
          font-size: 16px;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          color: #2d3748;
          background: #f9fafb;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #43c6a0;
          background: white;
          box-shadow: 0 0 0 3px rgba(67, 198, 160, 0.15);
        }

        /* ✅ FEATURE 1 — Error border styling */
        .input-error {
          border-color: #e53e3e !important;
          background: #fff5f5 !important;
        }

        /* ✅ FEATURE 1 — Error message styling */
        .error-msg {
          color: #e53e3e;
          font-size: 12px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .input-group textarea {
          resize: none;
          height: 120px;
        }

        /* ✅ FEATURE 3 — Character counter styling */
        .char-counter {
          text-align: right;
          font-size: 12px;
          margin-top: 5px;
          color: #a0aec0;
        }

        .char-counter.warning {
          color: #e53e3e;
        }

        /* ✅ FEATURE 2 — Spinner styling */
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #43c6a0 0%, #3a7bd5 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(58, 123, 213, 0.35);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .status-msg {
          margin-top: 16px;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .status-success {
          background: #f0fff8;
          border: 1px solid #9ae6c4;
          color: #276749;
        }

        .status-error {
          background: #fff5f5;
          border: 1px solid #feb2b2;
          color: #c53030;
        }

        .status-icon {
          font-size: 18px;
          margin-top: 1px;
          flex-shrink: 0;
        }

        .status-text strong {
          display: block;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .status-text span {
          font-size: 13px;
          opacity: 0.85;
        }

        .footer-text {
          text-align: center;
          font-size: 12px;
          color: #a0aec0;
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        @media (max-width: 480px) {
          .card-header {
            padding: 28px 24px 60px;
          }
          .card-body {
            padding: 24px 24px 30px;
          }
          .card-header h1 {
            font-size: 22px;
          }
          .dots-left, .dots-right {
            display: none;
          }
        }
      `}</style>

      <div className="page">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <div className="blob3"></div>
        <div className="blob4"></div>

        <div className="dots-left">
          {Array(25).fill(0).map((_, i) => <div className="dot" key={i}></div>)}
        </div>
        <div className="dots-right">
          {Array(25).fill(0).map((_, i) => <div className="dot" key={i}></div>)}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="header-icon-wrap">✉️</div>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Send us a message!</p>
            <svg className="wave" viewBox="0 0 500 60" preserveAspectRatio="none">
              <path d="M0,30 C100,60 300,0 500,30 L500,60 L0,60 Z" fill="white"/>
            </svg>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              {/* Name Field */}
              <div className="input-group">
                <div className="input-label">
                  <span>👤</span> Your Name
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {/* ✅ FEATURE 1 — Show error */}
                {errors.name && <div className="error-msg">⚠️ {errors.name}</div>}
              </div>

              {/* Email Field */}
              <div className="input-group">
                <div className="input-label">
                  <span>✉️</span> Email Address
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {/* ✅ FEATURE 1 — Show error */}
                {errors.email && <div className="error-msg">⚠️ {errors.email}</div>}
              </div>

              {/* Message Field */}
              <div className="input-group">
                <div className="input-label">
                  <span>💬</span> Message
                </div>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "input-error" : ""}
                />
                {/* ✅ FEATURE 3 — Character counter */}
                <div className={`char-counter ${formData.message.length > 450 ? "warning" : ""}`}>
                  {formData.message.length} / 500 characters
                </div>
                {/* ✅ FEATURE 1 — Show error */}
                {errors.message && <div className="error-msg">⚠️ {errors.message}</div>}
              </div>

              {/* ✅ FEATURE 2 — Spinner in button */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>➤ Send Message</>
                )}
              </button>
            </form>

            {status === "success" && (
              <div className="status-msg status-success">
                <div className="status-icon">✅</div>
                <div className="status-text">
                  <strong>Message sent successfully!</strong>
                  <span>We will get back to you soon.</span>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="status-msg status-error">
                <div className="status-icon">❌</div>
                <div className="status-text">
                  <strong>Something went wrong!</strong>
                  <span>Please try again later.</span>
                </div>
              </div>
            )}

            <div className="footer-text">
              🔒 Your information is safe and secure
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;