import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; 
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {

    const api = useApi();
    const fileField = useRef();
    const history = useHistory();

    const [ categories, setCategories ] = useState([]);

    const [ title, setTitle ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ priceNegociable, setPriceNegociable ] = useState(false);
    const [ desc, setDesc ] = useState('');

    const [ disable, setDisable ] = useState(false);
    const [ error, setError ] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);
        setError('');
        
        let erros = [];

        if( !title.trim() ) {
            erros.push('Sem título');
        }

        if( !category ) {
            erros.push('Sem categoria');
        }

        if( erros.length === 0 ) {

            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegociable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current.files.length > 0) {
                for(let i=0; i<fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error ) {
                history.push(`/ad/${json.id}`);
                return;
            }else {
                setError(json.error);
            }

        } else {
            setError(erros.join("\n"));
        }

        setDisable(false);
    }


    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }

                <form onSubmit={handleSubmit} >
                    <label className="area">
                        <div className="area--title" >Título</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disable} 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disable}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option>Clique aqui para escolher</option>
                                {categories &&
                                    categories.map(i => 
                                        <option key={i._id} value={i._id} >{i.name}</option>        
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Preço</div>
                        <div className="area--input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disable || priceNegociable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                type="checkbox"
                                disable={disable}
                                checked={priceNegociable}
                                onChange={e => setPriceNegociable(!priceNegociable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Descrição</div>
                        <div className="area--input">
                            <textarea
                                disable={disable}
                                value={desc}
                                onChange={ e => setDesc(e.target.value) }
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" >Imagens</div>
                        <div className="area--input">
                            <input
                                type="file"
                                disable={disable}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title" ></div>
                        <div className="area--input">
                            <button disabled={disable} >Adicionar Anúncio</button>
                        </div>
                    </label>
                </form> 
            </PageArea>
        </PageContainer>
    );
}


export default Page;