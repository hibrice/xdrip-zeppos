import { gettext as getText } from 'i18n'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo()

export const TITLE_TEXT_STYLE = {
  text: getText('bloodGlucose'),
  x: px(42),
  y: px(40),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(46),
  color: 0xffffff,
  text_size: 36,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
}

export const SGV_TEXT_STYLE = {
  text: getText('noData'),
  x: px(15),
  y: px(88),
  w: DEVICE_WIDTH - px(15 * 2),
  h: 50,
  color: 0xffffff,
  text_size: 40,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  text_style: hmUI.text_style.WRAP,
}

export const TIME_TEXT_STYLE = {
  text: '',
  x: px(15),
  y: px(144),
  w: DEVICE_WIDTH - px(15 * 2),
  h: 42,
  color: 0x999999,
  text_size: 32,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.top,
  text_style: hmUI.text_style.WRAP,
}

export const GRAPH_STYLE = {
  x: 90,
  y: 200,
  h: 200,
  w: 300,
  item_width: 5,
  item_space: 5,
  item_radius: 0,
  item_color: 0xF20000,
  item_start_y:0,
  data_min_value: 50,
  data_max_value: 250,  
  /*xline: {
          pading: 0,
          space: 5,
          start: 0,
          end: 200,
          color: 0x00c853,
          width: 1,
          count: 300
  },*/
  yline: {
    pading: 52,
    space: 49,
    start: 0,
    end: 300,
    color: 0x999999,
    width: 1,
    count: 4
  },
  yText: {
    x: 0,
    y: 22,
    w: 50,
    h: 50,
    space: 0,
    align: hmUI.align.RIGHT,
    color: 0x999999,
    count: 4,
    data_array: [200, 150, 100, 50]
  }
}

export const ERROR_TEXT_STYLE = {
  text: getText('noData'),
  x: px(15),
  y: px(80),
  w: DEVICE_WIDTH - px(15 * 2),
  h: DEVICE_HEIGHT - px(80),
  color: 0xff0000,
  text_size: 40,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
}

export const SCROLL_LIST = {
  item_height: px(80),
  item_space: px(6),
  item_config: [
    {
      type_id: 1,
      item_bg_color: 0x333333,
      item_bg_radius: px(10),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(80),
          key: 'name',
          color: 0xffff00,
          text_size: px(36),
          align_h: hmUI.align.LEFT,
        },
      ],
      text_view_count: 1,
      item_height: px(80),
    },
    {
      type_id: 2,
      item_bg_color: 0x333333,
      item_bg_radius: px(10),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(80),
          key: 'name',
          color: 0xff0000,
          text_size: px(36),
          align_h: hmUI.align.LEFT,
        },
      ],
      text_view_count: 1,
      item_height: px(80),
    },
  ],
  item_config_count: 2,
  x: px(30),
  y: px(120),
  h: DEVICE_HEIGHT - px(180),
  w: DEVICE_WIDTH - px(30) * 2,
}