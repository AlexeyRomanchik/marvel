
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e15e2a709e9b6865533173c2d91af693';

    getResource = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not get ${url}, status ${response.status}`);
        }

        return await response.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService