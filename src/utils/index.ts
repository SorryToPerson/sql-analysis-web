import jsCookie from 'js-cookie';
import type { GetProp, UploadProps } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const isLogined = () => {
  // 目前发现过 token存在，id不存在
  return !!(jsCookie.get('user_token') && jsCookie.get('user_id'));
};

export function getBiz() {
  const localKey = '__BIZ__';
  const biz = new URLSearchParams(location.search).get('biz') || sessionStorage.getItem(localKey);
  if (biz) {
    sessionStorage.setItem(localKey, biz);
  }
  return biz;
}

export const flatRoutes = (routeList: any[]) => {
  const arr: any = [];
  const flatFn = (list: any[]) => {
    list.forEach((item) => {
      const { children, ...rest } = item;
      arr.push(rest);
      if (children) {
        flatFn(children);
      }
    });
  };
  flatFn(routeList);
  return arr;
};

export const commonDownload = async (apiUrl: string, exportName: string) => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = exportName;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
