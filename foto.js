class Foto {
    #ra
    #lat
    #lon
    #img

    constructor(ra, lat, lon, img) {
        this.ra = ra;
        this.lat = lat;
        this.lon = lon;
        this.img = img;
    }

    get ra() {
        return this.#ra
    }

    get lon() {
        return this.#lon
    }

    get lat() {
        return this.#lat
    }

    get img() {
        return this.#img
    }

    set ra(ra) {
        if (ra === undefined || typeof ra !== 'number' || isNaN(ra) || ra !== parseInt(ra) || ra <= 0)
            throw ('RA inválido');

        this.#ra = ra;
    }

    set lat(lat) {
        if (lat === undefined || typeof lat !== 'string' || lat === "")
            throw ('latitude inválida');

        this.#lat = lat;
    }

    set lon(lon) {
        if (lon === undefined || typeof lon !== 'string' || lon === "")
            throw ('longitute inválida');

        this.#lon = lon;
    }

    set img(img) {
        if (img === undefined || typeof img !== 'string' || img === "")
            throw ('Imagem inválida');

        this.#img = img;
    }
}

function novo(ra, lat, lon, img) {
    return new Foto(ra, lat, lon, img);
}

module.exports = { novo }
