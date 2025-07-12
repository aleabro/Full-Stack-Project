import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div className="bg-white rounded shadow p-4 p-md-5 mx-auto" style={{ borderLeft: "6px solid #444" }}>
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-shield-lock-fill text-dark fs-1 me-3"></i>
          <div>
            <h1 className="mb-1 fw-bold text-dark">Privacy Policy</h1>
            <p className="text-muted mb-0">Ultimo aggiornamento: 9 luglio 2025</p>
          </div>
        </div>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-person-badge me-2 text-secondary"></i>1. Titolare del trattamento
          </h5>
          <div className="bg-light rounded p-3">
            <strong>Events Website</strong><br />
            Via Branze, 42 - Brescia<br />
            Email: <a href="mailto:weloveevents00@gmail.com">weloveevents00@gmail.com</a>
          </div>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-archive me-2 text-secondary"></i>2. Tipi di dati raccolti
          </h5>
          <ul>
            <li><b>Dati forniti dall’utente:</b> nome, email, password, dati di registrazione, preferenze eventi.</li>
            <li><b>Dati per newsletter:</b> email.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-bullseye me-2 text-secondary"></i>3. Finalità del trattamento
          </h5>
          <ul>
            <li>Registrazione e gestione dell’account utente.</li>
            <li>Gestione degli eventi e delle preferenze.</li>
            <li>Invio di newsletter (solo se hai dato il consenso).</li>
            <li>Risposta a richieste di supporto.</li>
            <li>Analisi statistiche anonime per migliorare il sito.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-journal-check me-2 text-secondary"></i>4. Base giuridica
          </h5>
          <ul>
            <li>Esecuzione di un contratto (registrazione, gestione eventi).</li>
            <li>Consenso (newsletter).</li>
            <li>Interesse legittimo (sicurezza, miglioramento servizi).</li>
          </ul>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-gear me-2 text-secondary"></i>5. Modalità del trattamento
          </h5>
          <div className="bg-light rounded p-3">
            I dati sono trattati con strumenti informatici e misure di sicurezza adeguate.
          </div>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-clock-history me-2 text-secondary"></i>6. Conservazione dei dati
          </h5>
          <div className="bg-light rounded p-3">
            I dati sono conservati per il tempo necessario alle finalità indicate o fino a richiesta di cancellazione.
          </div>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-share me-2 text-secondary"></i>7. Comunicazione e diffusione
          </h5>
          <div className="bg-light rounded p-3">
            I dati non saranno diffusi. Potranno essere comunicati a fornitori tecnici (hosting, newsletter) solo per finalità tecniche.
          </div>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-unlock me-2 text-secondary"></i>8. Diritti dell’utente
          </h5>
          <ul>
            <li>Accedere, rettificare o cancellare i tuoi dati;</li>
            <li>Opporti al trattamento o chiederne la limitazione;</li>
            <li>Richiedere la portabilità dei dati;</li>
            <li>Revocare il consenso in qualsiasi momento.</li>
          </ul>
          <div className="alert alert-secondary mt-3" role="alert">
            Per esercitare i tuoi diritti scrivi a: <a href="mailto:weloveevents00@gmail.com">weloveevents00@gmail.com</a>
          </div>
        </section>

        <section className="mb-4">
          <h5 className="mt-4" style={{ color: "#444" }}>
            <i className="bi bi-pencil-square me-2 text-secondary"></i>9. Modifiche
          </h5>
          <div className="bg-light rounded p-3">
            La presente informativa può essere aggiornata. Le modifiche saranno pubblicate su questa pagina.
          </div>
        </section>
      </div>
    </div>
  );
}