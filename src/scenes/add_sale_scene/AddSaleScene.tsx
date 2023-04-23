import styles from './AddSaleScene.module.css'
import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
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

const AddSaleScene: React.FC = () => {
  const [map, setMap] = useState<Map>(null)
  const [position, setPosition] = useState({ lat: 35.7, lng: 51.3 })

  let markerRef = useRef(null)

  let titleEditTextRef: EditText = null
  let phoneNumberEditTextRef: EditText = null
  let addressEditTextRef: EditText = null
  let descriptionEditTextRef: EditText = null

  const onAddSaleClick = () => {}

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

  useEffect(() => {
    console.log(position)
  }, [position])

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
            // draggable={true}
            position={position}
            ref={markerRef}
          >
            <Popup>{Localization.translate('AddSaleSceneYouAreHere')}</Popup>
          </Marker>
        )}
        {/* <CenterMarker /> */}
      </MapContainer>
      <SafeTouch onClick={onAutoLocationClick}>
        <BaseText
          style={addSaleSceneStyles.autoLocation}
          text={Localization.translate('AddSaleSceneAutoLocation')}
        />
      </SafeTouch>
      <div style={GlobalStyles.verticalSpacerLarge} />
      <NormalButton
        text={Localization.translate('AddSaleSceneAddSaleConfirm')}
        onClick={onAddSaleClick}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
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
  locationGuide: {
    fontSize: FontSizes.p,
  },
  autoLocation: {
    fontSize: FontSizes.extraSmall,
    textDecoration: 'underline',
  },
}

export default observer(AddSaleScene)
