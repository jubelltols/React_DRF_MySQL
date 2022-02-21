import React from 'react'

export default function SpinnerLoading () {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <div className="spinner-border" role="status" id="loading">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}