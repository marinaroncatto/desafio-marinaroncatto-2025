import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar input inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('12354', 'RATO,BOLA', 'Loco');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

   test('Deve rejeitar animal inválido por repetição', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Loco,Loco');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'PATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido por repetição', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve impedir mais de três animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'LASER,RATO,BOLA,CAIXA,SKATE,NOVELO', 'Bebe,Rex,Bola,Loco');

      expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
      expect(resultado.lista[1]).toBe('Bola - pessoa 2');
      expect(resultado.lista[2]).toBe('Loco - abrigo');
      expect(resultado.lista[3]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

   test('Deve conter todos os brinquedos do Gato para adotá-lo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'RATO,LASER', 'Mimi,Rex');
      expect(resultado.lista[0]).toBe('Mimi - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

   test('Deve rejeitar brinquedos fora da ordem para gato e cachorro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,BOLA,RATO', 'LASER,BOLA', 'Mimi,Rex');
      expect(resultado.lista[0]).toBe('Mimi - abrigo');
      expect(resultado.lista[1]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

   test('Deve impedir que gatos dividam brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,BOLA,RATO', 'RATO,BOLA,LASER', 'Mimi,Zero');
      expect(resultado.lista[0]).toBe('Mimi - pessoa 2');
      expect(resultado.lista[1]).toBe('Zero - abrigo');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve habilitar pessoa para adotar Jabuti se ela tiver outro animal (para pessoa 1)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Loco');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Loco - pessoa 1');
      expect(resultado.lista[2]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(3);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve habilitar pessoa para adotar Jabuti se ela tiver outro animal (para pessoa 2)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,NOVELO', 'SKATE,RATO,BOLA', 'Rex,Fofo,Loco');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Loco - pessoa 2');
      expect(resultado.lista[2]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(3);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve impedir que jabuti seja adotado por pessoa sem outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'RATO,NOVELO', 'Fofo,Loco');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Loco - abrigo');      
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve aceitar brinquedos fora da ordem para jabuti', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE', 'RATO,NOVELO', 'Fofo,Loco');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Loco - abrigo');      
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  }); 

  test('Deve deixar jabuti no abrigo caso existam duas pessoas aptas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'CAIXA,RATO,NOVELO,SKATE', 'Rex,Bola,Loco');
      expect(resultado.lista[0]).toBe('Bola - pessoa 2');
      expect(resultado.lista[1]).toBe('Loco - abrigo');
      expect(resultado.lista[2]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(3);
      expect(resultado.erro).toBeFalsy();
  });

});
