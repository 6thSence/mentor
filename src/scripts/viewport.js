const header = document.getElementById('header');
const titles = document.querySelectorAll('.title__wrap');

const viewport = () => {
    const init = () => eventListeners();
    const eventListeners = () => {
        window.addEventListener('scroll', _checkViewport);
    };

    const _checkViewport = (elems) => {
        for (var item = 0; item < titles.length; item++) {
            const elem = titles[item];
            const rect = elem.getBoundingClientRect();

            if (rect.top >= 0 && rect.bottom <= document.documentElement.clientHeight) {
                !elem.classList.contains('_viewport') && elem.classList.add('_viewport');
            } else {
                elem.classList.contains('_viewport') && elem.classList.remove('_viewport');
            }
        }
    }

    return { init };
}

titles && viewport().init();