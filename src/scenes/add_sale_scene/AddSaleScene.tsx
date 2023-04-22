import styles from './AddSaleScene.module.css'
import { observer } from 'mobx-react'
import React from 'react'
import { EditText } from '../../components/edit_text/EditText'
import { Localization } from '../../text_process/Localization'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { BaseText } from '../../components/base_text/BaseText'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'
import { NormalButton } from '../../components/normal_button/NormalButton'

const AddSaleScene: React.FC = () => {
  let titleEditTextRef: EditText = null
  let phoneNumberEditTextRef: EditText = null
  let addressEditTextRef: EditText = null
  let descriptionEditTextRef: EditText = null

  const onAddSaleClick = () => {}

  return (
    <div className={styles['container']}>
      <BaseText
        style={addSaleSceneStyles.pageTitle}
        text={Localization.translate('AddSaleScenePageTitle')}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
      <div>
        <RTLAwareView style={addSaleSceneStyles.editTextTitleContainer}>
          <BaseText
            style={addSaleSceneStyles.editTextTitle}
            text={Localization.translate('AddSaleSceneTitle')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className={styles['edittext']}>
          <EditText
            ref={(ref) => (titleEditTextRef = ref)}
            className="input"
            type="text"
            maxLength={72}
            required={true}
            placeholder={Localization.translate('AddSaleSceneTitlePlaceholder')}
          />
        </div>
      </div>

      <div style={GlobalStyles.verticalSpacerLarge} />

      <div>
        <RTLAwareView style={addSaleSceneStyles.editTextTitleContainer}>
          <BaseText
            style={addSaleSceneStyles.editTextTitle}
            text={Localization.translate('AddSaleScenePhoneNumber')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className={styles['edittext']}>
          <EditText
            ref={(ref) => (phoneNumberEditTextRef = ref)}
            className="input"
            type="text"
            maxLength={72}
            required={true}
            placeholder={Localization.translate('AddSaleScenePhoneNumberPlaceholder')}
          />
        </div>
      </div>

      <div style={GlobalStyles.verticalSpacerLarge} />

      <div>
        <RTLAwareView style={addSaleSceneStyles.editTextTitleContainer}>
          <BaseText
            style={addSaleSceneStyles.editTextTitle}
            text={Localization.translate('AddSaleSceneAddress')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className={styles['edittext']}>
          <EditText
            ref={(ref) => (addressEditTextRef = ref)}
            className="input"
            type="text"
            maxLength={72}
            required={true}
            placeholder={Localization.translate('AddSaleSceneAddressPlaceholder')}
          />
        </div>
      </div>

      <div style={GlobalStyles.verticalSpacerLarge} />

      <div>
        <RTLAwareView style={addSaleSceneStyles.editTextTitleContainer}>
          <BaseText
            style={addSaleSceneStyles.editTextTitle}
            text={Localization.translate('AddSaleSceneDescription')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className={styles['edittext']}>
          <EditText
            ref={(ref) => (descriptionEditTextRef = ref)}
            className="input"
            type="text"
            maxLength={72}
            required={true}
            placeholder={Localization.translate('AddSaleSceneDescriptionPlaceholder')}
          />
        </div>
      </div>
      <NormalButton
        text={Localization.translate('AddSaleSceneAddSaleConfirm')}
        onClick={onAddSaleClick}
      />
    </div>
  )
}

const addSaleSceneStyles = {
  pageTitle: {
    fontSize: FontSizes.h1,
    fontWeight: 'bold',
  },
  editTextTitle: {
    fontSize: FontSizes.p,
    fontWeight: 'bold',
  },
  editTextTitleContainer: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  inputError: {
    color: 'red',
    fontSize: FontSizes.p,
  },
}

export default observer(AddSaleScene)
