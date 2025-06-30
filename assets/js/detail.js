const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('category');
const accountId = urlParams.get('product');
let fMain = false;

const mains = document.querySelectorAll("#main main")
mains.forEach(main => {
    if (main.id !== categoryId) {
        main.classList.add("flexNone")
    } else {
        main.classList.remove("flexNone")


        const details = main.querySelectorAll(".detail");
        let fDetail = false;
        details.forEach(detail => {
            if (detail.id !== accountId) {
                detail.classList.add("flexNone");
            } else {
                detail.classList.remove("flexNone");
                fDetail = true;



                const slider = detail.querySelector(".slider");
                const thumbnails = detail.querySelectorAll(".thumbnails img")
                const prevBtn = document.getElementById("preBtn");
                const nextBtn = document.getElementById("nextBtn");

                let currentIndex = 0;
                const total = thumbnails.length;

                function updateSlider(index) {
                    slider.style.transform = `translateX(-${index * 100}%)`;

                    thumbnails.forEach(img => img.classList.remove("active"));
                    thumbnails[index].classList.add("active")
                    currentIndex = index;

                    if (currentIndex === 0) {
                        prevBtn.classList.add("flexNone");
                    } else {
                        prevBtn.classList.remove("flexNone");
                    }

                    if (currentIndex === total - 1) {
                        nextBtn.classList.add("flexNone");
                    } else {
                        nextBtn.classList.remove("flexNone");
                    }
                }

                thumbnails.forEach((thumb, index) => {
                    thumb.addEventListener("click", () => {
                        updateSlider(index);
                    })
                })

                prevBtn.addEventListener("click", () => {
                    if (currentIndex > 0) {
                        updateSlider(currentIndex - 1);
                    }
                })

                nextBtn.addEventListener("click", () => {
                    if (currentIndex < total - 1) {
                        updateSlider(currentIndex + 1);
                    }
                })


                let touchStartX = 0;
                slider.addEventListener("touchstart", (e) => {
                    touchStartX = e.touches[0].clientX;
                })
                slider.addEventListener("touchend", (e) => {
                    const delta = e.changedTouches[0].clientX - touchStartX;
                    if (delta > 100) prevBtn.click();
                    else if (delta < -100) nextBtn.click();
                })

                let isDragging = false;
                let dragStartX = 0;
                slider.addEventListener("mousedown", e => {
                    isDragging = true;
                    dragStartX = e.clientX;
                });
                slider.addEventListener("mousemove", e => {
                    if (!isDragging) return;

                    const delta = e.clientX - dragStartX;
                    if (delta > 100) {
                        prevBtn.click();
                        isDragging = false;
                    } else if (delta < -100) {
                        nextBtn.click();
                        isDragging = false;
                    }
                });

                updateSlider(0);



            }
        });
        fMain = true;
        if (!fDetail) {
            window.location.href = "./category.html";
            alert("Không tìm thấy tài khoản")
        }
    }
})
if (!fMain) {
    alert("Danh mục không tồn tại")
    window.location.href = "./";
}