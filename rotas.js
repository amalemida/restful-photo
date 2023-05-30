const Fotos     = require ('./fotos.js');
const Foto      = require ('./foto.js');
const Comunicado = require ('./comunicado.js');


// para a rota de CREATE
async function inclusao (req, res)
{
    if (Object.values(req.body).length!=4 || !req.body.ra || !req.body.lon || !req.body.lat || !req.body.img )
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidas exatamente as 4 informaçães esperadas de uma foto (ra, lon, lat e img)').object;
        return res.status(422).json(erro);
    } 
    
    let foto;
    try
    {
        foto = Foto.novo (req.body.ra,req.body.lat,req.body.lon,req.body.img );
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','RA deve ser um numero natural positivo, lat, lon e img devem ser uma string').object;
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
        const  erro = Comunicado.novo('FJE','Foto já existe','Já há foto cadastrada com o código informado').object;
        return res.status(409).json(erro);
    }

        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','A foto foi incluída com sucesso').object;
        return res.status(201).json(sucesso);
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=4 || !req.body.ra || !req.body.lat || !req.body.lon || !req.body.img)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidas exatamente as 4 informações esperadas de uma foto (ra novo, novo lon, nova lat e nova img)').object;
        return res.status(422).json(erro);
    }
    
    let foto;
    try
    {
        foto = Foto.novo (req.body.ra,req.body.lat,req.body.lon,req.body.img);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo, lon deve ser um texto não vazio e lat deve ser um número real positivo').object;
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

    if (ret.length===0)
    {
        const erro = Comunicado.novo('FNE','Foto inexistente','Não há foto cadastrada com o código informado').object;
        return res.status(404).json(erro);
    }

    foto.id = parseInt(id);

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

  if (ret===true)
  {
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','Atualização realizada com sucesso').object;

        return res.status(201).json(sucesso);
  }
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
        const erro = Comunicado.novo('FNE','Foto inexistente','Não há foto cadastrada com o código informado').object;
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

        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','A foto foi removida com sucesso').object;
        return res.status(200).json(sucesso);
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
        const erro = Comunicado.novo('FNE','Foto inexistente','Não há foto cadastrada com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}

async function recuperacaoPorRa (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ra = req.params.ra;

    const ret = await Fotos.recuperePorRa(ra);

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
        const erro = Comunicado.novo('FNE','Foto inexistente','Não há foto cadastrada com o código informado').object;
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

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos, recuperacaoPorRa}