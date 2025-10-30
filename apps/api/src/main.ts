import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    .setDescription(
      'The Breaking Bad API - Characters, Episodes, Quotes and more',
    )
    .setVersion('1.0')
    .addTag('characters', 'Character endpoints')
    .addTag('episodes', 'Episode endpoints')
    .addTag('quotes', 'Quote endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Breaking Bad API Docs',
    customfavIcon: 'https://breakingbadapi.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
  console.log(`🧪 Breaking Bad API ready to serve!`);
}

bootstrap();
