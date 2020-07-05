function checkInput(location) {
    let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (urlRGEX.test(location)) {
      return
    } else {
      alert("please enter a valid name");
    }
  }
  
  export { checkInput }