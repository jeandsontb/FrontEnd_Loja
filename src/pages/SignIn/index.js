import React, { useState } from 'react';
import { PageArea } from './styled';

import { doLogin } from '../../helpers/AuthHandler';
import useApi from '../../helpers/OlxAPI';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {

    const api = useApi();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rememberPassword, setRememberPassword ] = useState(false);
    const [ disable, setDisable ] = useState(false);
    const [ error, setError ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setError('');

        const json = await api.login(email, password);

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = "/";
        }

        setDisable(false);
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }

                <form onSubmit={handleSubmit} >
                    <label className="area">
                        <div className="area--title" >E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disable} 
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disable} 
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Lembrar Senha</div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disable} 
                                value={rememberPassword}
                                onChange={ () => setRememberPassword(!rememberPassword) }
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" ></div>
                        <div className="area--input">
                            <button disabled={disable} >Login</button>
                        </div>
                    </label>
                </form> 
            </PageArea>
        </PageContainer>
    );
}


export default Page;