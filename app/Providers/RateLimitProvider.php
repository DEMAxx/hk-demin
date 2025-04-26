<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class RateLimitProvider extends ServiceProvider
{
    final public function boot(): void
    {
//        RateLimiter::for('api',
//            static fn(Request $request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));
    }

}