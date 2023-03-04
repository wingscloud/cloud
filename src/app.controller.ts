import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common'
import { BusinessException } from 'src/common/exceptions/business.exception'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('error')
  @Version([VERSION_NEUTRAL, '1'])
  getError(): string {
    const a: any = {}
    try {
      console.warn(a.b.c)
    }
    catch (error) {
      throw new BusinessException('你这个参数错了')
    }
    return ''
  }

  @Get()
  @Version('2')
  getHello2(): string {
    return this.appService.getHello2()
  }
}
