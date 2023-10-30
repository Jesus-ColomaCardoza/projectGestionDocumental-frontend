
const alertMessage = (title,message,icon,textButton,colorButton) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonColor: colorButton,
        confirmButtonText: textButton
    })
}

export {
    alertMessage,
}