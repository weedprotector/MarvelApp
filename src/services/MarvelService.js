import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f1f2a9b41071a1fd264206d5790f7cf5';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
        
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.length > 100 ? char.description.slice(0, 100) + '...' : char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There's no description",
            pageCount: comics.pageCount ? comics.pageCount + ' p.' : 'No information about the number of pages',
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            url: comics.urls[0].url,
            language: comics.textObjects.language || 'en-us'
        }
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    return {loading, error, getAllCharacters, getCharacter, getCharByName, getAllComics, getComic, clearError}


   
}

export default useMarvelService;