import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsNotEmpty()
	@IsEmail()
	email: string

	@MinLength(6, { message: 'Password should be at least 6 characters long' })
	@IsString()
	password: string
}
