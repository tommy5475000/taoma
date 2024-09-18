import React from 'react'

export default function Footer() {
    return (
        <div style={{
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "#f8f8f8",
            padding: "10px 0"
        }}>
            Ben Thanh TSC ©{new Date().getFullYear()} Created by IT department
        </div>
    )
}


// style={{ height: 550, width: '100%', justifyContent: 'center' }}