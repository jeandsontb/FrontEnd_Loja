import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled';

import { isLoged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {

    let loged = isLoged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container" >
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {loged &&
                            <>
                                <li>
                                    <Link to="/my-account" >Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} >Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-and-add" className="button" >Poste um Anúncio</Link>
                                </li>
                            </>
                        }
                        {!loged &&
                            <>  
                                <li>
                                    <Link to="/signin" >Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" >Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to="/singin" className="button" >Poste um Anúncio</Link>
                                </li>
                            </>
                        }                        
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;