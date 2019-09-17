/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { getAuthRequest } from 'store/sagas/account';
import { Creators } from 'store/ducks/account';

describe('Account Saga', () => {
  it('Autentica um usuario com email e senha', () => {
    const payload = { email: 'demo@test.com', password: 'demo' };
    const response = { user: { name: 'John Smith', email: 'demo@test.com' } };
    const req = getAuthRequest({ payload });
    expect(req.next().value).toEqual(
      put(Creators.requestAuthSuccess(response)),
    );
  });
});
