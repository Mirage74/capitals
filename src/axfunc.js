function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export const getArrayRandom = (size, max) => {
    let arr = []
    while (arr.length < size) {
        let random = getRandomInt(max)
        let numExist = false
        for (let i = 0; i < arr.length; i++)
            if (arr[i] === random) {
                numExist = true
                //console.log("true !", random)
            }
        if (!numExist) {
            arr.push(random)
        }
    }
    return arr
}


export const getImageName = (num) => {
    let iso
    switch (num) {
      case 0: iso = "AFG"; break
      case 1: iso = "ALB"; break
      case 2: iso = "DZA"; break
      case 3: iso = "AND"; break
      case 4: iso = "AGO"; break
      case 5: iso = "ATG"; break
      case 6: iso = "ARG"; break
      case 7: iso = "ARM"; break
      case 8: iso = "AUS"; break
      case 9: iso = "AUT"; break
      case 10: iso = "AZE"; break
      case 11: iso = "BHS"; break
      case 12: iso = "BHR"; break
      case 13: iso = "BGD"; break
      case 14: iso = "BRB"; break
      case 15: iso = "BLR"; break
      case 16: iso = "BEL"; break
      case 17: iso = "BLZ"; break
      case 18: iso = "BEN"; break
      case 19: iso = "BTN"; break
      case 20: iso = "BOL"; break
      case 21: iso = "BIH"; break
      case 22: iso = "BWA"; break
      case 23: iso = "BRA"; break
      case 24: iso = "BRN"; break
      case 25: iso = "BGR"; break
      case 26: iso = "BFA"; break
      case 27: iso = "BDI"; break
      case 28: iso = "KHM"; break
      case 29: iso = "CMR"; break
      case 30: iso = "CAN"; break
      case 31: iso = "CPV"; break
      case 32: iso = "CAF"; break
      case 33: iso = "TCD"; break
      case 34: iso = "CHL"; break
      case 35: iso = "CHN"; break
      case 36: iso = "COL"; break
      case 37: iso = "COM"; break
      case 38: iso = "COG"; break
      case 39: iso = "CRI"; break
      case 40: iso = "CIV"; break
      case 41: iso = "HRV"; break
      case 42: iso = "CUB"; break
      case 43: iso = "CYP"; break
      case 44: iso = "CZE"; break
      case 45: iso = "COD"; break
      case 46: iso = "DNK"; break
      case 47: iso = "DJI"; break
      case 48: iso = "DMA"; break
      case 49: iso = "DOM"; break
      case 50: iso = "ECU"; break
      case 51: iso = "EGY"; break
      case 52: iso = "SLV"; break
      case 53: iso = "GNQ"; break
      case 54: iso = "ERI"; break
      case 55: iso = "EST"; break
      case 56: iso = "SWZ"; break
      case 57: iso = "ETH"; break
      case 58: iso = "FJI"; break
      case 59: iso = "FIN"; break
      case 60: iso = "FRA"; break
      case 61: iso = "GAB"; break
      case 62: iso = "GMB"; break
      case 63: iso = "GEO"; break
      case 64: iso = "DEU"; break
      case 65: iso = "GHA"; break
      case 66: iso = "GRC"; break
      case 67: iso = "GRD"; break
      case 68: iso = "GTM"; break
      case 69: iso = "GIN"; break
      case 70: iso = "GNB"; break
      case 71: iso = "GUY"; break
      case 72: iso = "HTI"; break
      case 73: iso = "HND"; break
      case 74: iso = "HUN"; break
      case 75: iso = "ISL"; break
      case 76: iso = "IND"; break
      case 77: iso = "IDN"; break
      case 78: iso = "IRN"; break
      case 79: iso = "IRQ"; break
      case 80: iso = "IRL"; break
      case 81: iso = "ISR"; break
      case 82: iso = "ITA"; break
      case 83: iso = "JAM"; break
      case 84: iso = "JPN"; break
      case 85: iso = "JOR"; break
      case 86: iso = "KAZ"; break
      case 87: iso = "KEN"; break
      case 88: iso = "KIR"; break
      case 89: iso = "KWT"; break
      case 90: iso = "KGZ"; break
      case 91: iso = "LAO"; break
      case 92: iso = "LVA"; break
      case 93: iso = "LBN"; break
      case 94: iso = "LSO"; break
      case 95: iso = "LBR"; break
      case 96: iso = "LBY"; break
      case 97: iso = "LIE"; break
      case 98: iso = "LTU"; break
      case 99: iso = "LUX"; break
      case 100: iso = "MDG"; break
      case 101: iso = "MWI"; break
      case 102: iso = "MYS"; break
      case 103: iso = "MDV"; break
      case 104: iso = "MLI"; break
      case 105: iso = "MLT"; break
      case 106: iso = "MHL"; break
      case 107: iso = "MRT"; break
      case 108: iso = "MUS"; break
      case 109: iso = "MEX"; break
      case 110: iso = "FSM"; break
      case 111: iso = "MDA"; break
      case 112: iso = "MCO"; break
      case 113: iso = "MNG"; break
      case 114: iso = "MNE"; break
      case 115: iso = "MAR"; break
      case 116: iso = "MOZ"; break
      case 117: iso = "MMR"; break
      case 118: iso = "NAM"; break
      case 119: iso = "NRU"; break
      case 120: iso = "NPL"; break
      case 121: iso = "NLD"; break
      case 122: iso = "NZL"; break
      case 123: iso = "NIC"; break
      case 124: iso = "NER"; break
      case 125: iso = "NGA"; break
      case 126: iso = "PRK"; break
      case 127: iso = "NOR"; break
      case 128: iso = "MKD"; break
      case 129: iso = "OMN"; break
      case 130: iso = "PAK"; break
      case 131: iso = "PLW"; break
      case 132: iso = "PAN"; break
      case 133: iso = "PNG"; break
      case 134: iso = "PRY"; break
      case 135: iso = "PER"; break
      case 136: iso = "PHL"; break
      case 137: iso = "POL"; break
      case 138: iso = "PRT"; break
      case 139: iso = "QAT"; break
      case 140: iso = "ROU"; break
      case 141: iso = "RUS"; break
      case 142: iso = "RWA"; break
      case 143: iso = "KNA"; break
      case 144: iso = "LCA"; break
      case 145: iso = "VCT"; break
      case 146: iso = "WSM"; break
      case 147: iso = "SMR"; break
      case 148: iso = "STP"; break
      case 149: iso = "SAU"; break
      case 150: iso = "SEN"; break
      case 151: iso = "SRB"; break
      case 152: iso = "SYC"; break
      case 153: iso = "SLE"; break
      case 154: iso = "SGP"; break
      case 155: iso = "SVK"; break
      case 156: iso = "SVN"; break
      case 157: iso = "SLB"; break
      case 158: iso = "SOM"; break
      case 159: iso = "ZAF"; break
      case 160: iso = "KOR"; break
      case 161: iso = "SSD"; break
      case 162: iso = "ESP"; break
      case 163: iso = "LKA"; break
      case 164: iso = "SDN"; break
      case 165: iso = "SUR"; break
      case 166: iso = "SWE"; break
      case 167: iso = "CHE"; break
      case 168: iso = "SYR"; break
      case 169: iso = "TJK"; break
      case 170: iso = "TZA"; break
      case 171: iso = "THA"; break
      case 172: iso = "TLS"; break
      case 173: iso = "TGO"; break
      case 174: iso = "TON"; break
      case 175: iso = "TTO"; break
      case 176: iso = "TUN"; break
      case 177: iso = "TUR"; break
      case 178: iso = "TKM"; break
      case 179: iso = "TUV"; break
      case 180: iso = "ARE"; break
      case 181: iso = "UGA"; break
      case 182: iso = "UKR"; break
      case 183: iso = "GBR"; break
      case 184: iso = "URY"; break
      case 185: iso = "USA"; break
      case 186: iso = "UZB"; break
      case 187: iso = "VUT"; break
      case 188: iso = "VEN"; break
      case 189: iso = "VNM"; break
      case 190: iso = "YEM"; break
      case 191: iso = "ZMB"; break
      case 192: iso = "ZWE"; break
      default: iso = "BLR"
    }
    return iso
  }