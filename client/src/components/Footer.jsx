import React from 'react';
import  './Footer.css';
import portafolio from "../Imagenes/portafolio.jpg";

function Footer() {
    let fecha = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="site_footer">
                <div className="copyright">
                    <p>
                    Página creda por Nancy || PI Henry
                    </p>
                </div>
                <div className="redes_sociales">
                    <a href="https://www.linkedin.com/in/nancy-clavijo-varela-29353117a/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="linkedin" />
                    </a>
                    <a href="https://github.com/Nancyclavijo27" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github" />
                    </a>
                    <a href="https://personal-portafolio-delta.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <img src={portafolio} alt="portafolio" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer