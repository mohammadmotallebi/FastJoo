<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function images(): HasMany
    {
        return $this->hasMany(ItemImage::class);
    }

    public function brand(): HasOne
    {
        return $this->hasOne(Brand::class, 'id', 'brand_id');
    }

    public function type(): HasOne
    {
        return $this->hasOne(Type::class, 'id', 'type_id');
    }
}
