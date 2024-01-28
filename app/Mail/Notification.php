<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Notification extends Mailable
{
    use Queueable, SerializesModels;

    public $title;
    public $description;
    public $deadline;
    public $assignTask;

    /**
     * Create a new message instance.
     *
     * @param string $title
     * @param string $description
     * @param string $deadline
     * @param array $assignTask
     * @return void
     */
    public function __construct($title, $description, $deadline, $assignTask)
    {
        $this->title = $title;
        $this->description = $description;
        $this->deadline = $deadline;
        $this->assignTask = $assignTask;
    }

    public function build()
    {
        return $this->subject('Task Notification Email')
                    ->view('emails.mail')
                    ->with([
                        'title' => $this->title,
                        'description' => $this->description,
                        'deadline' => $this->deadline,
                        'assignTask' => $this->assignTask,
                    ]);
    }

}
