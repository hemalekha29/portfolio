import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import "../styles/Contact.css";

const EMAILJS_SERVICE_ID = "service_m1o63kl";
const EMAILJS_TEMPLATE_ID = "template_dnkxp01";
const EMAILJS_PUBLIC_KEY = "EoLGKDxwlpAM-1U-h";

const contacts = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "hemalekha4@gmail.com",
    href: "mailto:hemalekha4@gmail.com",
    color: "#00d4ff",
    note: "Typically replies within 24h",
  },
  {
    icon: <FiPhone />,
    label: "Phone",
    value: "+91 6374852487",
    href: "tel:+916374852487",
    color: "#7c3aed",
    note: "Mon – Sat, 9am – 6pm IST",
  },
  {
    icon: <FiMapPin />,
    label: "Location",
    value: "Coimbatore, India",
    href: null,
    color: "#f72585",
    note: "Open to remote work",
  },
];

const socials = [
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hema-lekha-s-91521825b",
    color: "#0077B5",
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    href: "https://github.com/hemalekha29",
    color: "#ffffff",
  },
  {
    icon: <FiMail />,
    label: "Email",
    href: "mailto:hemalekha4@gmail.com",
    color: "#ea4335",
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from_name || !form.from_email || !form.message) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// hire_me()</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
          <p
            className="contact-subtitle"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Open to new opportunities, freelance work, or just a chat.
            <br />
            Drop a message and I'll get back to you!
          </p>
        </div>

        <div className="contact-grid">
          {/* ─── Left Panel ─── */}
          <div className="contact-left" data-aos="fade-right">
            {/* Hire Me card */}
            <div className="hire-card glass-card">
              <div className="hire-pulse" />
              <span className="hire-tag">Available for work</span>
              <h3 className="hire-heading">
                Let's Build Something <span className="grad">Amazing</span>
              </h3>
              <p className="hire-text">
                I'm a MERN Stack Developer with 7 months of experience building
                scalable web apps. Ready to bring your idea to life.
              </p>
              <a
                href="mailto:hemalekha4@gmail.com"
                className="btn-primary hire-btn"
              >
                <FiMail /> Send an Email
              </a>
            </div>

            {/* Contact info */}
            <div className="contact-info-list">
              {contacts.map(({ icon, label, value, href, color, note }) => (
                <div key={label} className="contact-info-item glass-card">
                  <div
                    className="ci-icon"
                    style={{
                      color,
                      background: `color-mix(in srgb, ${color} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
                    }}
                  >
                    {icon}
                  </div>
                  <div className="ci-body">
                    <span className="ci-label">{label}</span>
                    {href ? (
                      <a href={href} className="ci-value" style={{ color }}>
                        {value}
                      </a>
                    ) : (
                      <span className="ci-value">{value}</span>
                    )}
                    <span className="ci-note">{note}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="contact-socials">
              {socials.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  style={{ "--clr": color }}
                  title={label}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ─── Right Panel: Form ─── */}
          <div className="contact-right" data-aos="fade-left">
            <div className="form-card glass-card">
              <div className="form-header">
                <span className="form-tag">// send_message()</span>
                <h3 className="form-title">Message Me</h3>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="form-row">
                  <div
                    className={`form-group ${focused === "name" ? "focused" : ""}`}
                  >
                    <label htmlFor="name">
                      <FiUser /> Your Name *
                    </label>
                    <input
                      id="name"
                      name="from_name"
                      type="text"
                      placeholder="John Doe"
                      value={form.from_name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                    />
                  </div>
                  <div
                    className={`form-group ${focused === "email" ? "focused" : ""}`}
                  >
                    <label htmlFor="email">
                      <FiMail /> Email Address *
                    </label>
                    <input
                      id="email"
                      name="from_email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.from_email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      required
                    />
                  </div>
                </div>

                <div
                  className={`form-group ${focused === "subject" ? "focused" : ""}`}
                >
                  <label htmlFor="subject">
                    <FiMessageSquare /> Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project collaboration, freelance, etc."
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                <div
                  className={`form-group ${focused === "message" ? "focused" : ""}`}
                >
                  <label htmlFor="message">
                    <FiMessageSquare /> Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity…"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <div className="form-status success">
                    <FiCheckCircle /> Message sent! I'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="form-status error">
                    <FiAlertCircle /> Something went wrong. Please try emailing
                    directly.
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn-primary submit-btn ${status === "sending" ? "sending" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="spinner" /> Sending…
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
