import { TITLE_TEXT_STYLE, SGV_TEXT_STYLE, TIME_TEXT_STYLE, ERROR_TEXT_STYLE } from './index.style'
import { readFileSync, writeFileSync } from './../../../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('amazdrip-page')
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    title: null,
    tipText: null,
    bgText: null,
    data: readFileSync(),
  },
  onInit() {
    logger.debug('page onInit invoked')
    //this.onMessage()
    this.getBG()
  },
  build() {
    logger.debug('page build invoked')
    if (hmSetting.getDeviceInfo().screenShape !== 0) {
      this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_TEXT_STYLE
      })
    }

    this.displayBG()
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    writeFileSync(this.state.data, false)
  },
  onMessage() {
    messageBuilder.on('call', ({ payload: buf }) => {
      //this.state.data = messageBuilder.buf2Json(buf)
      this.refreshAndUpdate(buf)
    })
  },
  getBG() {
    messageBuilder
      .request({
        method: 'GET_DATA'
      })
      .then(data => {
        logger.log('receive data')
        const { result = {} } = data
        this.state.data = result;
        if (result.error == true)
          this.displayError(result)
        else
          this.displayBG()
      })
      .catch((res) => {
        this.displayError({message: 'No Connexion'})
      })
  },
  changeUI(data) {
    let ytext = [];
    for (var i = 50; i <= 250; i += 50) {
      ytext.unshift(i);
    }


    const view = hmUI.createWidget(hmUI.widget.HISTOGRAM, {
      x: 100,
      y: 120,
      h: 300,
      w: 300,
      item_width: 10,
      item_space: 10,
      item_radius: 10,
      item_start_y: 50,
      item_max_height: 250,
      item_color: 0x304ffe,
      data_array: data.sgvs,
      data_count: data.sgvs.length,
      data_min_value: 50,
      data_max_value: 250,
/*      xline: {
        pading: 20,
        space: 20,
        start: 0,
        end: 300,
        color: 0x00c853,
        width: 1,
        count: 15
      },
      yline: {
        pading: 10,
        space: 10,
        start: 0,
        end: 300,
        color: 0xff6d00,
        width: 1,
        count: 30
      },*/
      yText: {
        x: 0,
        y: 20,
        w: 50,
        h: 50,
        space: 10,
        align: hmUI.align.LEFT,
        color: 0xFFFFFF,
        count: ytext.length,
        data_array: ytext
      }
    })


    if (this.state.bgText) {
      this.state.bgText.setProperty(hmUI.prop.TEXT, data.sgv + ' ' + data.arrow);
    }
    else {
      this.state.bgText = hmUI.createWidget(hmUI.widget.TEXT, {
        ...SGV_TEXT_STYLE,
        text: data.sgv + ' ' + data.arrow
      });
    }
    if (this.state.tipText) {
      //this.state.tipText.setProperty(hmUI.prop.TEXT, '∆ ' + data.delta + ' ' + data.date);
      this.state.tipText.setProperty(JSON.stringify(data.times));
    }
    else {
      this.state.tipText = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TIME_TEXT_STYLE,
        text: '∆ ' + data.delta + ' ' + data.date
      });
    }
  },
  displayBG() {
    if (this.state.data)
      this.changeUI(this.state.data)
  },
  displayError(data) {
    hmUI.createWidget(hmUI.widget.TEXT, {
      ...ERROR_TEXT_STYLE,
      text: data.message
    });
  },
  refreshAndUpdate(data) {
    this.displayBG()
  }
})
