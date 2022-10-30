import { gettext } from 'i18n'

AppSettingsPage({
  state: {
    props: {},
    bgsource: null
  },

  setSource(val) {
    this.setItem('bgsource', val)
    this.state.bgsource = val
  },

  setItem(name, value) {
    this.state.props.settingsStorage.setItem(name, value)
  },

  getItem(name) {
    this.state.props.settingsStorage.getItem(name)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('bgsource')) {
      this.state.bgsource = props.settingsStorage.getItem('bgsource')
    } else {
      this.state.bgsource = 'aaps'
    }
    console.log('bgsource: ', this.state.bgsource)
  },
  build(props) {
    this.setState(props)
    const selectSource = View(
      {
        style: {
//          fontSize: '12px',
//          lineHeight: '30px',
//          borderRadius: '30px',
//          background: '#409EFF',
//          color: 'white',
//          textAlign: 'center',
  //        padding: '0 15px',
          width: '100%',
        },
      },
      [
        Select({
          label: gettext('bgsource'),
          value: this.state.bgsource,
          options: [
            {
              name:'xDrip',
              value:'xdrip'
            },
            {
              name:'Nightscout',
              value:'nightscout'
            },
            {
              name:'Android APS',
              value:'aaps'
            }
          ],
          onChange: (val) => {
            console.log('select change:', val)
            this.setSource(val)
          },
        }),
        TextInput({
          label:'bgsource',
          value: this.state.bgsource
        })
      ],
    )
    return View(
      {
        style: {
          padding: '20px 20px 12px',
        },
      },
      [
        selectSource
      ],
    )
  }
})