const jwt = require("jsonwebtoken");

let verificar = function verificarJwt(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ mensagem: "Não existe Token!" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (erro, decodificado) => {
    if (erro) {
      return res.status(401).json({ mensagem: "Token Inválido!", erro: erro });
    } else {
      req.user = decodificado;
      // req.userId = decodificado.id;
      next();
    }
  });
};

module.exports = verificar;
