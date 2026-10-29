function precoComDesconto(jogo, config) {
  if (!config || !config.blackFriday || !config.blackFriday.ativa) {
    return jogo.preco;
  }
  
  const promocao = config.blackFriday.promocoes ? config.blackFriday.promocoes[jogo.id] : null;
  
  // Se o jogo não tiver promoção cadastrada, devolve o preço normal sem dar erro
  if (!promocao) {
    return jogo.preco;
  }
  
  const desconto = promocao.percentual / 100;
  return Math.round(jogo.preco * (1 - desconto) * 100) / 100;
}