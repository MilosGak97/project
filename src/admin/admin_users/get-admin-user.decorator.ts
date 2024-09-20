import { createParamDecorator } from "@nestjs/common";
import { AdminUser } from "./admin_user.entity";

export const GetAdminUser = createParamDecorator((data, ctx): AdminUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.AdminUser;
})