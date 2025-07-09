import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { reset_password } from "../auth";
import { connect } from "react-redux";



const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    });


    const onSubmit = (e) => {
        e.preventDefault();

        reset_password(formData.email);
        setRequestSent(true);
    };

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    if (requestSent) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div className='container mt-5'>
            <h1>Request Password</h1>
            <form onSubmit={e => onSubmit(e)} className="form-group">
                <div>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange = {e => onChange(e)}
                        required
                        //onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Request Password Reset</button>
            </form>
        </div>
    );

} 


export default ResetPassword;


//export default connect(null, { passwordReset })(ResetPassword);