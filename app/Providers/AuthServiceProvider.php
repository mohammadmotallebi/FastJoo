<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Access\Response;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        // check mysql db connection is available
        try {
                $this->registerPolicies();
                foreach (\App\Models\Ability::all() as $ability) {
                    \Gate::define($ability->ability . '-' . $ability->table_name, function (User $user) {
                        $abilities = $user->abilities();
                        return $user->hasAbility($abilities)
                            ? Response::allow()
                            : Response::deny('You must be an administrator.');
                    });
                }

        } catch (\Exception $e) {
            // do nothing
        }


        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        //
    }


}
