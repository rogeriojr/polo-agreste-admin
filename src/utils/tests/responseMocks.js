import Immutable from 'seamless-immutable';

const responseToSelectMock = Immutable({
  status: 'OK',
  msg: 'Consulta Realizada com Sucesso',
  total: 6,
  data: [
    {
      id: 1,
      order_position: 99999,
      slug: 'ofertas',
      name: 'Ofertas',
      description: 'Comidas em Geral',
      image: {
        original:
          'https://dytq4ps40ffnq.cloudfront.net/images/categories/b17ad2cc-a765-11e9-a2a3-2a2ae2dbcce4/original/bg-doctor.jpg',
        small:
          'https://dytq4ps40ffnq.cloudfront.net/images/categories/b17ad2cc-a765-11e9-a2a3-2a2ae2dbcce4/small/bg-doctor.jpg',
        medium:
          'https://dytq4ps40ffnq.cloudfront.net/images/categories/b17ad2cc-a765-11e9-a2a3-2a2ae2dbcce4/medium/bg-doctor.jpg',
        large:
          'https://dytq4ps40ffnq.cloudfront.net/images/categories/b17ad2cc-a765-11e9-a2a3-2a2ae2dbcce4/large/bg-doctor.jpg',
      },
      status: 1,
      category_father: {},
      category_child: [
        {
          id: 6,
          name: 'legumes',
        },
      ],
    },
    {
      id: 2,
      order_position: 99999,
      slug: 'carnes',
      name: 'Carnes',
      description: 'Teste 1',
      image: {
        original: 'https://dytq4ps40ffnq.cloudfront.net/',
        small: 'https://dytq4ps40ffnq.cloudfront.net/',
        medium: 'https://dytq4ps40ffnq.cloudfront.net/',
        large: 'https://dytq4ps40ffnq.cloudfront.net/',
      },
      status: 1,
      category_father: {},
      category_child: [
        {
          id: 4,
          name: 'Bovino',
        },
      ],
    },
  ],
});

export { responseToSelectMock };
