import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SkuModule } from './sku/sku.module';
import { ConfigModule } from '@nestjs/config';
import { NccModule } from './ncc/ncc.module';
import { NhomlvModule } from './nhomlv/nhomlv.module';
import { Lv1Module } from './lv1/lv1.module';
import { Lv2Module } from './lv2/lv2.module';

@Module({
  imports: [UserModule, AuthModule, SkuModule, NccModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    NhomlvModule,
    Lv1Module,
    Lv2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
