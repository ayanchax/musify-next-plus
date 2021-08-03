import React from 'react'

function Footer({ footer }) {
    return (
        <div className="footer">
            {footer ? (<div>{footer}</div>) : "#सुनलो | 2021"}
        </div>
    )
}

export default Footer
