import { router } from 'src/router';
import { IndexPage } from '.';
import { toEditor } from 'src/pages/editor/route';
import { useEffect } from 'react'; // 导入 useEffect

// 定义跳转逻辑组件
const AutoRedirect = () => {
  // 在组件加载时跳转
  useEffect(() => {
    toEditor({ params: { key: 'developer-concise-2' } }); // 跳转到编辑器页面，传递参数
  }, []);

  return null; // 页面内容无需渲染
};

// 自动跳转逻辑
export const indexRoute = {
  path: '/',
  element: <AutoRedirect />
};

export function toIndex() {
  router.navigate('/');
}