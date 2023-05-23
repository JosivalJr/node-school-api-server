module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'students',
      [
        {
          first_name: 'Paulo',
          last_name: 'Santos',
          email: 'paulo.santos@Teste.com',
          age: 24,
          weight: 76,
          height: 181,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'José',
          last_name: 'Souza',
          email: 'jose.souza@Teste.com',
          age: 40,
          weight: 70,
          height: 162,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Mateus',
          last_name: 'Fortunato',
          email: 'mateus.fortunato@Teste.com',
          age: 22,
          weight: 55,
          height: 178,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'leticia',
          last_name: 'dutra',
          email: 'Nestor.Brasileiro@Teste.com',
          age: 25,
          weight: 70,
          height: 172,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },
};
