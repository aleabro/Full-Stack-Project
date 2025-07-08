import { useState } from "react";

export default function NewsletterSection({
  isOrganization,
  isNewsletterSubscribed,
  newsletterMessage,
  onSubscribe,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email); // Funzione che gestisce l'invio
  };

  if (isOrganization) return null;

  return (
    <section className="bg-primary text-light py-2">
      <div className="container">
        <div className="d-md-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <h5 className="mb-2 mb-md-0 fs-6">Sign Up For Our Newsletter</h5>

          {!isNewsletterSubscribed ? (
            <form
              onSubmit={handleSubmit}
              className="input-group input-group-sm news-input w-100 w-md-auto"
            >
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-dark" type="submit">
                Send
              </button>
            </form>
          ) : (
            <div className="alert alert-info mt-2">
              Sei già iscritto alla newsletter!
            </div>
          )}
        </div>

        {newsletterMessage && (
          <div className="alert alert-success mt-2">
            {newsletterMessage}
          </div>
        )}
      </div>
    </section>
  );
}
