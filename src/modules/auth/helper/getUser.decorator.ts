import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // This is bearer returning
    const request = ctx.switchToHttp().getRequest();
    const { email } = request;
    console.log(request);
    return data ? email?.[data] : email;
  },
);
