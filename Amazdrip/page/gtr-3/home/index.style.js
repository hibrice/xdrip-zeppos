import { gettext as getText } from 'i18n'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo()

export const TITLE_TEXT_STYLE = {
  text: getText('bloodGlucose'),
  x: px(42),
  y: px(65),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0xffffff,
  text_size: 36,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}

export const SGV_TEXT_STYLE = {
  text: getText('noData'),
  x: px(15),
  y: px(200),
  w: DEVICE_WIDTH - px(15 * 2),
  h: DEVICE_HEIGHT - px(200),
  color: 0xffffff,
  text_size: 60,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  text_style: hmUI.text_style.WRAP,
}

export const TIME_TEXT_STYLE = {
  text: '',
  x: px(15),
  y: px(120),
  w: DEVICE_WIDTH - px(15 * 2),
  h: DEVICE_HEIGHT - px(120),
  color: 0x999999,
  text_size: 32,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
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