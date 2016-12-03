window.onload = function() {
    const form = document.getElementById('form');

    const sendMail = () => {
        const init = () => eventListeners();
        const event = new Event('SUBMIT_FORM');

        const eventListeners = () => {
            form.addEventListener('submit', () => {
                yaCounter41174404.reachGoal('SUBMIT_FORM');
            });
        };

        return { init };
    }

    form && sendMail().init();
};
