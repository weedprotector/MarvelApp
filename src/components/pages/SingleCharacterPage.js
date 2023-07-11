import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [characterId])

    const updateComic = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setCharacter(character);
    }

    const errorMessage = error ? <ErrorMessege/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {title, description, thumbnail} = character

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" style={{width: '293px', height: '293px'}}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;