<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test localhost</title>
    <link rel="stylesheet" href="style/main.css">
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li class="navigation-item"><a href="#">Home</a></li>
                <li class="navigation-item"><a href="#">About</a></li>
                <li class="navigation-item"><a href="#">Contacts</a></li>
                <li class="navigation-item"><a href="#">Friends</a></li>
                <li class="navigation-item"><a href="#">Address</a></li>
            </ul>
        </nav>
    </header>
    <!-- <h1>Hello, motherfucker!</h1> -->
    <section class="photo-container">
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/6sBuOANeMjU.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description">Landscape</p>
            </a>
        </article>
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/EjWOHzzY4DM.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description">Occaecati quam corrupti aut culpa error qui aut est aut. Incidunt
                    laudantium quo quae iure debitis. Ut beatae quidem ullam minus odit rerum. Similique sunt nemo est
                    qui at sit.</p>
            </a>
        </article>
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/e7prXQft-KQ.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description" data-description="Full description">Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Optio sed ipsam ipsum voluptas vel minima possimus itaque, maiores repellat?</p>
            </a>
        </article>
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/6sBuOANeMjU.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description">Landscape</p>
            </a>
        </article>
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/EjWOHzzY4DM.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description">Landscape</p>
            </a>
        </article>
        <article class="photo">
            <a href="#">
                <img class="photo-img" src="img/e7prXQft-KQ.jpg" alt="pic">
                <h2 class="photo-title">Photo1</h2>
                <p class="photo-description" data-description="Full description">Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Optio sed ipsam ipsum voluptas vel minima possimus itaque, maiores repellat?</p>
            </a>
        </article>
        </section>

        <div class="photo-modal hidden">
            
            <div class="modal-container">
                <img class="modal-close" src="img/close.png" />
                <div class="modal-content" href="#">
                    <img class="photo-img" src="img/EjWOHzzY4DM.jpg" alt="pic">
                    <h2 class="photo-title">Photo1</h2>
                    <p class="photo-description">Landscape</p>
                </div>
            </div>
        </div>
        <script src="js/lib.js"></script>
        <script src="js/main.js"></script>
</body>

</html>