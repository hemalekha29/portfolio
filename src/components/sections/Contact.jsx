import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useExperience } from "../../hooks/useExperience";
import { socialLinks, contactSocialIds, iconSocialIds } from "../../data/socialLinks";
import {
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
  FiMail,
} from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { emailjsConfig } from "../../config/emailjs";
import "../../styles/Contact.css";

const contacts = socialLinks
  .filter((link) => contactSocialIds.includes(link.id))
  .map((link) => ({
    icon: link.icon,
    label: link.label,
    value: link.handle,
    href: link.href,
    color: link.color,
    note: link.note,
  }));

const socials = socialLinks
  .filter((link) => iconSocialIds.includes(link.id))
  .map((link) => ({
    icon: link.icon,
    label: link.label,
    href: link.href,
    color: link.color,
  }));

export default function Contact() {
  const { label } = useExperience();
  const formRef = useRef(null);
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | invalid
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.from_name.trim()) next.from_name = "Please enter your name.";
    if (!form.from_email.trim()) next.from_email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.from_email.trim()))
      next.from_email = "That email address doesn't look valid.";
    if (!form.message.trim()) next.message = "Please add a message.";
    else if (form.message.trim().length < 10)
      next.message = "Please write a little more — at least 10 characters.";
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear the field's error as soon as the user starts fixing it.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey,
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
        <SectionHeader
          tag="// hire_me()"
          title="Get In Touch"
          subtitle="Open to new opportunities, freelance work, or just a chat — drop a message and I'll get back to you."
        />

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
                I'm a MERN Stack Developer with {label} building
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
                    className={`form-group ${focused === "name" ? "focused" : ""} ${errors.from_name ? "has-error" : ""}`}
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
                      aria-invalid={!!errors.from_name}
                      aria-describedby={errors.from_name ? "err-from_name" : undefined}
                      required
                    />
                    {errors.from_name && (
                      <span className="field-error" id="err-from_name">{errors.from_name}</span>
                    )}
                  </div>
                  <div
                    className={`form-group ${focused === "email" ? "focused" : ""} ${errors.from_email ? "has-error" : ""}`}
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
                      aria-invalid={!!errors.from_email}
                      aria-describedby={errors.from_email ? "err-from_email" : undefined}
                      required
                    />
                    {errors.from_email && (
                      <span className="field-error" id="err-from_email">{errors.from_email}</span>
                    )}
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
                  className={`form-group ${focused === "message" ? "focused" : ""} ${errors.message ? "has-error" : ""}`}
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
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    required
                  />
                  {errors.message && (
                    <span className="field-error" id="err-message">{errors.message}</span>
                  )}
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
                {status === "invalid" && Object.keys(errors).length > 0 && (
                  <div className="form-status error" role="alert">
                    <FiAlertCircle /> Please fix the highlighted fields before sending.
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
