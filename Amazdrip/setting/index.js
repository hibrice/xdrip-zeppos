import { gettext } from 'i18n'

AppSettingsPage({
  build(props) {
    let nsenable = false;
    if (props.settingsStorage.getItem('ns:enable') == "true")
      nsenable = true;
    const nsurl = props.settingsStorage.getItem('ns:url');
    const nssecret = props.settingsStorage.getItem('ns:secret');
    const selectSource = View(
      {
        style: {
          width: '100%',
        },
      },
      [
        Text({
          style: {
            padding: '0 0 10px',
          },
          bold: true,
          paragraph: true
        }, [gettext('settings:about')]),
        Text({
          style: {
            padding: '0 0 10px',
          },
          bold: true,
          paragraph: true
        }, [gettext('settings:xdrip:setup')]),
        Text({
          style: {
            padding: '0 0 15px',
          },
          bold: true,
          paragraph: true
        }, [gettext('settings:ns:setup')]),
        Toggle({
          label: gettext('nightscout:enable'),
          value: nsenable,
          settingsKey:'ns:enable',
        }),
        TextInput({
          label:gettext('nightscout:url'),
          placeholder: gettext('nightscout:url:about'),
          value: nsurl,
          settingsKey:'ns:url',
        }),
        TextInput({
          label:gettext('nightscout:token'),
          value: nssecret,
          labelStyle: {
            padding: '10px 0 0',
          },
          settingsKey:'ns:secret',
        }),
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