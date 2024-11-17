import { Alert, Button, Space } from 'antd'
import { useController } from 'oh-popup-react'
import { popupManager } from 'src/shared/popupManager'
import image1 from './images/1.png'
import image2 from './images/2.png'
import image3 from './images/3.png'
import styles from './index.module.scss'

const ExportPDFHelp = () => {
  const ctl = useController()
  return (
    <div className={styles.index}>
      <header>导出 PDF 帮助</header>
      <main>
        <div className={styles.content}>
          <p>
            <Alert message="建议使用 Edge 浏览器进行导出" />
          </p>
          
        </div>
      </main>
      <footer>
        <Space>
          <Button
            onClick={() => {
              setFlag()
              ctl.close()
            }}
          >
            不再显示
          </Button>
          <Button type="primary" onClick={() => ctl.close()}>
            知道了
          </Button>
        </Space>
      </footer>
    </div>
  )
}

function setFlag() {
  localStorage.setItem('openExportPDFHelp', 'true')
}

function getFlag() {
  return localStorage.getItem('openExportPDFHelp')
}

export function openExportPDFHelp() {
  if (getFlag()) return
  return popupManager.open({
    el: <ExportPDFHelp />,
    position: 'center',
    maskClosable: false,
  })
}
