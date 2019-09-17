import { validateBr } from 'js-brasil';

const validators = {
  numberNotRequired: msg => [
    'numberNotRequired',
    msg,
    val => (val ? String(val).match(/^([\d]+)?$/g) : true),
  ],
  cpfInvalid: msg => [
    'cpf',
    msg,
    val => {
      if (val === undefined) return true;
      if (val === '') return true;
      if (val === '___.___.___-__') return true;
      return validateBr.cpf(val);
    },
  ],
};

export default validators;
