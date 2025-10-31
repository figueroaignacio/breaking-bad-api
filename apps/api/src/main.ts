// Nest
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Breaking Bad API')
    .setDescription('The Breaking Bad API - Characters, Episodes, Quotes and more')
    .setVersion('1.0')
    .addTag('characters', 'Character endpoints')
    .addTag('episodes', 'Episode endpoints')
    .addTag('quotes', 'Quote endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/openapi.json', (req, res) => {
    res.json(document);
  });

  app.use(
    '/docs',
    apiReference({
      theme: 'pruple',
      layout: 'modern',
      favicon: 'https://breakingbadapi.com/favicon.ico',
      title: 'Breaking Bad API Reference',
      servers: [{ description: 'Local API' }],
      meta: {
        description: 'Interactive API reference for Breaking Bad API',
      },
      url: '/openapi.json',
    }),
  );

  // Start server
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📘 Scalar docs available at: http://localhost:${port}/docs`);
  console.log(`🧪 Breaking Bad API ready to serve!`);
}

bootstrap();
