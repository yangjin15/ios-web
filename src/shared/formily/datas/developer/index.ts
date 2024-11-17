import { DataForm } from './form'

const DEFAULT_DATA = {
  name: '小灰灰',
  gender: '男',
  age: '25岁',
  city: '深圳',
  phoneNumber: '18888888888',
  email: '1162275271@qq.com',
  education: {
    schoolName: '霍格沃兹',
    graduationTime: '2022',
    major: '黑魔法防御系',
  },
  target: '前端 & NodeJS',
  introduce: `独立使用 React/Vue 开发过各端产品，包括但不限于：Web 应用、微信小程序、Electron 桌面应用、React Native 等。\n用 Java/Kotlin(SpringBoot、MyBatis) 写过后端，现在更熟悉 Node.js(nest/egg/koa)。\n用 Java/Kotlin 和 Flutter 写过安卓。\n独立开发者：从零到一上线过多款个人产品，有网页、安卓APP、公众号应用，小程序等。`,
  projects: [
    {
      title: 'tarojs-router-next - Taro 路由库（★160+）',
      content:
        'Taro 小程序路由库/自动生成带参数类型提示的路由方法/允许传递任意类型、任意大小的参数数据/同步的路由方法调用/ koa 体验一致的路由中间件。收录在 Taro 官方推荐物料中，正在为仓鼠星球的小程序端路由提供服务，运行稳定。',
    },
    {
      title: 'open-resume - 在线简历系统',
      content:
        '纯前端在线简历编辑生成工具、支持导入导出配置、生成 PDF 和图片',
    },
  ],
  github: 'github.com/lblblong',
  workingHistory: [
    {
      title: '神奇动物管理控制司 - 前端开发工程师',
      content: `• 全球神奇动物大数据系统\n负责该项目网站及移动端开发，该项目主要使用 React + Mobx，我独立负责了该项目的神奇动物搜索和录入信息模块，在项目上线后运行良好，期间除了一些兼容性问题没有出现过任何代码逻辑上的 BUG。\n• 其他工作\n负责司内部分数据中台的开发和运维、神奇动物推广落地页的编写、其他前端工作。`,
      startTime: '2016.12',
      endTime: '2022.09',
    },
    {
      title: '预言家日报 - NodeJS',
      content: `• 《预言家日报》\n负责该项目后端的开发，众所周知该报纸的特色是动态的页面，其实现原理是通过魔法在报纸中嵌入了一个 webview。我在该项目中负责报纸客户端相关接口的开发。`,
      startTime: '2016.12',
      endTime: '2022.09',
    },
  ],
  aboutMe: `喜欢刷剧看电影、玩游戏，空余时间做做开源和一些小东西，喜欢各种提升生产效率的东西。`,
}

export type IDeveloperData = typeof DEFAULT_DATA

export const DeveloperModel = {
  defaultData: DEFAULT_DATA,
  form: DataForm,
}
