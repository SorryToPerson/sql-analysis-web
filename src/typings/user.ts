export interface User {
  username: string;
  id: string;
  email: string;
  companyId: string;
  companyName: string;
  departmentId: string;
  firstDepartmentName: string;
  userType: 'ZA' | 'ZATI' | 'WX';
  remark: string;
  gmtCreated: string;
}

export type TScope = 'gzh' | 'za' | 'zati';

export type TUserInfo = {
  companyId: number;
  companyName: string;
  departmentId: number;
  email: string;
  id: number;
  token: string;
  username: string;
  userType: string;
  /**
   * 公众号登录
   */
  nickname: string;
  /**
   * 公众号登录
   */
  openid: string;
};
