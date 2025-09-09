class AbrigoAnimais {

  static MAX_PET_PESSOA = 3;

  static animaisDoAbrigo = {
    REX: { tipo: 'CAO', brinquedos: ['RATO', 'BOLA'] },
    MIMI: { tipo: 'GATO', brinquedos: ['BOLA', 'LASER'] },
    FOFO: { tipo: 'GATO', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    ZERO: { tipo: 'GATO', brinquedos: ['RATO', 'BOLA'] },
    BOLA: { tipo: 'CAO', brinquedos: ['CAIXA', 'NOVELO'] },
    BEBE: { tipo: 'CAO', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    LOCO: { tipo: 'JABUTI', brinquedos: ['SKATE', 'RATO'] }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1Brinquedos = this.tratarEntrada(brinquedosPessoa1);
    const pessoa2Brinquedos = this.tratarEntrada(brinquedosPessoa2);
    const ordemBichinhos = this.tratarEntrada(ordemAnimais);

    if (!this.validarBrinquedos(pessoa1Brinquedos) || !this.validarBrinquedos(pessoa2Brinquedos)) 
      return { erro: 'Brinquedo inválido' };
    
    if (!this.validarAnimais(ordemBichinhos)) 
      return { erro: 'Animal inválido' };
        
    let adotadosP1 = [];
    let adotadosP2 = [];
    let brinquedosReservados = [];
    let resultadoParcial = {};
    let filaJabutis = [];

    for (let nome of ordemBichinhos) {
      let animal = AbrigoAnimais.animaisDoAbrigo[nome];

      if (animal.tipo === 'JABUTI') {
        // Testa o jabuti no final
        filaJabutis.push(nome);
        continue;
      }

      // Validar cães e gatos

      let aprovadoP1 = this.testaSequencia(animal, pessoa1Brinquedos);
      let aprovadoP2 = this.testaSequencia(animal, pessoa2Brinquedos);

      let dono = 'abrigo';

      // Caso empate
      if (aprovadoP1 && aprovadoP2)
        dono = 'abrigo';

      // Caso pessoa 1
      else if (aprovadoP1 && adotadosP1.length < AbrigoAnimais.MAX_PET_PESSOA) {
        if (this.validarGato(animal, brinquedosReservados)) {
          dono = 'pessoa 1';
          adotadosP1.push(nome);
        }
      }
      // Caso pessoa 2
      else if (aprovadoP2 && adotadosP2.length < AbrigoAnimais.MAX_PET_PESSOA) {
        if (this.validarGato(animal, brinquedosReservados)) {
          dono = 'pessoa 2';
          adotadosP2.push(nome);
        }
      }

      resultadoParcial[nome] = dono;
    } 

    // Validar jabutis
    for (let nome of filaJabutis) {
      let animal = AbrigoAnimais.animaisDoAbrigo[nome];

      let aprovadoP1 = this.testaSequencia(animal, pessoa1Brinquedos);
      let aprovadoP2 = this.testaSequencia(animal, pessoa2Brinquedos);

      let dono = this.validarJabuti(aprovadoP1, aprovadoP2, adotadosP1, adotadosP2);

      if (dono === 'pessoa 1')
        adotadosP1.push(nome);
      else if (dono === 'pessoa 2')
        adotadosP2.push(nome);

      resultadoParcial[nome] = dono;
    }

    // Lista final
    let listaFinal = Object.entries(resultadoParcial)
      .map(([animal, dono]) => `${this.formatarNome(animal)} - ${dono}`)
      .sort();

    return { lista: listaFinal };
  }

  // ===== Funções auxiliares =====

   tratarEntrada(inputUsuario) {
    return inputUsuario.split(',').map(x => x.trim().toUpperCase());
  }

  validarBrinquedos(pessoaBrinquedos) {
    const brinquedosValidos = new Set();
    for (const animal of Object.values(AbrigoAnimais.animaisDoAbrigo)) {
      animal.brinquedos.forEach(b => brinquedosValidos.add(b));
    }

    for (let brinquedo of pessoaBrinquedos) {
      if (!brinquedosValidos.has(brinquedo))
        return false;
    }
    const setPessoaBrinquedos = new Set(pessoaBrinquedos);
    if (setPessoaBrinquedos.size !== pessoaBrinquedos.length)
      return false;

    return true;
  }

  validarAnimais(ordemBichinhos) {
    const animaisValidos = new Set(Object.keys(AbrigoAnimais.animaisDoAbrigo));
    //verifica se todos os animais são válidos
    for (let animal of ordemBichinhos) {
      if (!animaisValidos.has(animal)) 
        return false;
    }
    //verifica se não há repetição
    return new Set(ordemBichinhos).size === ordemBichinhos.length;
  }

  testaSequencia(animal, brinquedosPessoa) {
    
    if (animal.tipo === 'JABUTI') {
      // ordem não importa para o jabuti
      const setBrinquedos = new Set(brinquedosPessoa);
      return animal.brinquedos.every(b => setBrinquedos.has(b));
    }
    // ordem importa
    const filtrados = brinquedosPessoa.filter(b => animal.brinquedos.includes(b));
    return filtrados.join(',') === animal.brinquedos.join(',');

  }

  validarGato(animal, brinquedosReservados) {
    if (animal.tipo === 'GATO') {
      if (brinquedosReservados.some(b => animal.brinquedos.includes(b)))
        return false; // gato não divide brinquedos
      else {
        brinquedosReservados.push(...animal.brinquedos);
        return true;
      }
    }
    return true;
  }

  validarJabuti(aprovadoP1, aprovadoP2, adotadosP1, adotadosP2) {

    const p1Ok = aprovadoP1 && adotadosP1.length > 0 && adotadosP1.length < AbrigoAnimais.MAX_PET_PESSOA;
    const p2Ok = aprovadoP2 && adotadosP2.length > 0 && adotadosP2.length < AbrigoAnimais.MAX_PET_PESSOA;

    if (p1Ok && p2Ok) // regra de empate
      return 'abrigo';   
    if (p1Ok)
      return 'pessoa 1';
    if (p2Ok)
      return 'pessoa 2';

    return 'abrigo'; // caso nenhum anterior atenda aos critérios
  }

  formatarNome(nome) {
  return nome.charAt(0) + nome.slice(1).toLowerCase();
}

} //fim da classe


export { AbrigoAnimais as AbrigoAnimais };
