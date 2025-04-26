<?php
declare(strict_types=1);

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Facades\Route;
use Prometheus\Exception\StorageException;
use Flugg\Responder\Exceptions\Http\HttpException as FluggHttpException;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))->withRouting(
    using: static function () {
        if (config('app.actuator_only')) {
            return;
        }

        Route::middleware('web')->name('web.')->group(
            base_path('routes/web.php'),
        );

        Route::middleware('api')->name('api.')->prefix('api')->group(
            base_path('routes/api.php'),
        );
    },
    commands: app_path('Console'),
)->withMiddleware(
    function (Middleware $middleware) {

        $middleware->trustProxies(
            at: [
                '10.0.0.0/8',
                '172.16.0.0/12',
                '192.168.0.0/16',
            ],
        )->group('admin', [SubstituteBindings::class])->redirectTo(
            static fn() => null,
            static fn() => null,
        );
    },
)->withExceptions(function (Exceptions $e) {
    $e->dontReportDuplicates()
        ->render(
            static fn(FluggHttpException $exceptions, Request $request) =>
            response()->error($exceptions->getStatusCode(), $exceptions->getMessage())
            ->data($exceptions->data())
            ->respond($exceptions->statusCode(), $exceptions->getHeaders())
        )
        ->render(static fn(NotFoundHttpException $exceptions, Request $request) =>
            response()->view('errors.404', [], 404)
        )
        ->render(static fn(MethodNotAllowedHttpException $exceptions, Request $request) =>
            response()->json(['success' => false, 'errors' => [$exceptions->getMessage()]], 405)
        )
        ->render(function(\Exception $exceptions, Request $request) {
            if (str_contains($request->url(), '/api/')) {
                logs()->error(
                    $exceptions->getMessage(),
                    [
                        'meta' => ['request' => request()?->all()]
                    ]
                );

                return response()->json(['success' => false, 'errors' => [$exceptions->getMessage()]], 500);
            }
        })->render(static fn(QueryException $exceptions) =>
            response()->json(['success' => false, 'errors' => ['Database connection error']], 503)
        )->render(static fn(RedisException $exceptions) =>
            response()->json(['success' => false, 'errors' => ['Redis connection error']], 503)
        );

    $e->report(function(StorageException $exceptions){
        logs()->critical($exceptions->getMessage());
    });

    $e->report(function(\UnexpectedValueException $exceptions){
        logs()->error($exceptions->getMessage());
    });
})->create();