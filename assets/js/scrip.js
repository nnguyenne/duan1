fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        const menuMini = document.getElementById('menu-mini');
        const menuShow = document.getElementById('menu-show');
        const menuX = document.getElementById('menu-X'); // nếu có nút X

        if (menuMini && menuShow) {
            menuMini.addEventListener("click", function () {
                menuShow.classList.remove("flexNone");
                menuMini.classList.add("flexNone");
            });
            if (menuX) {
                menuX.addEventListener("click", function (e) {
                    e.stopPropagation();
                    menuShow.classList.add("flexNone");
                    menuMini.classList.remove("flexNone");
                });
            }
        }

        const currentPath = window.location.pathname;

        if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
            document.getElementById('home')?.classList.add('active');
        }
        else if (currentPath.endsWith('/category.html')) {
            document.getElementById('category')?.classList.add('active');
        }

    });

fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data)
