import React, { CSSProperties } from 'react'
import { rootStore } from '../../mobx/RootStore'

interface IRtlAwareProps extends React.HTMLAttributes<HTMLDivElement> {
  autoJustifyContent?: boolean
  reverseJustifyContent?: boolean
  autoReverseChildren?: boolean
  style?: CSSProperties
}

export class RTLAwareView extends React.Component<IRtlAwareProps> {
  public static defaultProps: IRtlAwareProps = {
    autoJustifyContent: true,
    reverseJustifyContent: false,
    autoReverseChildren: true,
    style: {},
  }
  public render(): JSX.Element {
    //@ts-ignore
    let childrenArray = React.Children.toArray(this.props.children)
    let startDirection = this.props.reverseJustifyContent ? 'flex-end' : 'flex-start' // (ltr) default: flex-start
    if (rootStore.getUIStore().getLanguage() === 'fa') {
      if (this.props.autoJustifyContent) {
        startDirection = this.props.reverseJustifyContent ? 'flex-start' : 'flex-end'
      }
      if (this.props.autoReverseChildren) {
        childrenArray = childrenArray.reverse()
      }
    }
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: startDirection,
      ...this.props.style,
    }
    return <div style={style}>{childrenArray}</div>
  }
}
