import Swal from 'sweetalert2'

export const showAlert = (message, type = 'error') => {
    Swal.fire({
        icon: type,
        title: type === 'error' ? 'Lỗi' : 'Thành công',
        text: message,
        position: 'bottom-right',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            container: 'swal-container',
            popup: 'swal-popup'
        }
    });
};

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export const capitalizeFirstLetter = (string) => {
    return string
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}