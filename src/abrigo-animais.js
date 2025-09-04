class AbrigoAnimais {

  static animaisDoAbrigo ={
    REX: { tipo: 'CAO', brinquedos: ['RATO', 'BOLA'] },
    MIMI: { tipo: 'GATO', brinquedos: ['BOLA', 'LASER'] },
    FOFO: { tipo: 'GATO', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    ZERO: { tipo: 'GATO', brinquedos: ['RATO', 'BOLA'] },
    BOLA: { tipo: 'CAO', brinquedos: ['CAIXA', 'NOVELO'] },
    BEBE: { tipo: 'CAO', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    LOCO: { tipo: 'JABUTI', brinquedos: ['SKATE', 'RATO'] }  
    
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const pessoa1 = brinquedosPessoa1.split(',').map(x => x.trim().toUpperCase());
    const pessoa2 = brinquedosPessoa2.split(',').map(x => x.trim().toUpperCase());
    const ordemBichinhos = ordemAnimais.split(',').map(x => x.trim().toUpperCase());    

  }
}

export { AbrigoAnimais as AbrigoAnimais };
