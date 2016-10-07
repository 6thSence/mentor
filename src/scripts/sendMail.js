const form = document.getElementById('form');
const submiteButton = document.getElementById('submite-button');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const sendMail = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        submiteButton.addEventListener('click', () => _onClickButton());
        nameInput.addEventListener('keydown', _validate);
        nameInput.addEventListener('change', _validate);
        emailInput.addEventListener('keydown', _validate);
        emailInput.addEventListener('change', _validate);
    };

    const _validName = () => {
        nameInput.value.length !== 0 ? nameInput.classList.remove('_error') : nameInput.classList.add('_error');
        return nameInput.value.length !== 0;
    };

    const _validEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(emailInput.value) ? emailInput.classList.remove('_error') : emailInput.classList.add('_error');
        return re.test(emailInput.value);
    };

    const _blockButton = () => {
        submiteButton.classList.add('_blocked');
        submiteButton.setAttribute('disabled', false);
    };

    const _unblockButton = () => {
        submiteButton.classList.remove('_blocked');
        submiteButton.removeAttribute('disabled');
    };

    const _validate = () => {
        const isValidName = _validName();
        const isValidEmail = _validEmail();
        isValidName && isValidEmail ? _unblockButton() : _blockButton();
        return isValidName && isValidEmail;
    };

    const _onClickButton = () => {
        const host = window.location.host;

        if (_validate()) {
            fetch(`/sendMail?name=${nameInput.value}&email=${emailInput.email}`)
                .then(respons => _success())
                .catch(err => _fail());
        }
    };

    const _success = () => {
        document.getElementById('success').classList.add('_show');
        _blockButton()
    };

    const _fail = () => {
        document.getElementById('fail').classList.add('_show');
        _blockButton()
    };

    return { init };
}

form && submiteButton && sendMail().init();