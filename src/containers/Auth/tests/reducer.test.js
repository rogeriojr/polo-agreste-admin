import { fromJS } from 'immutable';
import accountReducer, { Creators } from 'store/ducks/account';

describe('accountReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      user: {
        name: 'John Smith',
        email: 'demo@test.com',
      },
      userIsAuthenticated: true,
      loadingAuth: false,
      errorAuth: '',
    });
  });

  it('returns the initial state', () => {
    expect(accountReducer(undefined, {})).toEqual(state);
  });

  it('should handle the requestSignOut action correctly', () => {
    const expectedResult = state
      .set('userIsAuthenticated', false)
      .set('user', {})
      .set('errorAuth', '');
    expect(accountReducer(state, Creators.requestSignOut())).toEqual(
      expectedResult,
    );
  });

  it('should handle the requestAuthFailure action correctly', () => {
    const message = 'Erro ao entrar';
    const expectedResult = state.set('errorAuth', message);
    expect(
      accountReducer(state, Creators.requestAuthFailure({ message })),
    ).toEqual(expectedResult);
  });
});
