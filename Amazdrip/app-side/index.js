import { gettext } from 'i18n'
import { MessageBuilder } from '../shared/message'
const messageBuilder = new MessageBuilder()

let nsenable = settings.settingsStorage.getItem('ns:enable');
let nsurl = settings.settingsStorage.getItem('ns:url');
let nssecret = settings.settingsStorage.getItem('ns:secret');

function timestamp2Date(timestamp)
{
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

function text2Arrow(text)
{
  switch (text)
  {
    case 'FortyFiveUp':
      return '↗';
    case 'FortyFiveDown':
        return '↘';
    case 'Flat':
      return '→';
    case 'SingleDown':
      return '↓';
    case 'DoubleDown':
      return '↓↓';
    case 'SingleUp':
      return '↑';
    case 'DoubleUp':
        return '↑↑';
    default:
      return text;
  }
}

const fetchDataNS = async (ctx) => {

  await fetch({
      url: nsurl+'/api/v1/entries/sgv.json?count=24', 
      method: 'GET',
      headers: {
        'api-secret': nssecret
      },
    })
    .then((response) => {
      if (!response.body)
        throw Error('No Data')
      if (response.body == '[]')
        throw Error('No Data')

      return JSON.parse(response.body)
    })
    .then((data) => {
      let sgvs = [];
      let times = [];
      let timestamp = [];
      data.forEach((item, index) => {
        sgvs.unshift(item.sgv)
        times.unshift(timestamp2Date(item.date))
        timestamp.unshift(item.date)
      });

      ctx.response({
        data: { 
          result: {
            date: timestamp2Date(data[0].date), 
            timestamp: data[0].date,
            device: data[0].device, 
            delta: Math.round(data[0].delta),
            sgv: data[0].sgv,
            sgvs: sgvs,
            times: times,
            direction: data[0].direction, 
            arrow: text2Arrow(data[0].direction),
            unit: data[0].units_hint, 
            error:false
          }
        }
      })
    })
    .catch(function(error) {
      ctx.response({
        data: { result: {error: true, message: error.message} }
      })
    })

}

const fetchDataSGV = async (ctx) => {

  await fetch({url: 'http://127.0.0.1:17580/sgv.json', method: 'GET'})
    .then((response) => {
      if (!response.body)
        throw Error('No Data')
      if (response.body == '[]')
        throw Error('No Data')

      return JSON.parse(response.body)
    })
    .then((data) => {
      let sgvs = [];
      let times = [];
      let timestamp = [];
      data.forEach((item, index) => {
        sgvs.unshift(item.sgv)
        times.unshift(timestamp2Date(item.date))
        timestamp.unshift(item.date)
      });

      ctx.response({
        data: { 
          result: {
            date: timestamp2Date(data[0].date), 
            timestamp: data[0].date,
            device: data[0].device, 
            delta: data[0].delta,
            sgv: data[0].sgv,
            sgvs: sgvs,
            times: times,
            direction: data[0].direction, 
            arrow: text2Arrow(data[0].direction),
            unit: data[0].units_hint, 
            error:false
          }
        }
      })
    })
    .catch(function(error) {
      ctx.response({
        data: { result: {error: true, message: error.message} }
      })
    })

}

const fetchDataPebble = async (ctx) => {

  await fetch({url: 'http://127.0.0.1:17580/pebble.json', method: 'GET'})
    .then((response) => {
      if (!response.body)
        throw Error('No Data')

      return response.body
    })
    .then((data) => {
      ctx.response({
        data: { 
          result: {
            date: timestamp2Date(data.bgs[0].datetime), 
            timestamp: data.bgs[0].datetime,
            delta: data.bgs[0].bgdelta,
            sgv: data.bgs[0].sgv,
            direction: data.bgs[0].direction, 
            arrow: text2Arrow(data.bgs[0].direction), 
            error:false
          }
        }
      })
    })
    .catch(function(error) {
      ctx.response({
        data: { result: {error: true, message: error.message} }
      })
    })

}


AppSideService({
  onInit() {
    
    messageBuilder.listen(() => {})
    settings.settingsStorage.addListener(
      'change',
      ({ key, newValue, oldValue }) => {
        nsenable = settings.settingsStorage.getItem('ns:enable');
        nsurl = settings.settingsStorage.getItem('ns:url');
        nssecret = settings.settingsStorage.getItem('ns:secret');
      },
    )
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      if (payload.method === 'GET_DATA') {
        if (nsenable == 'true')
          return fetchDataNS(ctx);
        else
          return fetchDataSGV(ctx);
      }
      if (payload.method === 'GET_BG') {
        if (nsenable == 'true')
          return fetchDataNS(ctx);
        else
          return fetchDataPebble(ctx);
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
