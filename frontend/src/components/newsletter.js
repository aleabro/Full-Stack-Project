export default function Newsletter() {
    return(
        <section className="bg-primary text-light py-2">
        <div className="container">
            <div className="d-md-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <h5 className="mb-2 mb-md-0 fs-6">Sign Up For Our Newsletter</h5>
            <div className="input-group input-group-sm news-input w-100 w-md-auto">
                <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required=""
                />
                <button className="btn btn-dark" type="submit">
                Send
                </button>
            </div>
            </div>
        </div>
        </section>

    );
}