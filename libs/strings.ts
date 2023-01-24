export function deleteWhiteSpaces(text: string){
    return text.trim().replaceAll(/\s\s+/g, ' ');
}

export function numberWithCommas(x: number) {
    if (x.toString().indexOf(".") != -1) {
      return x.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }