import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    checkHealth(): string {
        return 'OK';  // You can also return more detailed health status
    }
}
