const form = document.getElementById('form');
const submiteButton = document.getElementById('submite-button');

const sendMail = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        submiteButton.addEventListener('click', () => form.submit());
    };

    return { init };
}

form && submiteButton && sendMail().init();