import { fromJS } from 'immutable';
import { AccountSelectors } from 'selectors/account';

describe('Selector: userIsAuthenticated', () => {
  const usernameSelector = AccountSelectors.userIsAuthenticated();
  it('should select userIsAuthenticated', () => {
    const userIsAuthenticated = true;
    const mockedState = fromJS({
      account: {
        userIsAuthenticated,
      },
    });
    expect(usernameSelector(mockedState)).toEqual(userIsAuthenticated);
  });
});
