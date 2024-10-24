import request from '@/utils/request';

export const listAllEnums = (): any => {
  return request.get('/apiOps/feedback/listAllEnums');
};

export const parse = (data: any): any => {
  return request.post('/api/aigc/parse', data);
};
