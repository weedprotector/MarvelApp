import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charSearch.scss'



const CharSearch = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();
        getCharByName(name)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const results = !char ? null : char.length > 0 ? 
                    <div className='char-search__wrapper'>
                        <div className='char-search__success'>There is! Visit {char[0].name} page?</div>
                        <Link to={`/MarvelApp/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className='char-search__error'>
                        The character was not found. Check the name and try again
                    </div>

    return (
        <div className='char-search'>
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required(<div className='char-search__error'>This field is required</div>)
                })}
                onSubmit={({charName}) => {
                    updateChar(charName);
                }}
            >  
                <Form onChange={e => !e.target.value ? setChar(null) : null}>
                    <label className='char-search__tittle' htmlFor="charName">Or find a character by name:</label>
                    <Field 
                        className='char-search__input'
                        name="charName"
                        type="text"
                        placeholder='Enter name'/>
                    
                    <button className="button button__main"
                            type="submit"
                            disabled={loading}>
                        <div className="inner">FIND</div>
                    </button>
                    <FormikErrorMessage 
                        component="div"
                        name="charName"
                        />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div> 
    )
}

export default CharSearch