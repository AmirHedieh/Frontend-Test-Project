import styles from './AddSaleScene.module.css'
import { observer } from 'mobx-react'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { EditText } from '../../components/edit_text/EditText'
import { Localization } from '../../text_process/Localization'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { BaseText } from '../../components/base_text/BaseText'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './Leaflet.css'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Map } from 'leaflet'
import { CommonValidator } from '../../utils/Validator'
import { HttpManager } from '../../network/HttpManager'
import { ILocation, StylesType } from '../../Types'
import { title } from 'process'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/loading/Loading'
import { GlobalState } from '../../utils/GlobalState'

const AddSaleScene: React.FC = () => {
  console.log(GlobalState.getInstance().getUser())

  const [map, setMap] = useState<Map>(null)
  const [position, setPosition] = useState<ILocation>({ lat: 35.7, lng: 51.3 })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('')

  let markerRef = useRef(null)
  let navigate = useNavigate()

  let titleEditTextRef: EditText = null
  let phoneNumberEditTextRef: EditText = null
  let addressEditTextRef: EditText = null
  let descriptionEditTextRef: EditText = null

  const onConfirmClick = (): void => {
    if (validateInputData()) {
      addSale()
    }
  }

  const addSale = async (): Promise<void> => {
    const response = await HttpManager.getInstance().addSale({
      title: titleEditTextRef.getStandardText(),
      phoneNumber: phoneNumberEditTextRef.getStandardText(),
      address: addressEditTextRef.getStandardText(),
      description: descriptionEditTextRef.getStandardText(),
      location: position,
      userId: GlobalState.getInstance().getUser().id,
    })

    setIsLoading(false)
    if (response.isSuccessful()) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        navigate('/sales', { replace: true })
      }, 1000)
    } else {
      setRequestErrorMessage(response.getData())
    }
  }

  const validateInputData = (): boolean => {
    let isValid: boolean = true
    if (CommonValidator.isNullOrEmpty(titleEditTextRef.getStandardText())) {
      setTitleErrorMessage(Localization.translate('invalid'))
      isValid = false
    } else {
      setTitleErrorMessage('')
    }

    if (
      CommonValidator.isNullOrEmpty(phoneNumberEditTextRef.getStandardText()) ||
      !CommonValidator.isPhoneNumber(phoneNumberEditTextRef.getStandardText())
    ) {
      setPhoneNumberErrorMessage(Localization.translate('invalid'))
      isValid = false
    } else {
      setPhoneNumberErrorMessage('')
    }

    if (CommonValidator.isNullOrEmpty(addressEditTextRef.getStandardText())) {
      setAddressErrorMessage(Localization.translate('invalid'))
      isValid = false
    } else {
      setAddressErrorMessage('')
    }

    if (CommonValidator.isNullOrEmpty(descriptionEditTextRef.getStandardText())) {
      setDescriptionErrorMessage(Localization.translate('invalid'))
      isValid = false
    } else {
      setDescriptionErrorMessage('')
    }
    return isValid
  }

  useEffect(() => {
    if (map && markerRef.current) {
      map.on('move', () => {
        const center = map.getCenter()
        markerRef.current.setLatLng(center)
      })
      map.on('dragend', () => {
        const center = map.getCenter()
        setPosition({ lat: center.lat, lng: center.lng })
      })
    }
  }, [map])

  const onAutoLocationClick = () => {
    if (navigator.geolocation) {
      map.locate().on('locationfound', function (e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      })
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div className={styles['container']}>
      {isLoading && <Loading />}
      {isVisible && <div style={addSaleSceneStyles.addSaleNotification}>Sale created successfully!</div>}
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
        {titleErrorMessage && (
          <RTLAwareView style={addSaleSceneStyles.errorBox}>
            <div style={GlobalStyles.spacer} />
            <BaseText
              style={addSaleSceneStyles.inputError}
              text={titleErrorMessage}
            />
          </RTLAwareView>
        )}
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
        {phoneNumberErrorMessage && (
          <RTLAwareView style={addSaleSceneStyles.errorBox}>
            <div style={GlobalStyles.spacer} />
            <BaseText
              style={addSaleSceneStyles.inputError}
              text={phoneNumberErrorMessage}
            />
          </RTLAwareView>
        )}
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
        {addressErrorMessage && (
          <RTLAwareView style={addSaleSceneStyles.errorBox}>
            <div style={GlobalStyles.spacer} />
            <BaseText
              style={addSaleSceneStyles.inputError}
              text={addressErrorMessage}
            />
          </RTLAwareView>
        )}
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
        {descriptionErrorMessage && (
          <RTLAwareView style={addSaleSceneStyles.errorBox}>
            <div style={GlobalStyles.spacer} />
            <BaseText
              style={addSaleSceneStyles.inputError}
              text={descriptionErrorMessage}
            />
          </RTLAwareView>
        )}
      </div>
      <div style={GlobalStyles.verticalSpacerLarge} />
      <div style={GlobalStyles.verticalSpacerLarge} />
      <BaseText
        style={addSaleSceneStyles.locationGuide}
        text={Localization.translate('AddSaleScenePickLocationGuide')}
      />
      <div style={GlobalStyles.verticalSpacerMedium} />
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker
            position={position}
            ref={markerRef}
          >
            <Popup>{Localization.translate('AddSaleSceneYouAreHere')}</Popup>
          </Marker>
        )}
      </MapContainer>
      <SafeTouch onClick={onAutoLocationClick}>
        <BaseText
          style={addSaleSceneStyles.autoLocation}
          text={Localization.translate('AddSaleSceneAutoLocation')}
        />
      </SafeTouch>
      <div style={GlobalStyles.verticalSpacerLarge} />
      {requestErrorMessage && (
        <BaseText
          style={addSaleSceneStyles.inputError}
          text={requestErrorMessage}
        />
      )}
      <NormalButton
        text={Localization.translate('AddSaleSceneAddSaleConfirm')}
        onClick={onConfirmClick}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
    </div>
  )
}

const addSaleSceneStyles: StylesType = {
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
  errorBox: {
    paddingTop: '8px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  inputError: {
    color: 'red',
    fontSize: FontSizes.p,
    fontWeight: 'bold',
  },
  locationGuide: {
    fontSize: FontSizes.p,
  },
  autoLocation: {
    fontSize: FontSizes.extraSmall,
    textDecoration: 'underline',
  },
  addSaleNotification: {
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
  },
}

export default observer(AddSaleScene)
