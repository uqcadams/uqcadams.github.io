import React, { useState, memo } from 'react';

const Contact = memo(({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id={id}>
      <div className={`section-image-holder ${isExpanded ? 'section-image-holder-toggle' : ''}`}>
        <img src="/img/img7.jpg" className={`section-image ${isExpanded ? 'section-image-toggle' : ''}`} alt="Remove location image" />
      </div>

      <div className={`section-text ${isExpanded ? 'section-text-toggle' : ''}`}>
        <div className={`text-full ${isExpanded ? 'text-full-toggle' : ''}`}>
          <h2 className="text-heading">Contact</h2>
          <div className="text-full-description">
            <form action="#" className="contact-form">
              <p>If you'd like to get in touch, leave me a note and I'll get back to you as soon as possible.</p>
              <label htmlFor="first-name">First Name</label>
              <input type="text" name="first-name" id="first-name" placeholder="Enter your first name..." />

              <label htmlFor="last-name">Last Name</label>
              <input type="text" name="last-name" id="last-name" placeholder="Enter your last name..." />

              <label htmlFor="country">Country</label>
              <select name="country" id="country" defaultValue="australia">
                <option value="australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="5"></textarea>

              <label htmlFor="your-email">Your Email</label>
              <input type="text" name="your-email" id="your-email" placeholder="Enter your email address..." />

              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="text-btn">
            <a className="btn-link" onClick={toggleExpand}>Close</a>
          </div>
        </div>

        <div className={`text ${isExpanded ? 'text-blurb-toggle' : ''}`}>
          <h2 className="text-heading">CONTACT</h2>
          <div className="dividers">
            <div className="text-divider"></div>
          </div>
          <p className="text-blurb">Want to know more? Get in touch.</p>
          <div className="text-btn">
            <a className="btn-link" onClick={toggleExpand}>Learn More</a>
          </div>
        </div>
      </div>

      <div className={`section-title ${isExpanded ? 'section-title-toggle' : ''}`}>&lt; CONTACT &gt;</div>
    </section>
  );
});

export default Contact;
