<?php

namespace App\Logging;

use Log;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

class Logging
{
    /**
     * Create a custom Monolog instance with show all request logs
     */
    public function __invoke(array $config): Logger
    {
        return new Logger('custom', [
            new StreamHandler(storage_path('logs/laravel.log')),
        ]);
    }


}