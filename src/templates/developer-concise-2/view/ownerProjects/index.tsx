import { useObserver } from 'mobx-react-lite'
import { useTemplate } from 'src/templates'
import { DeveloperConcise2Template } from '../..'
import styles from './index.module.scss'
import {marked }from 'marked'

export const OwnerProjects = () => {
  const { data, config } = useTemplate<DeveloperConcise2Template>()

  return useObserver(() => (
    <div className={styles.index}>
      {data.projects.map((it, i) => {
        return (
          <div key={i} className={styles.item}>
            {/* 使用 marked 将 Markdown 转换为 HTML */}
            <div
              className={styles.des}
              dangerouslySetInnerHTML={{ __html: marked(it.content) }}
            ></div>
          </div>
        )
      })}
    </div>
  ))
}
