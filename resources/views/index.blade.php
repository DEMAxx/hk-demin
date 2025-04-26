@section('title', 'ХК Демин')

        <!DOCTYPE html>
<html>
<head>
    @include('head')
</head>


<body>
    @include('navbar')

    <div class="blu_bck">
        <div class="image_block">
            <div class="poverh">
                <h2>ХК<br />Демин</h2>
                <br />
                <a href="{{ route('web.about') }}" class="yellow-but btn">Узнать больше</a>
            </div>
        </div>
    </div>

    <div class="footer1">
        <div class="centr">
            <p class="foot-style">О ХК Демин</p>
            <a href="{{ route('web.about') }}" class="yellow-but btn">Узнать больше</a>
        </div>
    </div>

    @include('footer')

</body>
</html>
