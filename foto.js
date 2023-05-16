class Foto
{
    #id
    #ra
    #long
    #lat
    #data
    #imagem

    constructor (ra, long, lat, data, imagem)
    {
       // this.id=id;
        this.ra=ra;
        this.long=long;
        this.lat=lat;
        this.data=data;
        this.imagem=imagem;
    }

    get id ()
    {
        return this.#id
    }

    get ra ()
    {
        return this.#ra
    }

    get long ()
    {
        return this.#long
    }

    get lat ()
    {
        return this.#lat
    }

    get  data ()
        {
        return this.#data
    }

    get imagem ()
        {
            return this.#imagem
    }

    set id (id)
    {
        if (id===undefined || typeof id !== 'number' || isNaN(id) || id<=0)
            throw ('id inválido');

        this.#id = id;
    }

    set ra (ra)
    {
        if (ra===undefined || typeof ra !== 'number' || isNaN(ra) || ra!==parseInt(ra) || ra<=0)
            throw ('Código inválido');

        this.#ra = ra;
    }

    set long (long)
    {
        if (long===undefined || typeof long !== 'string' || long==="")
            throw ('long inválido');

        this.#long = long;
    }

    set lat (lat)
    {
        if (lat===undefined || typeof lat !== 'number' || isNaN(lat) || lat<=0)
            throw ('lat inválido');

        this.#lat = lat;
    }

    set data (data)
    {
        if (data===undefined || typeof data !== 'string' || data==="")
            throw ('data inválido');

        this.#data = data;
    }

    set imagem (imagem)
    {
        if (imagem===undefined || typeof imagem !== 'string' || imagem==="")
            throw ('imagem inválido');

        this.#imagem = imagem;
    }
}

function novo (ra,long,lat, data,imagem)
{
    return new foto (ra,long,lat,data,imagem);
}

    return new Foto (ra,long,lat,data,imagem);


module.exports = {novo}
