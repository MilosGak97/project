import { createParamDecorator, ExecutionContext } from "@nestjs/common"; 
import { Admin } from "src/api/entities/admin.entity";

export const GetAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Admin => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; // Extracting the admin from req.user
  }
);
