<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function addItem(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'brand_id' => 'required|integer',
            'type_id' => 'required|integer',
            'serial' => 'required|string',
            'model' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'images' => 'required|array'
        ]);

        try {
            $item = Item::create([
                'name' => $request->name,
                'brand_id' => $request->brand_id,
                'type_id' => $request->type_id,
                'serial' => $request->serial,
                'model' => $request->model,
                'description' => $request->description
            ]);// Save Images in array as Blob
            foreach ($request->images as $image) {
                $item->images()->create([
                    'image' => $image,
                ]);
            }
            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Item added successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Item could not be added',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getItems(): JsonResponse
    {
        try {
            $items = Item::with('images')->get();
            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Items fetched successfully',
                'items' => $items,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Items could not be fetched',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
