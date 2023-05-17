const Fotos     = require ('./fotos.js');
const Foto      = require ('./foto.js');
const Comunicado = require ('./comunicado.js');


// para a rota de CREATE
async function inclusao (req, res)
{
    if (Object.values(req.body).length!=5 || !req.body.ra || !req.body.longi || !req.body.lat || !req.body.data || !req.body.imagem )
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informaçães esperadas de um foto (ra, longi, lat, data e imagem)').object;
        return res.status(422).json(erro);
    } 
    
    let foto;
    try
    {
        foto = Foto.novo (req.body.ra,req.body.longi,req.body.lat,req.body.data,req.body.imagem );
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Id e ra devem ser um numero natural positivo, longi e lat devem ser um número espaciais').object;
        return res.status(422).json(erro);
    }

    const ret = await Fotos.inclua(foto);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('LJE','Foto já existe','Já há foto cadastrada com o código informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','O foto foi incluído com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=5 || !req.body.ra || !req.body.longi || !req.body.lat || !req.body.data || !req.body.imagem)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de uma foto (ra atual, novo longi e novo lat)').object;
        return res.status(422).json(erro);
    }
    
    let foto;
    try
    {
        foto = Foto.novo (req.body.ra, req.body.longi, req.body.lat, req.body.data, req.body.imagem );
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo, longi deve ser um texto não vazio e lat deve ser um número real positivo').object;
        return res.status(422).json(erro);
    }

    const ra = req.params.ra;
    
    if (ra!=foto.ra)
    {
        const erro = Comunicado.novo('TMC','Mudança de código','Tentativa de mudar o código do foto').object;
        return res.status(400).json(erro);    
    }
    
    let ret = await Fotos.recupereUm(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','Foto inexistente','Não há foto cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Fotos.atualize(foto);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','O foto foi atualizado com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de DELETE
async function remocao (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }
    
    const id = req.params.id;
    let ret = await Fotos.recupereUm(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','Foto inexistente','Não há foto cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Fotos.remova(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','O foto foi removido com sucesso').object;
        return res.status(200).json(sucesso);
  //}    
}

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const id = req.params.id;

    const ret = await Fotos.recupereUm(id);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','Foto inexistente','Não há foto cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ret = await Fotos.recupereTodos();

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}