import { data } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from './navbar'; // o il percorso corretto del tuo componente Navbar
// ...existing code...

export default function UtenteAuth() {
    const [username, aggiorna] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const aggiornaUtente = () => {
            const token = localStorage.getItem('access');
            if (!token) {
                aggiorna(null);
                return;
            }
            fetch('http://localhost:8000/api/profile/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => res.ok ? res.json() : null)
            .then(data => aggiorna(data ? data.username : null));
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

    /*return (
        <div>
            <h1>Benvenuto{username ? `, ${username}` : ''}!</h1>
            {/* <h1>Utente Autenticato</h1> */
/* {statoUtente && <p>Tipo di utente: {statoUtente}</p>} */ 
// </div>
//);*/
return (
    <div>
        <h1>{username ? ` ${username}` : ''}</h1>
    </div>
);
/*return (
        <Navbar
            searchText={searchText}
            setSearchText={setSearchText}
            username={username}
            //userType={userType}
        />
);*/
}
