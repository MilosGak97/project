import { createParamDecorator } from "@nestjs/common";
import { Admin } from "../../../entities/admin.entity";

export const GetAdminUser = createParamDecorator((data, ctx): Admin => {
    const req = ctx.switchToHttp().getRequest();
    return req.AdminUser;
})