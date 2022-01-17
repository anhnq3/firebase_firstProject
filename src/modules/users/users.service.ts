import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/config/db.config';

@Injectable()
export class UsersService {
  usersRef = db.collection('users');

  async getAllUsers() {
    const getUsers = await this.usersRef.get();
    const usersDoc = getUsers.docs;
    const usresData = usersDoc.map((data) => data.data());
    return usresData;
  }

  async getUserByEmail(email: string) {
    const findEmail = this.usersRef.where('email', '==', email);
    const getUsersHaveThisEmail: any = await findEmail.get();
    if (getUsersHaveThisEmail._size !== 0)
      return getUsersHaveThisEmail.docs.map((data) => data.data())[0];
    else return 'none';
  }
}
