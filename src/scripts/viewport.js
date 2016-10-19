const titles = document.querySelectorAll('.title__wrap');

const viewport = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        window.addEventListener('scroll', _checkViewport);
    };

    const _checkViewport = (elems) => {
        console.log('scroll');
        titles.forEach(elem => {
            const rect = elem.getBoundingClientRect();

            if (rect.top >= 0 && rect.bottom <= document.documentElement.clientHeight) {
                console.log(elem);
                console.log('!elem.classList.contains(_viewport) =', !elem.classList.contains('_viewport') );
                !elem.classList.contains('_viewport') && elem.classList.add('_viewport');
            } else {
                elem.classList.contains('_viewport') && elem.classList.remove('_viewport');
            }

        })
    }
    return { init };
}

titles && viewport().init();