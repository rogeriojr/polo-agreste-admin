import Immutable from 'seamless-immutable';

const responseToSelect = data => {
  const options = data.map(item => ({ value: item.id, label: item.name }));
  return Immutable.asMutable(options);
};

export { responseToSelect };
