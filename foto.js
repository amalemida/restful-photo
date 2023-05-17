class Foto {
    #id
    #ra
    #longi
    #lat
    #data
    #imagem

    constructor(ra, longi, lat, data, imagem) {
        this.ra = ra;
        this.longi = longi;
        this.lat = lat;
        this.data = data;
        this.imagem = imagem;
    }

    get id() {
        return this.#id
    }

    get ra() {
        return this.#ra
    }

    get longi() {
        return this.#longi
    }

    get lat() {
        return this.#lat
    }

    get data() {
        return this.#data
    }

    get imagem() {
        return this.#imagem
    }

    set id(id) {
        if (id === undefined || typeof id !== 'number' || isNaN(id) || id <= 0)
            throw ('id inválido');

        this.#id = id;
    }

    set ra(ra) {
        if (ra === undefined || typeof ra !== 'number' || isNaN(ra) || ra !== parseInt(ra) || ra <= 0)
            throw ('RA inválido');

        this.#ra = ra;
    }

    set longi(longi) {
       /* if (longi === undefined || typeof longi !== 'geometry' || longi === "")
            throw ('longi inválido');*/

        this.#longi = longi;
    }

    set lat(lat) {
        /*if (lat === undefined || typeof lat !== 'geometry' || lat === "")
            throw ('lat inválido');*/

        this.#lat = lat;
    }

    set data(data) {
       /*if (data === undefined || typeof data !== 'string' || data === "")

            throw ('data inválido');*/

        this.#data = data;
    }

    set imagem(imagem) {
       /* if (imagem === undefined || typeof imagem !== 'longblob' || imagem === "")
            throw ('imagem inválido');*/

        this.#imagem = imagem;
    }
}

function novo(ra, longi, lat, data, imagem) {
    return new Foto(ra, longi, lat, data, imagem);
}

module.exports = { novo }
