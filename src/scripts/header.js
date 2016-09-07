const header = document.getElementById('header');

const headerMove = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        window.onscroll = _scrollingWindow;
        window.onclick = _clickOutSide;
    }

    let oldPosition;
    const _scrollingWindow = () => {
        const position = window.pageYOffset || document.documentElement.scrollTop;

        position < 2 ? header.classList.remove('_move') : header.classList.add('_move');

        header.classList.contains('_move') && position > oldPosition
            ? header.classList.add('_hiden')
            : header.classList.remove('_hiden');

        oldPosition = position;
    };

    const _clickOutSide = (event) => {
        const isChild = event.target.closest('#header');
        const isHeader = event.target.classList.contains('header');

        if (!isChild && !isHeader) { header.classList.add('_hiden') };
    };

    return { init };
}

header && headerMove().init();