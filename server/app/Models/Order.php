<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_name',
        'email',
        'phone_number',
        'status',
        'total_price',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'status' => 'string',
    ];
}
