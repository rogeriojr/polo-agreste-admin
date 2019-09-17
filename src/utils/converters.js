import Immutable from 'seamless-immutable';

const toPrice = val =>
  Number(val)
    .toFixed(2)
    .replace('.', ',');

const toMutable = data => {
  return Immutable.asMutable(data, { deep: true });
};

const formatCityName = cityData => {
  return cityData.map(cityInfo => {
    return {
      id: cityInfo.id,
      name: `${cityInfo.name} - ${cityInfo.state.name}`,
    };
  });
};

export { toMutable, toPrice, formatCityName };
