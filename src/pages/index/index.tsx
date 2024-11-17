import { Button } from 'antd'
import clsx from 'clsx'
import headBg from 'src/assets/image/index-head-bg.jpg'
import qrcodeWechat from 'src/assets/image/qrcode-wechat.png'
import { Icon } from 'src/components/icon'
import { TemplateCard } from 'src/components/templateCard'
import { toEditor } from 'src/pages/editor/route'
import { appStore } from 'src/stores/app'
import { templates } from 'src/templates'
import styles from './index.module.scss'

export const IndexPage = () => {
  return (
    <div className={styles.index}>
      <header>
        <img src={headBg} alt="" />
        <div className={styles.content}>

          <div className={styles.actions}>
            <Button
              type="primary"
              className={clsx(styles.action, styles.import)}
              onClick={() => {
                toEditor({ params: { key: templates[1].key } })
              }}
            >
              <Icon className={styles.icon} value="file-code-line" />
              立即开始
            </Button>
            
           
          </div>
        </div>
      </header>


    </div>
  )
}
