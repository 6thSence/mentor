const header = document.getElementById('header');

const headerMove = () => {
    const init = () => eventListeners();
    const eventListeners = () => window.onscroll = _scrollingWindow;

    let oldPosition;
    const _scrollingWindow = () => {
        const position = window.pageYOffset || document.documentElement.scrollTop;

        position < 2 ? header.classList.remove('_move') : header.classList.add('_move');

        header.classList.contains('_move') && position > oldPosition
            ? header.classList.add('_hiden')
            : header.classList.remove('_hiden');

        oldPosition = position;
    }

    return { init };
}

header && headerMove().init();