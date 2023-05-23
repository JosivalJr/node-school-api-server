const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Josival',
          last_name: 'Oliveira',
          email: 'josival.oliveira@Teste.com',
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Paola',
          last_name: 'Machado',
          email: 'paola.machado@Teste.com',
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'Pedro',
          last_name: 'Cabral',
          email: 'pedro.cabral@Teste.com',
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: 'João',
          last_name: 'Silva',
          email: 'joao.silva@Teste.com',
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },
};
