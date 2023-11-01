//this method converts the date from timestamp to datatime
const getDateTime = (datetimestamp) => {
    let timestamp = new Date(datetimestamp);
    // we get the date 
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; 
    const day = timestamp.getDate();

    // we get the time
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();

    // we set a custom format date
    const customDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    const customHour = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    //console.log(customDate+' '+customHour);
    return customDate+' '+customHour 
  }

export{
    getDateTime
}