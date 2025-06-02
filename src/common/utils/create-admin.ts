// // scripts/create-admin.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../../app.module';
// import { UserRole } from '../../modules/user/user.entity';
// import { UserService } from '../../modules/user/user.service';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const userService = app.get(UserService);

//   const admin = await userService.create({
//     name: 'Admin User',
//     email: 'admin@admin.com',
//     role: UserRole.USER,
//   });
//   await app.close();
// }

// bootstrap();
