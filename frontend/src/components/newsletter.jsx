import { useState } from "react";
import "../styles/Newsletter.css";

export default function Newsletter({
  user,
  isOrganization,
  isNewsletterSubscribed,
  newsletterMessage,
  onSubscribe,
  onUnsubscribe,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email); // Funzione che gestisce l'invio
  };

  if (isOrganization) return null;
  
console.log("isNewsletterSubscribed:", isNewsletterSubscribed);
console.log("newsletterMessage:", newsletterMessage);

  return (
<section className="newsletter py-2">
      <div className="container">
        <div className="d-md-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <h5 className="mb-2 mb-md-0 fs-6">Registrati alla nostra newsletter</h5>
                {!isNewsletterSubscribed ? (
                  !user ? (
                    <form
                      onSubmit={handleSubmit}
                      className="input-group input-group-sm news-input w-100 w-md-auto"
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Inserisci la tua email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="btn btn-warning fw-bold" type="submit">
                        <i className="bi bi-send-fill me-1"></i> Iscriviti
                      </button>
                    </form>
                  ) : (
                    <button
                      className="btn btn-success fw-bold btn-sm px-4"
                      type="button"
                      onClick={() => onSubscribe(user.email)}
                    >
                      <i className="bi bi-check-circle-fill me-1"></i> Iscriviti ora
                    </button>
                  )
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-success fw-bold btn-sm px-4" disabled>
                      <i className="bi bi-check2-circle me-1"></i> Sei già iscritto!
                    </button>
                    <button
                      className="btn btn-sm ms-2 btn-unsubscribe"
                      onClick={() => onUnsubscribe(user?.email)}
                      type="button"
                    >
                      <i className="bi bi-x-circle me-1"></i> Disiscriviti
                    </button>
                  </div>
                )}
              </div>
            </div>

  </section>
  );
}