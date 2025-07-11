import { data } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from './navbar'; // o il percorso corretto del tuo componente Navbar
// ...existing code...

export default function UtenteAuth() {
    const [username, aggiorna] = useState(null); //per l'utente

    const [organization, setOrganization] = useState(null); //per l'organizzazione

    const [organizationLogo, setOrganizationLogo] = useState(null); //per il logo dell'organizzazione



    //const [searchText, setSearchText] = useState('');


    //questo metodo si occupa di recuperare il token JWT e di fare una richiesta al backend per ottenere i dati dell'utente autenticato
    //se il token non è presente, aggiorna lo stato dell'utente a null
    useEffect(() => {
        const aggiornaUtente = () => {
            const token = localStorage.getItem('access');
            if (!token) {
                aggiorna(null);
                setOrganization(null);
                setOrganizationLogo(null);
                console.error('Token non trovato');
                return;
            }
            fetch('http://localhost:8000/api/profile/', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    aggiorna(data ? data.username : null);
                    setOrganization(data ? data.organization : null);
                    setOrganizationLogo(data?.organization_profile?.logo || null);
                });
        };

        aggiornaUtente();

        window.addEventListener('storage', aggiornaUtente);
        return () => window.removeEventListener('storage', aggiornaUtente);
    }, []);

    /*const [username, aggiorna] = useState(null);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        console.log("useEffect eseguito");
        const fetchUserType = async () => {
            const token = localStorage.getItem('access'); // o dove salvi il JWT
            if (!token) {
                console.error('Token non trovato');
                return;
            }
            const response = await fetch('http://localhost:8000/api/profile/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                aggiorna(data.username); // 'regular' o 'organization'
                console.log("Username:", data.username); // stampa il nome utente
            }else {
                console.error('Errore nella fetch:', response.status, await response.text());
            }
        };
        fetchUserType();
        
    }, []);*/
    //);*/

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 className="nome-utente" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {username ? ` ${username}` : ''}
                {organization ? ` - ${organization}` : ''}
            </h1>
            {/*{organizationLogo && (
                <img
                    src={organizationLogo} 
                    alt="Logo organizzazione"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            )}*/}
        </div>
    );

}
