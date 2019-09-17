import { responseToSelect } from 'utils/response';
import { responseToSelectMock } from 'utils/tests/responseMocks';

const { data } = responseToSelectMock;

const respostaConvertida = [
  {
    value: data[0].id,
    label: data[0].name,
  },
  {
    value: data[1].id,
    label: data[1].name,
  },
];

describe('testa função para converter para select', () => {
  test('Deve ser uma função', () => {
    expect(typeof responseToSelect).toBe('function');
  });

  test('Deve ser uma função', () => {
    expect(responseToSelect(data)).toEqual(respostaConvertida);
  });

  // test('1 parametro: objeto', () => {

  // });

  // test('1 parametro: string', () => {

  // });
});
