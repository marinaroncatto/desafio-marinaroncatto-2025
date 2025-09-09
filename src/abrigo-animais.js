class AbrigoAnimais {

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
    const pessoa1Briquedos = brinquedosPessoa1.split(',').map(x => x.trim().toUpperCase());
    const pessoa2Briquedos = brinquedosPessoa2.split(',').map(x => x.trim().toUpperCase());
    const ordemBichinhos = ordemAnimais.split(',').map(x => x.trim().toUpperCase());

    const p1Verific = this.validarBrinquedos(pessoa1Briquedos);
    const p2Verific = this.validarBrinquedos(pessoa2Briquedos);
    const ordemVerific = this.validarAnimais(ordemBichinhos);

    if (!p1Verific || !p2Verific) 
      return { erro: 'Brinquedo inválido' };
    
    if (!ordemVerific) 
      return { erro: 'Animal inválido' };
    

    let adotadosP1 = [];
    let adotadosP2 = [];
    let brinquedosReservados = [];
    let resultadoParcial = {};
    let filaJabutis = [];

    for (let nome of ordemBichinhos) {
      let animal = AbrigoAnimais.animaisDoAbrigo[nome];

      if (animal.tipo === 'JABUTI') {
        // deixa para o final
        filaJabutis.push(nome);
        continue;
      }

      let aprovadoP1 = this.testaSequencia(animal, pessoa1Briquedos);
      let aprovadoP2 = this.testaSequencia(animal, pessoa2Briquedos);

      let dono = 'abrigo';

      // 1. empate
      if (aprovadoP1 && aprovadoP2)
        dono = 'abrigo';

      // 2. pessoa 1
      else if (aprovadoP1 && adotadosP1.length < 3) {
        if (this.validarGato(animal, brinquedosReservados)) {
          dono = 'pessoa 1';
          adotadosP1.push(nome);
        }
      }
      // 3. pessoa 2
      else if (aprovadoP2 && adotadosP2.length < 3) {
        if (this.validarGato(animal, brinquedosReservados)) {
          dono = 'pessoa 2';
          adotadosP2.push(nome);
        }
      }

      resultadoParcial[nome] = dono;
    } 

    // agora processa os jabutis
    for (let nome of filaJabutis) {
      let animal = AbrigoAnimais.animaisDoAbrigo[nome];

      let aprovadoP1 = this.testaSequencia(animal, pessoa1Briquedos);
      let aprovadoP2 = this.testaSequencia(animal, pessoa2Briquedos);

      let dono = this.validarJabuti(animal, aprovadoP1, aprovadoP2, adotadosP1, adotadosP2);

      if (dono === 'pessoa 1')
        adotadosP1.push(nome);
      else if (dono === 'pessoa 2')
        adotadosP2.push(nome);

      resultadoParcial[nome] = dono;
    }

    // lista final
    let listaFinal = Object.entries(resultadoParcial)
      .map(([animal, dono]) => `${animal[0] + animal.slice(1).toLowerCase()} - ${dono}`)
      .sort();

    return { lista: listaFinal };
  }

  // ===== Funções auxiliares =====

  validarBrinquedos(pessoaBriquedos) {
    const brinquedosValidos = new Set();
    for (const animal of Object.values(AbrigoAnimais.animaisDoAbrigo)) {
      animal.brinquedos.forEach(b => brinquedosValidos.add(b));
    }

    for (let brinquedo of pessoaBriquedos) {
      if (!brinquedosValidos.has(brinquedo))
        return false;
    }
    const setPessoaBrinquedos = new Set(pessoaBriquedos);
    if (setPessoaBrinquedos.size !== pessoaBriquedos.length)
      return false;

    return true;
  }

  validarAnimais(ordemBichinhos) {
    for (let animal of ordemBichinhos) {
      if (!Object.keys(AbrigoAnimais.animaisDoAbrigo).includes(animal))
        return false;
    }
    const set = new Set(ordemBichinhos);
    if (set.size !== ordemBichinhos.length)
      return false;

    return true;
  }

  validarGato(animal, brinquedosReservados) {
    if (animal.tipo === 'GATO') {
      if (brinquedosReservados.some(b => animal.brinquedos.includes(b)))
        return false;
      else {
        brinquedosReservados.push(...animal.brinquedos);
        return true;
      }
    }
    return true;
  }

  validarJabuti(animal, aprovadoP1, aprovadoP2, adotadosP1, adotadosP2) {

    const p1Ok = aprovadoP1 && adotadosP1.length > 0 && adotadosP1.length < 3;
    const p2Ok = aprovadoP2 && adotadosP2.length > 0 && adotadosP2.length < 3;

    if (p1Ok && p2Ok) // regra de empate
      return 'abrigo';   
    if (p1Ok)
      return 'pessoa 1';
    if (p2Ok)
      return 'pessoa 2';

    return 'abrigo'; // caso nenhum anterior atenda aos critérios
  }

  testaSequencia(animal, brinquedosPessoa) {
    if (animal.tipo === 'JABUTI') {
      // ordem não importa para o jabuti
      return animal.brinquedos.every(b => brinquedosPessoa.includes(b));
    }
    // ordem importa
    const filtrados = brinquedosPessoa.filter(b => animal.brinquedos.includes(b));
    return filtrados.join(',') === animal.brinquedos.join(',');

  }

} //fim da classe


export { AbrigoAnimais as AbrigoAnimais };
