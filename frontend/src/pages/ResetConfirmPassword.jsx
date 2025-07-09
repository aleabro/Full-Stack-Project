import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password, passwordResetConfirm } from "../auth";


const ResetConfirmPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onSubmit = (e) => {
        e.preventDefault();

        const { uid, token } = useParams();

        passwordResetConfirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    if (requestSent) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)} className="form-group">
                <div>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Enter your new password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm your new password"
                        name="re_new_password"
                        value={formData.re_new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Password Reset</button>
            </form>
        </div>
    );

} 


export default ResetConfirmPassword;

//export default connect(null, { passwordResetConfirm })(ResetConfirmPassword);