import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import * as firebase from 'firebase';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';

@Injectable()
export class AuthService {
  async getUserByEmail(email: string) {
    const userRecord = await getAuth().getUserByEmail(email);

    const customToken = await getAuth().createCustomToken(userRecord.uid);
    return { data: userRecord, Token: customToken };
  }

  async createUser(createUserAuthDto: CreateUserAuthDto) {
    const { email, password } = createUserAuthDto;
    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
    });

    const customToken = await getAuth().createCustomToken(userRecord.uid);

    return { email: email, token: customToken };
  }

  async login(loginUserAuthDto: LoginUserAuthDto) {
    const { email, password } = loginUserAuthDto;
    const login = firebase.auth().signInWithEmailAndPassword(email, password);
    return login;
  }

  async deleteUserById(uid: string) {
    const deleteUser = await getAuth().deleteUser(uid);
    return deleteUser;
  }

  async updateUserById(uid: string, updateUserAuthDto: UpdateUserAuthDto) {
    const updateUser = await getAuth().updateUser(uid, {
      ...updateUserAuthDto,
    });
    return updateUser;
  }

  async getMe(idToken: string) {
    const verify = getAuth().verifyIdToken(idToken);
    return verify;
  }
}
