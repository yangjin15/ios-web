import { FC } from 'react'
import styles from './index.module.scss'
import {marked} from 'marked'

interface Props {
  content: string
}

export const Working: FC<Props> = (props) => {
  const { content } = props

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        {/* 使用 marked 将 Markdown 转换为 HTML */}
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </div>
  )
}
