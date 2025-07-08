
//TODO: change the footer text
export default function Footer() {
    return (
        <footer className="footer p-5 text-white text-center position-relative">
            <div className="container">
                {/* Footer Sections */}
                <div className="row">
                {/* Left Column: Social Media and Website Name */}
                <div className="col-md-4 mb-4">
                    {/* Social Media Icons */}
                    <div className="mb-3">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        className="text-white me-3"
                    >
                        <i className="bi bi-facebook fs-4" />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        className="text-white me-3"
                    >
                        <i className="bi bi-instagram fs-4" />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        className="text-white me-3"
                    >
                        <i className="bi bi-twitter fs-4" />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        className="text-white me-3"
                    >
                        <i className="bi bi-linkedin fs-4" />
                    </a>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        className="text-white"
                    >
                        <i className="bi bi-youtube fs-4" />
                    </a>
                    </div>
                    {/* Website Name */}
                    <p className="lead">Events Website</p>
                </div>
                {/* Right Column: Information Sections */}
                <div className="col-md-8 mb-4">
                    <div className="row">
                    {/* About Section */}
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <p>Vuoi sapere quali sono gli ultimi eventi?</p>
                    </div>
                    {/* Categories Section */}
                    <div className="col-md-3">
                        <h5>Categories</h5>
                        <ul className="list-unstyled">
                        <li>Music</li>
                        <li>Sports</li>
                        <li>Conferences</li>
                        <li>Workshops</li>
                        </ul>
                    </div>
                    {/* Support Section */}
                    <div className="col-md-3">
                        <h5>Support</h5>
                        <ul className="list-unstyled">
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                        </ul>
                    </div>
                    {/* Recent Events Section */}
                    <div className="col-md-3">
                        <h5>Recent Events</h5>
                        <ul className="list-unstyled">
                        <li>Summer Music Festival</li>
                        <li>Tech Conference 2025</li>
                        <li>Charity Sports Event</li>
                        <li>Photography Workshop</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
                {/* Copyright */}
                <p className="mb-0">Copyright © 2025 Events Website</p>
                {/* Scroll to Top */}
                <a href="#" className="position-absolute bottom-0 end-0 p-4 text-white">
                <i className="bi bi-arrow-up-circle-fill fs-3" />
                </a>
            </div>
            </footer>
    );
}