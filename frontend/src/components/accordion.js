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
                    Lorem ipsum dolor sit amet.
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-one">
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                    molestias iusto amet atque voluptates eius ratione tempore
                    recusandae, magni aperiam et quae animi est deserunt dolor minima ut
                    reiciendis blanditiis nam sit asperiores odio. Rem aperiam eos sed
                    enim illum fugit unde voluptas magni, minus eaque dolorum temporibus
                    eum hic.
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
                    Lorem ipsum dolor sit amet.
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-two">
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                    molestias iusto amet atque voluptates eius ratione tempore
                    recusandae, magni aperiam et quae animi est deserunt dolor minima ut
                    reiciendis blanditiis nam sit asperiores odio. Rem aperiam eos sed
                    enim illum fugit unde voluptas magni, minus eaque dolorum temporibus
                    eum hic.
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-three">
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                    molestias iusto amet atque voluptates eius ratione tempore
                    recusandae, magni aperiam et quae animi est deserunt dolor minima ut
                    reiciendis blanditiis nam sit asperiores odio. Rem aperiam eos sed
                    enim illum fugit unde voluptas magni, minus eaque dolorum temporibus
                    eum hic.
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
                    Lorem, ipsum dolor.
                </button>
                </h2>
                <div className="accordion-collapse collapse" id="question-four">
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                    molestias iusto amet atque voluptates eius ratione tempore
                    recusandae, magni aperiam et quae animi est deserunt dolor minima ut
                    reiciendis blanditiis nam sit asperiores odio. Rem aperiam eos sed
                    enim illum fugit unde voluptas magni, minus eaque dolorum temporibus
                    eum hic.
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}