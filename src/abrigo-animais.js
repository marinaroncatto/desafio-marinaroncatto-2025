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

    const pessoa1Briquedos = brinquedosPessoa1.split(',').map(x => x.trim().toUpperCase());
    const pessoa2Briquedos = brinquedosPessoa2.split(',').map(x => x.trim().toUpperCase());
    const ordemBichinhos = ordemAnimais.split(',').map(x => x.trim().toUpperCase());    
    
    const p1Verific = this.validarBrinquedos(pessoa1Briquedos);
    const p2Verific = this.validarBrinquedos(pessoa2Briquedos);
    const ordemVerific = this.validarAnimais(ordemBichinhos);

    if(p1Verific == false || p2Verific == false){ 
         return { erro: 'Brinquedo inválido'};
  }
    if(ordemVerific == false){ 
        return { erro: 'Animal inválido'};
  }

  //return provisório
  return { pessoa1: pessoa1Briquedos, pessoa2: pessoa2Briquedos, ordem: ordemBichinhos };
}


  validarBrinquedos(pessoaBriquedos){   
    const brinquedosValidos = new Set();
    for (const animal of Object.values(AbrigoAnimais.animaisDoAbrigo)) {
      animal.brinquedos.forEach(b => brinquedosValidos.add(b));
    }
    
    for (let brinquedo of pessoaBriquedos) {
      if (!brinquedosValidos.has(brinquedo)) {
        return false;
      }
    }
    const setPessoaBrinquedos = new Set(pessoaBriquedos);
    if (setPessoaBrinquedos.size !== pessoaBriquedos.length) {
      return false;
    }

    return true;
  }


  validarAnimais(ordemBichinhos){
    for(let animal of ordemBichinhos){
      if(!Object.keys(AbrigoAnimais.animaisDoAbrigo).includes(animal)){
        return false;
      }
    }
    const set = new Set(ordemBichinhos);
    if(set.size !== ordemBichinhos.length){
      return false;
  }
    return true;
  }

  
} //fim da classe

    
export { AbrigoAnimais as AbrigoAnimais };
