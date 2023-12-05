//this method converts the date from timestamp to datatime
const getDateTime = (datetimestamp) => {
  let result;
  if (datetimestamp != '') {
    let timestamp = new Date(datetimestamp);
    // we get the date 
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();

    // we get the time
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();

    // we get the am or pm
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // we set a custom format date
    const customDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    const customHour = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    //console.log(customDate+' '+customHour);
    result= customDate + ' ' + customHour + ' ' + ampm
  }else{
    result='dd/mm/yyyy 00:00:00'
  }

  return result;
}

//this method remove the name domain (in this case 'http://localhost:3000' ) to return a substring
const removeDomain = (urlName) => {
  const domain = 'http://localhost:3000';
  const image = urlName.substring(domain.length + 1, urlName.length)
  return image;
}

export {
  getDateTime,
  removeDomain
}