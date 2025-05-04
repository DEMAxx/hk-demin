@section('title', 'Сервис интеграции СДЭК и InSales')

        <!DOCTYPE html>
<html>
<head>
    @include('head')
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

            <div class="poverh">
                <h2>СЕРВИС<br />ИНТЕГРАЦИИ</h2>
                <br />
                <a href="{{ route('web.about') }}" class="yellow-but btn">Узнать больше</a>
            </div>
        </div>
    </div>

    <div style="text-align: center;margin-top: 20px">
        <h4>Текущий span: {{ request()->input('span-id') }}</h4>
        <h4>Отладка: <?php if (config('app.debug')): ?>Включена<?php else: ?>Выключена<?php endif; ?></h4>
        <div>
            {{
                html()->form('DELETE')->route('internal.debug.reset')->children([
                    html()->hidden('trace-id', request()->input('trace-id')),
                    html()->submit('Сбросить span')->class('buttn btn'),
                ])
            }}
        </div>
        <div style="margin-top: 10px">
            @if(!config('app.debug') || (config('app.debug') && request()->cookie('DEBUG')))
                {{
                    html()->form('PATCH')->route('internal.debug.toggle')->children([
                        html()->hidden('trace-id', request()->input('trace-id')),
                        html()->submit('Переключить отладку')->class('buttn btn'),
                    ])
                }}
            @endif
        </div>
    </div>
</body>
