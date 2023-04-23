import { observer } from 'mobx-react'
import styles from './SaleDataScene.module.css'
import { useEffect, useState } from 'react'
import { ISale } from '../../models/Sale'
import { HttpManager } from '../../network/HttpManager'
import { BaseText } from '../../components/base_text/BaseText'
import { Localization } from '../../text_process/Localization'
import { useParams } from 'react-router-dom'

const SaleDataScene: React.FC = () => {
  let { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [sale, setSale] = useState<ISale>(null)

  useEffect(() => {
    document.title = 'Sale Info'

    const fetchSales = async () => {
      setIsLoading(true)
      console.log(id)
      const response = await HttpManager.getInstance().getSale({
        id: Number(id),
      })
      setIsLoading(false)
      if (response.isSuccessful()) {
        setSale(response.getData())
      } else {
        // TODO: handle resquest failure
      }
    }
    fetchSales()
  }, [])

  return (
    <div className={styles['container']}>
      {isLoading ? (
        <BaseText text={Localization.translate('loading')} />
      ) : (
        <BaseText text={JSON.stringify(sale).split(',').join('\n')} />
      )}
    </div>
  )
}
export default observer(SaleDataScene)
