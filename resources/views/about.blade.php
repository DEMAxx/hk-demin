@section('title', 'Описание сервиса')

<!DOCTYPE html>
<html>
<head>
    @include('head')
    <link rel="stylesheet" href="{{asset('/css/ekko-lightbox.css')}}" />
    <script src="{{asset('/js/ekko-lightbox.min.js')}}"></script>
</head>


<body>
@include('navbar')

<div class="blu_bck">
    <div class="image_block">
        <picture>
            <source type="image/webp" srcset="{{asset('/src/back.webp')}}">
            <source type="image/jpeg" srcset="{{asset('/src/back.jpg')}}">
            <img src="{{asset('/src/back.jpg')}}" alt="">
        </picture>
        <div class="poverh otstup">
            <h2>ХК<br/>Демин</h2>
        </div>
    </div>
</div>

<div style="background: #fff;">
    <div class="detail">
        <div>
            <p class="acc-style">Содержание:</p>
            <ul class="green-dot">
                <li><a href="#features">Возможности команды</a></li>
            </ul>
        </div>
    </div>
</div>

<div style="background: #ededed;">
    <div class="detail">
        <div>
            <p class="acc-style" style="line-height: 1.2;"><a id="features"></a>Какие возможности</br>открывает команда:</p>
            <ul class="green-dot">
                <li><span>Играет;</span></li>
            </ul>
        </div>
        <div>
            <a href="src/2d_my.jpg" data-toggle="lightbox"><img class="shadow img-fluid" src="src/2d_my.jpg"></a>
        </div>
    </div>

    <div class="detail">
        <div>
            <p>Для победы нужно тренироваться.</p>
        </div>
        <div>
            <a href="src/13d_my.jpg" data-toggle="lightbox"><img class="shadow img-fluid" src="src/13d_my.jpg"></a>
        </div>
    </div>
</div>

@include('footer')

<script type="text/javascript">
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
</script>
</body>
</html>
