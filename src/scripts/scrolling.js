const links = document.querySelectorAll('.header__nav-link');

const scrolling = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        links.forEach(link => link.addEventListener('click', _onClickLink));
    };


    const _onClickLink = (event) => {
        event.preventDefault();
        const id = event.target.dataset.view;
        const elem = document.getElementById(id);
        const top = elem.offsetTop;

        _scrollToElement(top, 400);
    };

    const _scrollToElement = (to, duration) => {
        if (duration <= 0) return;
        const difference = to - document.body.scrollTop;
        const perTick = difference / duration * 10;

        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop + perTick;
            if (document.body.scrollTop === to) return;
            _scrollToElement(to, duration - 10);
        }, 10);
    };

    return { init };
}

links && scrolling().init();