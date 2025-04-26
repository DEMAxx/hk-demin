<?php
declare(strict_types=1);

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        Model::preventLazyLoading(! $this->app->isProduction());
        Model::preventAccessingMissingAttributes();
        Model::preventSilentlyDiscardingAttributes();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void {}
}
