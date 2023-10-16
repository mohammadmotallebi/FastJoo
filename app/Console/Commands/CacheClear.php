<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CacheClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clears the cache';

    protected $hidden = true;

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        \Artisan::command('cc', function () {
            $this->call('cache:clear');
            $this->call('config:clear');
            $this->call('route:clear');
            $this->call('view:clear');
            $this->call('optimize:clear');
            $this->call('event:clear');
        })->describe('Clears the cache')->purpose('Clears the cache');
    }


}
