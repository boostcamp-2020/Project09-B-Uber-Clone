// import Models from '../models';
import authenticateNotRequired from '../utils/authenticateNotRequired';

const context = ({ req, res }) => {
  const { operationName } = req.body;

  if (authenticateNotRequired.includes(operationName)) {
    res.set('Access-Control-Allow-Origin', process.env.CLIENT_HOST);
    return { res };
  }

  /**
   * // TODO: 로그인, 회원가입 외 일반 요청 시 존재하는 유저인지 확인
   * // 있다면 해당 user return, 없다면 오류 발생
   *
   * const cookie = req.signedCookies.userToken;
   *
   * // cookie decode
   *
   * const userSchema = Models.model('User');
   * const newUser = { 위에서 찾은 유저 정보 };
   * if (newUser) return { user: 찾은 유저 };
   * else 오류 전송
   */
};

export default context;
