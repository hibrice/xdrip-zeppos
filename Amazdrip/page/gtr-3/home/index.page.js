import { TITLE_TEXT_STYLE, SGV_TEXT_STYLE, TIME_TEXT_STYLE, ERROR_TEXT_STYLE, GRAPH_STYLE } from './index.style'
import { readFileSync, writeFileSync } from './../../../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('amazdrip-page')
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    title: null,
    tipText: null,
    bgText: null,
    graph: null,
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
        this.displayError({message: res.message})
      })
  },
  changeUI(data) {
    let sgvslen = data.sgvs.length;

    if (this.state.graph) {
        this.state.graph.setProperty(hmUI.prop.data_array, data.sgvs);
        this.state.graph.setProperty(hmUI.prop.data_count, sgvslen);
    }
    else {
      this.state.graph = hmUI.createWidget(hmUI.widget.HISTOGRAM, {
        ...GRAPH_STYLE,
        data_array: data.sgvs,
        data_count: sgvslen,
      });
    }

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
      this.state.tipText.setProperty(hmUI.prop.TEXT, data.delta + ' - ' + data.date);
    }
    else {
      this.state.tipText = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TIME_TEXT_STYLE,
        text: data.delta + ' - ' + data.date
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
