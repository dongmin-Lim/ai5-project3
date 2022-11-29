import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userService {
  static async addUser({ nickname, email, password, checkPassword }) {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const errorMessage = '사용중인 이메일입니다.';
      return { errorMessage };
    }

    // if (password !== checkPassword) {
    //   const errorMessage = '비밀번호가 일치하지 않습니다.';
    //   return errorMessage;
    // }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db에 저장
    const createdNewUser = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });
    createdNewUser.errorMessage = null;

    // return createdNewUser;
    return `Successfully create a user account`;
  }

  // 비밀번호 어떻게 감추지??
  static async users() {
    const users = await User.findAll();
    return users;
  }

  static async getUser({ userId }) {
    const user = await User.findOne({ where: { userId: userId } });

    if (!user) {
      const errorMessage = '가입내역이 없습니다.';
      return { errorMessage };
    }
    // return user;
    return {
      id: user.id,
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.profileImg,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      errorMessage: user.errorMessage,
    };
  }

  static async setUser({ userId, nickname, password }) {
    const user = await User.findOne({ where: { userId: userId } });

    if (!user) {
      const errorMessage = `Cannot find information`;
      return { errorMessage };
    }
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );
    // const hashedPassword = await bcrypt.hash(password, 10);
    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const updateUser = await User.update(
      { nickname },
      {
        where: {
          userId: user.userId,
        },
      },
    );

    return {
      id: user.id,
      userId: user.userId,
      email: user.email,
      nickname: nickname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  static async updateImage({ profileImg, userId }) {
    const user = await User.findOne({ where: { userId: userId } });
    await User.update(
      { profileImg: profileImg },
      {
        where: {
          userId: user.userId,
        },
      },
    );
    return;
  }
  static async findUserId({ userId }) {
    const user = await User.findOne({ where: { userId: userId } });
    return {
      id: user.id,
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.profileImg,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
export { userService };
