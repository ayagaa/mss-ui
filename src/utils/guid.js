export function guidPart() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  
  export function guid(){return (
    guidPart() +
    guidPart() +
    guidPart().substr(0, 3) +
    "-" +
    guidPart() +
    "-" +
    guidPart() +
    guidPart() +
    guidPart()
  ).toLowerCase()};