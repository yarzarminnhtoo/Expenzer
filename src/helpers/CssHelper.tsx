function OwnClass(isSmallScreen:boolean) {
 
  return isSmallScreen
    ? "d-flex align-items-center justify-content-start"
    : "d-flex align-items-center justify-content-end";
}

export { OwnClass };
