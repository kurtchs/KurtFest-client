import React from 'react';

function NotFoundPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",  alignItems: "center ", padding: '50px' }}>

            <h1 style={{ color: '#a40e0e' }}>¡Página no encontrada !</h1>
            <img src="https://res.cloudinary.com/dtetqhpqr/image/upload/v1743955320/pikachu_error_yld2vy.jpg" alt="Pikachu" style={{ display: "flex", flexDirection: "column", justifyContent: "center",  alignItems: "center", width:200  }} />
            
        </div>
    );
}
export default NotFoundPage;