import { message } from 'antd'
import { saveAs } from 'file-saver'
import { toBlob } from 'html-to-image'
import { makeAutoObservable } from 'mobx'
import { openExportPDFHelp } from 'src/components/popups/exportPDFHelp'
import { appStore } from 'src/stores/app'
import { templates } from 'src/templates'
import { BaseTemplate } from 'src/templates/template'

import { router } from 'src/router'

const DEFAULT_DATA = {
  name: '王娅彤',
  phoneNumber: '13676528639',
  email: 'wy_tong@126.com',
  education: {
    schoolName: '华中师范大学',
    graduationTime: '2022',
    major: '计算机科学与技术',
  },
  target: '前端工程师',
  introduce: `## 技能\n- **React.js**: 熟练掌握React.js框架，具备组件封装及项目搭建能力，能够高效实现界面还原和数据对接。\n- **Python**: 熟练使用Python进行数据处理和后端开发，具备基础的自然语言处理和深度学习应用能力。`,
  projects: [
    {
      content:
        '## 项目经历\n- **AI FOR TEACH**  \n  - 描述: 构建引导式智慧教学平台，集成多个深度学习模型，提升教学效果与用户体验。  \n  - 使用技术: Flask, React.js, Vite  \n  - 负责内容:  \n    - 模型集成：运用PNDM方法进行图像降噪，优化生成速度与结果相关性。  \n    - 数据治理：设计冗余字符定位方法，实现文言文解释模块中字词与释义的精准匹配。  \n    - 展示优化：基于Typescript和Less，实现响应式用户界面，提升用户交互体验。',
    },
  ],
  workingHistory: [
    {
      content: `- **深圳市腾讯计算机系统有限公司**  \n  - 职位: 前端开发实习生  \n  - 工作时间: 2023-04-29 至 2023-10-04  \n  - 工作内容: \n    - 根据UI设计图还原界面，使用React.js与后端接口文档对接数据，确保用户体验流畅。\n    - 从0到1完成后台管理系统，主要负责项目搭建、组件封装和逻辑书写，提升代码复用性和维护性。\n    - 梳理业务逻辑，积极与后端团队沟通协调数据库设计，优化数据存取效率。`,
    },
  ],
}

export class Store {
  template: BaseTemplate

  grayPreview = false

  exportPngAndConvertToPdf = async () => {
    try {
      message.loading({
        key: 'exportPng',
        content: '正在生成图片...',
      })

      // 获取页面的 DOM 容器
      const container = document.getElementById('template-view')!
      const options = {
        type: 'image/png',
        cacheBust: true,
        canvasHeight: container.clientHeight,
        canvasWidth: container.clientWidth,
      }

      // 生成图片 Blob
      const imageBlob = await toBlob(container, options)
      if (!imageBlob) {
        throw new Error('生成图片失败')
      }

      message.loading({
        key: 'convertToPdf',
        content: '正在将图片转换为 PDF...',
      })

      // 构建 FormData 上传图片
      const formData = new FormData()
      formData.append('file', new File([imageBlob], '简历.png', { type: 'image/png' }))

      // 调用后端接口
      const response = await fetch('http://14.103.48.72:8001/api/resumes/convert-to-pdf', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('转换为 PDF 失败，请稍后重试')
      }

      // 获取 PDF 文件 blob
      const pdfBlob = await response.blob()

      // 创建下载链接
      const downloadUrl = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = downloadUrl

      // 从 header 中提取文件名
      const contentDisposition = response.headers.get('content-disposition')
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/)
      const fileName = fileNameMatch ? fileNameMatch[1] : 'converted.pdf'

      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      message.success('PDF 转换成功，已下载')
    } catch (error: any) {
      message.error(error.message || '操作失败')
    } finally {
      message.destroy('convertToPdf')
      message.destroy('exportPng')
    }
  }
  constructor(key: string) {
    this.template = templates.find((tmp) => tmp.key === key)!
    if (!this.template) {
      throw new Error('找不到指定的模板！')
    }

    // 直接向模板导入默认数据
    const state: any = router.location?.state

    this.template.importConfig(state?.config)
    this.template.importData(DEFAULT_DATA)

    makeAutoObservable(this, {
      template: false,
    })
  }

  currentForm: 'data' | 'config' | 'template' = 'data'

  get availableTemplates() {
    return templates.filter(
      (t) => t.dataForm === this.template.dataForm && t.key !== this.template.key
    )
  }

  exportJson = () => {
    const config = this.template.exportConfig()
    const data = this.template.exportData()

    saveAs(
      new Blob(
        [
          JSON.stringify({
            templateKey: this.template.key,
            templateName: this.template.name,
            templateConfig: {
              config,
              data,
            },
          }),
        ],
        { type: 'text/plain;charset=utf-8' }
      ),
      `resume.json`
    )
  }

  exportMenuOpen = false


  exportPng = async () => {
    this.exportMenuOpen = false
    try {
      message.loading({
        key: 'exportPng',
        content: '正在导出为图片...',
      })
      const container = document.getElementById('template-view')!

      const options = {
        type: 'image/jpeg',
        cacheBust: true,
        canvasHeight: container.clientHeight,
        canvasWidth: container.clientWidth,
      }

      // 提前调用两次避免生成空白的页面
      await toBlob(container, options)
      await toBlob(container, options)

      const data = await toBlob(container, options)
      saveAs(data!, 'resume.jpeg')
      message.destroy('exportPng')
    } catch (err: any) {
      message.error(err.message)
    }
  }
}
