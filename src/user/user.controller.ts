import { UserService } from './user.service';
import {
  Controller,
  Get,
  Patch,
  Res,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { userInfoDto } from './dto/userInfo.dto';
import { Response } from 'express';
import {
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
} from 'src/helpers/swagger.helper';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/user')
@ApiTags('User')
@ApiSecurity('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: `Note: firstName and lastName properties should be null when user login first time, You can update it with API: <b>api/v1/user/profile/updateName</b>`,
  })
  @ApiOkResponse({
    status: 200,
    description: 'User basic info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'User info sent successfully.',
        userBasicInfo: {
          email: 'John@example.com',
          firstName: 'John OR null',
          lastName: 'Doe OR null',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Get('profile')
  getUserBasicInfo(@Res({ passthrough: true }) res: Response): object {
    const accessToken: any = res.locals;
    return this.userService.getUserBasicInfo(accessToken);
  }

  @ApiOkResponse({
    status: 200,
    description: 'User basic info.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'User updated successfully.',
        userInfo: {
          email: 'John@example.com',
          firstName: 'John OR null',
          lastName: 'Doe OR null',
        },
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @Patch('profile/updateName')
  @UsePipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory() {
        throw new BadRequestException({
          success: false,
          statusCode: 400,
          message: 'Bad request',
        });
      },
    }),
  )
  updateNameForLoggedInUser(
    @Res({ passthrough: true }) res: Response,
    @Body() body: userInfoDto,
  ) {
    const accessToken: any = res.locals;
    return this.userService.updateNameForLoggedInUser(body, accessToken);
  }
}
