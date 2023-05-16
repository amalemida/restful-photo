const mysql    = require("mysql2/promise");
const bdConfig = require('./bdconfig.js');

async function getConexao ()
{
    if (global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    try
    {
        const conexao = await mysql.createConnection (bdConfig);
        global.conexao = conexao;
        return conexao;
    }
    catch (erro)
    {
        return null;
    }
}

async function estrutureSe ()
{
    const conexao = await getConexao ();
    if (conexao==undefined) return null;

    const sql = 'CREATE TABLE IF NOT EXISTS fotos (codigo TINYINT UNSIGNED, nome VARCHAR(60) NOT NULL, preco FLOAT NOT NULL, PRIMARY KEY (codigo))';
    
    try
    {
        await conexao.query (sql);
        return true;
    }
    catch (erro)
    {
        return false;
    }
}

module.exports = {getConexao, estrutureSe}
