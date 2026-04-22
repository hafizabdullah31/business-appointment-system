import app from './app';
import { env } from './config/env.config';
import { sequelize } from './config/sequelize.config';
import './models/sequelize';

async function bootstrap() {
  try {
    await sequelize.authenticate();
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

bootstrap();
