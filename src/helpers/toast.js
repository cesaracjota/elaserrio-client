import AWN from 'awesome-notifications';
import 'awesome-notifications/dist/style.css';
import successImage from '../assets/icons/check.png';
import errorImage from '../assets/icons/warning.png';
import infoImage from '../assets/icons/info.png';
import questionImage from '../assets/icons/question.png';

const notifier = new AWN();

export const CustomToast = ({ title, message, type, duration, position }) => {
    const options = {
        labels: {
            tip: title,
            success: title,
            error: title,
            info: title,
            warning: title,
        },
        durations: {
            global: duration
        },
        icons: {
            enabled: true,
            prefix: '<img width="50px" heght="50px" src="',
            success: successImage,
            suffix: '" alt="edurec"/>',
            tip: questionImage,
            info: infoImage,
            warning: questionImage,
            alert: errorImage,
            confirm: successImage,
        },
        position: position,
        dismissible: true,
        theme: 'bootstrap',
        autoHide: true,
        autoHideDelay: 5000,
        clickToClose: true,
        maxNotifications: 5,
        maxStack: 5,
        animation: {
            in: 'bounceInRight',
            out: 'bounceOutRight',
        },

        pauseOnHover: true,
        showProgressBar: true,
        showCloseButton: true,
        rtl: true,
    }

    switch (type) {
        case 'default':
            notifier.info(message, options);
            break;
        case 'success':
            notifier.success(message, options);
            break;
        case 'warning':
            notifier.warning(message, options);
            break;
        case 'error':
            notifier.alert(message, options);
            break;
        default:
            notifier.info(message, options);
    }

    return notifier;
};
