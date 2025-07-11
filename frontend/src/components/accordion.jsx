export default function Accordion() {
    return (
        <section id="FAQ" className="p-5">
        <div className="container">
            <h2 className="text-center mb-4">FAQ</h2>
            <div className="accordion accordion-flush" id="questions">
            {/* Item 1 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-one"
                >
                    1. Come posso registrarmi al sito?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-one">
                <div className="accordion-body">
                    Puoi registrarti cliccando su "Registrati" in alto a destra e compilando il modulo con i tuoi dati.
                </div>
                </div>
            </div>
            {/* Item 2 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-two"
                >
                    2. Come posso trovare eventi nella mia città?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-two">
                <div className="accordion-body">
                    Utilizza la barra di ricerca o il menu "Località" per filtrare gli eventi in base alla città di tuo interesse.
                </div>
                </div>
            </div>
            {/* Item 3 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-three"
                >
                    3. Come salvo i miei eventi preferiti?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-three">
                <div className="accordion-body">
                    Clicca sull’icona a forma di cuore accanto all’evento per aggiungerlo ai tuoi preferiti. Puoi visualizzare tutti i tuoi preferiti nella sezione "Favorites".
                </div>
                </div>
            </div>
            {/* Item 4 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-four"
                >
                   4. Come posso creare un evento?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-four">
                <div className="accordion-body">
                    Se sei un’organizzazione, dopo aver effettuato l’accesso vai nella sezione "Dashboard" e clicca su "Crea nuovo evento".
                </div>
                </div>
            </div>
            {/* Item 5 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-five"
                >
                   5. Posso modificare o cancellare un evento che ho creato?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-five">
                <div className="accordion-body">
                    Se sei un’organizzazione, dopo aver effettuato l’accesso vai nella sezione "Dashboard" e clicca su "Crea nuovo evento".
                </div>
                </div>
            </div>
            {/* Item 6 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-six"
                >
                   6. Come posso contattare l’organizzatore di un evento
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-six">
                <div className="accordion-body">
                    Nella pagina dell’evento troverai i dettagli di contatto dell’organizzatore.                </div>
                </div>
            </div>
            {/* Item 7 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-seven"
                >
                   7. È possibile ricevere notifiche sugli eventi?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-seven">
                <div className="accordion-body">
                    Sì, puoi iscriverti alla nostra newsletter per ricevere aggiornamenti sugli eventi più interessanti.
                </div>
                </div>
            </div>
            {/* Item 8 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-eight"
                >
                   8. Il sito è gratuito?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-eight">
                <div className="accordion-body">
                    La registrazione e la maggior parte delle funzionalità sono gratuite. Alcuni eventi potrebbero essere a pagamento, secondo le condizioni dell’organizzatore.                </div>
                </div>
            </div>
            {/* Item 9 */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-nine"
                >
                   9. Come posso segnalare un problema o un abuso?
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-nine">
                <div className="accordion-body">
                    Può scrivere una mail all’assistenza indicata nel footer del sito.
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}