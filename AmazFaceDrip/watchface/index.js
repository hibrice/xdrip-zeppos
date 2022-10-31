import { writeFileSync, readFileSync } from './../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('amazdrip-page')
const { messageBuilder } = getApp()._options.globalData

const img = (function(type){
  console.log('type + '/' + path')
  return (path) => type + '/' + path
})('images')

let state = {
  bg_text: null,
  bg_tips: null,
  error_text: null,
  count:0,
  timer: null,
  data: readFileSync(),
  nextquery:0
}

function uiRefresh() {
  if (state.data) {
    state.bg_text.setProperty(hmUI.prop.TEXT, state.data.sgv + ' ' + state.data.arrow)
    state.bg_tips.setProperty(hmUI.prop.TEXT, state.data.delta + ' ' + state.data.date)
    state.error_text.setProperty(hmUI.prop.TEXT, '')
  }
}

WatchFace({
  
  bleFetch() {
    if (state.nextquery < Date.now())
    {
      if (state.nextquery)
        state.nextquery = Date.now() + 10 * 1000
      messageBuilder
        .request({
          method: 'GET_BG'
        })
        .then(data => {
          logger.log('receive data')
          const { result = {} } = data
          if (result.error == false) {
            state.data = result
            uiRefresh()
            state.nextquery = result.timestamp + 5 * 60 * 1000
            writeFileSync(state.data, false)
          }
          else {
            state.error_text.setProperty(hmUI.prop.TEXT, result.message)
            state.bg_text.setProperty(hmUI.prop.TEXT, '')
            state.bg_tips.setProperty(hmUI.prop.TEXT, '')
          }
        })
        .catch((res) => {
          state.error_text.setProperty(hmUI.prop.TEXT, res.message)
          state.bg_text.setProperty(hmUI.prop.TEXT, '')
          state.bg_tips.setProperty(hmUI.prop.TEXT, '')
        })
    }
  },

  fileFetch() {
    if (state.nextquery < Date.now())
    {
      state.data = readFileSync()
      uiRefresh()
    }
  },

  init_view() {
  
	//dynamic modify start
    const normal_background_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 480,
      h: 480,
      src: img('1.png'),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    const idle_background_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 480,
      h: 480,
      src: img('5.png'),
      show_level: hmUI.show_level.ONAL_AOD,
    });

    const fill_rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 310,
      y: 219,
      w: 96,
      h: 38,
      color: 0x000000
    });

    const analog_clock_time_pointer_hour = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_path: img('2.png'),
      hour_centerX: 240,
      hour_centerY: 240,
      hour_posX: 16,
      hour_posY: 240,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });

    const analog_clock_time_pointer_minute = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_path: img('3.png'),
      minute_centerX: 240,
      minute_centerY: 240,
      minute_posX: 16,
      minute_posY: 239,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });

    const normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_path: img('4.png'),
      second_centerX: 240,
      second_centerY: 240,
      second_posX: 16,
      second_posY: 239,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    state.bg_text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 310,
      y: 219,
      w: 96,
      h: 36,
      color: 0xffffff,
      text_size: 28,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    })

    state.bg_tips = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 300,
      y: 260,
      w: 110,
      h: 28,
      color: 0xffffff,
      text_size: 18,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    })

    state.error_text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 300,
      y: 219,
      w: 96,
      h: 36,
      color: 0xff0000,
      text_size: 28,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
      char_space:-1,
      show_level: hmUI.show_level.ONLY_NORMAL,
    })
  },
  
  onInit() {
	  console.log('index page.js on init invoke')
    this.init_view()
    uiRefresh()
  },

  build() {
  	console.log('index page.js on build invoke')
    const screenType = hmSetting.getScreenType()

    if (screenType == hmSetting.screen_type.AOD)
      state.timer = timer.createTimer(1, 1000, this.bleFetch, {})
    else {
      this.bleFetch()
      state.timer = timer.createTimer(1000, 1000, this.fileFetch, {})
    }
  },

  onDestroy() {
	  console.log('index page.js on destroy invoke')
    timer.stopTimer(state.timer);
  },
})
