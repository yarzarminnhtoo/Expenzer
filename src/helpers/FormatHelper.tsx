const FormatHelper = {
  getCurrentDate: () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "2-digit",
      weekday: "short",
      year: "numeric",
    };
    const currentDate = new Date();
    return currentDate.toLocaleString("en-US", options);
  },
  getCustomDate: (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "long",
      day: "2-digit",
      weekday: "short",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  },
  getCustomShortDate: (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      
      month: "long",
      day: "2-digit",
      
    };
    return date.toLocaleString("en-US", options);
  },
  getCurrencyNumber: (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

export default FormatHelper;
