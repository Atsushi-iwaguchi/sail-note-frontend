export const weatherCodeToText = (code: number) => {
  switch (code) {
    case 0:
      return "快晴";
    case 1:
      return "晴れ";
    case 2:
      return "晴れ時々曇り";
    case 3:
      return "曇り";
    case 45:
    case 48:
      return "霧";
    case 51:
    case 53:
    case 55:
      return "霧雨";
    case 61:
    case 63:
    case 65:
      return "雨";
    case 71:
    case 73:
    case 75:
      return "雪";
    case 80:
    case 81:
    case 82:
      return "にわか雨";
    case 95:
      return "雷雨";
    default:
      return "不明";
  }
};