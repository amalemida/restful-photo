const bd = require ('./bd');

async function inclua (foto)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = 'INSERT INTO fotos (ra,lat,lon,img) VALUES (?,?,?,?)';
        const dados   = [foto.ra,foto.lat,foto.lon,foto.img];
        await conexao.query (sql, dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function atualize (foto)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'UPDATE fotos SET ra=?,lon=?,lat=?,img=? WHERE id=?';
        const dados = [foto.ra,foto.lon,foto.lat,foto.img,foto.id];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
    
async function remova (id)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'DELETE FROM fotos WHERE id=?';
        const dados = [id];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereUm (ra)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM fotos WHERE ra=?';
        const  dados   = [ra];
        const [linhas] = await conexao.execute(sql,dados);
        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM fotos';
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos}



