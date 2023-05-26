export const PrintPlayerInMap = (player, map) => {
  var newMap = map.map(arr => arr.slice());
  for (let y = 0; y < player.bloco.bloco.length; y++)
    for (let x = 0; x < player.bloco.bloco.length; x++)
      if (player.bloco.bloco[y][x] === 1) {
        const pixelY = player.pos[0] + y;
        const pixelX = player.pos[1] + x;
        newMap[pixelY][pixelX] = { fill: 1, color: player.bloco.color };
      }
  return newMap;
};

export const minifyNumber = (num: number): number | string => {
    if (num < 1000) return num
    const newNum = num.toString()
    return newNum.substring(0, newNum.length - 3) + 'K'
}

export const minifyAddress = (address: string, rate?: number): string => {
    if (address == null) return ''
    if (address.length <= 5) return address
    return (
        address.substring(0, rate || 6) +
        '...' +
        address.substring(address.length - (rate || 3), address.length)
    )
}

export const minifyString = (str: string, len: number): string => {
    if (str == null) return ''
    if (str.length <= len) return str
    return str.substring(0, len || 10) + '...'
}

export const getNftDetails = async (mintAddress: string) => {
    try {
        const details = await fetch(
            `https://api.all.art/v1/solana/${mintAddress}`,
            {
                mode: 'cors',
                credentials: 'omit',
            }
        )
        const data = await details.json()
        return data
    } catch (err) {
        return false
    }
}

export const extractError = (err: any) => {
    let message = 'Something went wrong on the server'
    try {
        message = err.response.data.message
    } catch {}
    return message
}

export const checkBrowser = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator ? navigator.userAgent : ''
    )
}

// Set empty string if param is undefined
export const setValue = (str) => {
    if (str == undefined || str == null) {
        str = ''
    }
    return str
}

// Equal arrays ignoring order.
export function eqArraySets(a, b) {
    if (a.length !== b.length) {
        return false
    }
    for (var i = a.length; i--; ) {
        if (!(b.indexOf(a[i]) > -1)) {
            return false
        }
        if (!(a.indexOf(b[i]) > -1)) {
            return false
        }
    }
    return true
}

// format time
export function time_ago(time) {
    switch (typeof time) {
        case 'number':
            break
        case 'string':
            time = +new Date(time)
            break
        case 'object':
            if (time.constructor === Date) time = time.getTime()
            break
        default:
            time = +new Date()
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ]
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds)
        token = 'from now'
        list_choice = 2
    }
    var i = 0,
        format
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == 'string') return format[list_choice]
            else
                return (
                    Math.floor(seconds / format[2]) +
                    ' ' +
                    format[1] +
                    ' ' +
                    token
                )
        }
    return time
}

// Change time format with AM and PM.
export function formatAMPM(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
}
