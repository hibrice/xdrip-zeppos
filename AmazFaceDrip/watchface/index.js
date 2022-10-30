import { readFileSync, writeFileSync } from './../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('amazdrip-page')
const { messageBuilder } = getApp()._options.globalData

let normal_bg_text = null
let normal_bg_tips = null
let timerobj = null
let bgdata = readFileSync();

const img = (function(type){
  console.log('type + '/' + path')
  return (path) => type + '/' + path
})('images')

function getBG() {
  messageBuilder
    .request({
      method: 'GET_BG'
    })
    .then(data => {
      logger.log('receive data')
      const { result = {} } = data
      if (result.error == false) {
        bgdata = result;
        normal_bg_text.setProperty(hmUI.prop.TEXT, result.sgv + ' ' + result.arrow)
        normal_bg_tips.setProperty(hmUI.prop.TEXT, result.delta + ' ' + result.date)
      }
    })
    .catch((res) => {
    })
}

WatchFace({

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

    const normal_analog_clock_time_pointer_hour = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_path: img('2.png'),
      hour_centerX: 240,
      hour_centerY: 240,
      hour_posX: 16,
      hour_posY: 240,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });

    const normal_analog_clock_time_pointer_minute = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
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

    normal_bg_text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 310,
      y: 219,
      w: 96,
      h: 36,
      color: 0xffffff,
      text_size: 28,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: ""
    })

    normal_bg_tips = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 300,
      y: 260,
      w: 110,
      h: 28,
      color: 0xffffff,
      text_size: 18,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: ""
    })
  },
  
  onInit() {
	  console.log('index page.js on init invoke')
	
	  this.init_view()
    getBG()
  },

  build() {
  	console.log('index page.js on build invoke')
    timerobj = timer.createTimer(500, 60000, getBG, {});
  },

  onDestroy() {
	  console.log('index page.js on destroy invoke')
    timer.stopTimer(timerobj);
    writeFileSync(bgdata, false)
  },
})
