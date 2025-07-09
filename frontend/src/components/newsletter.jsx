import { useState } from "react";

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

  return (
  <section className="bg-primary text-light py-4">
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 bg-primary">
            <div className="card-body bg-primary text-light rounded-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
                  <i className="bi bi-envelope-paper-heart-fill fs-3 text-warning"></i>
                  <span className="fs-5 fw-bold">Newsletter eventi</span>
                </div>
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
                      className="btn btn-success fw-bold px-4"
                      type="button"
                      onClick={() => onSubscribe(user.email)}
                    >
                      <i className="bi bi-check-circle-fill me-1"></i> Iscriviti ora
                    </button>
                  )
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success fs-6 py-2 px-3">
                      <i className="bi bi-check2-circle me-1"></i> Sei già iscritto!
                    </span>
                    <button
                      className="btn btn-outline-light btn-sm ms-2 btn-danger"
                      onClick={() => onUnsubscribe(user?.email)}
                      type="button"
                    >
                      <i className="bi bi-x-circle me-1"></i> Disiscriviti
                    </button>
                  </div>
                )}
              </div>
              {newsletterMessage && (
                <div className="alert alert-success mt-3 mb-0 text-center fw-semibold shadow-sm">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  {newsletterMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}