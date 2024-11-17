import { Button } from 'antd'
import clsx from 'clsx'
import { useObserver } from 'mobx-react-lite'
import { Icon } from 'src/components/icon'
import { toIndex } from 'src/pages/index/route'
import { useStore } from 'src/shared/storeProvider'
import styles from './index.module.scss'
import { Store } from '../store'

export const Header = () => {
  const store = useStore<Store>()

  return useObserver(() => (
    <header className={styles.index}>
      <div className={styles.right}>
        {/* 导出为图片并转换为 PDF */}
        <Button onClick={store.exportPngAndConvertToPdf} type="primary" className={clsx(styles.item, styles.export)}>
          <Icon className={styles.icon} value="download-2-line" />
          导出为 PDF
        </Button>
      </div>
    </header>
  ))
}
