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

const formatBankName = bankData => {
  return bankData.map(bankInfo => {
    return {
      id: bankInfo.id,
      name: `${bankInfo.code} - ${bankInfo.name}`,
    };
  });
};

const formatPaymentType = paymentType => {
  const paymentTypeInt = Number(paymentType);
  if (paymentTypeInt === 1) {
    return 'Cartão';
  }
  if (paymentTypeInt === 2) {
    return 'Boleto';
  }
  return '';
};

const formatStoresName = stores => {
  const storesNames = [];
  stores.forEach(store => {
    storesNames.push(store.store.name);
  });
  return storesNames.join(', ');
};

export {
  toMutable,
  toPrice,
  formatCityName,
  formatBankName,
  formatPaymentType,
  formatStoresName,
};
