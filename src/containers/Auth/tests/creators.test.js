import { Creators, Types } from 'store/ducks/account';
// import { DEFAULT_ACTION } from '../constants';

describe('Auth Creators', () => {
  describe('Autenticacao do usuario', () => {
    it('Inicia a autenticacao do usuario com email e senha', () => {
      const { email, password } = { email: 'email@email.com', password: 'asd' };
      const expected = {
        type: Types.REQUEST_AUTH,
        payload: { email, password },
      };
      expect(Creators.requestAuth({ email, password })).toEqual(expected);
    });
    it('Acao para quando houver sucesso na autenticacao do usuario', () => {
      const user = {
        name: 'Welington',
      };
      const expected = {
        type: Types.REQUEST_AUTH_SUCCESS,
        payload: { user },
      };
      expect(Creators.requestAuthSuccess({ user })).toEqual(expected);
    });
    it('Acao para quando falhar a autenticacao do usuario', () => {
      const { message } = { message: 'A autenticacao falhou' };
      const expected = {
        type: Types.REQUEST_AUTH_FAILURE,
        payload: { message },
      };
      expect(Creators.requestAuthFailure({ message })).toEqual(expected);
    });
  });
});
