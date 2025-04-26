@section('title', 'Сервис интеграции СДЭК и InSales')

<!DOCTYPE html>
<html style="height: 100%;">
<head>
    @include('head')
</head>

<body style="height: 100%; display: flex;" class="text-center">
<div class="cover-container d-flex w-100 h-100 flex-column">
@include('navbar')

<main role="main" class="inner cover">
    <div class="centr">
        <img src="{{asset('/src/404.png')}}" style="margin: 0px auto;   padding: 100px 0px 60px 0px;">
    </div>

    <p style="font-size: 50px; color: #acacac; text-align:center;"> Страница не найдена</p>
    <p style="font-size: 30px; color: #acacac; text-align:center;">Код ошибки: 404</p>
</main>



@include('footer')
</div>
</body>
</html>
