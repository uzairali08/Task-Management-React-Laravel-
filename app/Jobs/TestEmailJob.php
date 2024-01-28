<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TestEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $title;
    public $description;
    public $deadline;
    public $assignTask;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($title, $description, $deadline, $assignTask)
    {
        //
        $this->title = $title;
        $this->description = $description;
        $this->deadline = $deadline;
        $this->assignTask = $assignTask;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $email = new Notification($this->title, $this->description, $this->deadline, $this->assignTask);
        Mail::to($this->assignTask)->send($email);
    }
}
