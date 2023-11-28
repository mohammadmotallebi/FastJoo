<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    // Add item
    public function addItem(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'brand_id' => 'required|integer',
            'type_id' => 'required|integer',
            'serial' => 'required|string',
            'model' => 'required|string',
            'description' => 'required|string',
            'images' => 'required|array'
        ]);

        try {
            $item = Item::create([
                'name' => $request->name,
                'brand_id' => $request->brand_id,
                'type_id' => $request->type_id,
                'serial' => $request->serial,
                'model' => $request->model,
                'description' => $request->description,
                'status' => 1
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

    // Get all items
    public function getItems($order = 'asc', $by = 'name'): JsonResponse
    {

        try {
            $items = Item::with(['images', 'brand', 'type'])->get();
            $items = $items->map(function ($item) {
                $item->brand_name = $item->brand->brand_name;
                $item->type_name = $item->type->type_name;

                return $item;
            });
            $items->makeHidden(['brand', 'type', 'brand_id', 'type_id']);
            // Sort items
            if($order === 'asc') {
                $items = collect($items)->sortBy($by);
            } else {
                $items = collect($items)->sortByDesc($by);
            }

            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Items fetched successfully',
                'items' => $items->values()->all(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Items could not be fetched',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Delete item by id
    public function deleteItem(Request $request): JsonResponse
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        try {
            $item = Item::find($request->id);
            $item->delete();
            // Delete all images
            ItemImage::where('item_id', $request->id)->delete();
            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Item deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Item could not be deleted',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Update item by id
    public function updateItem(Request $request): JsonResponse
    {
        $request->validate([
               'id' => 'required|integer',
            'name' => 'required|string',
            'brand_id' => 'required|integer',
            'type_id' => 'required|integer',
            'serial' => 'required|string',
            'model' => 'required|string',
            'description' => 'required|string',
            'images' => 'required|array'
        ]);

        try {
            $item = Item::find($request->id);
            $item->update([
                'name' => $request->name,
                'brand_id' => $request->brand_id,
                'type_id' => $request->type_id,
                'serial' => $request->serial,
                'model' => $request->model,
                'description' => $request->description,
                'status' => 1
            ]);
            // Delete all images
            ItemImage::where('item_id', $request->id)->delete();

            // Save Images in array as Blob
            foreach ($request->images as $image) {
                $item->images()->create([
                    'image' => $image,
                ]);
            }
            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Item updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Item could not be updated',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Get item by id
    public function getItem(Request $request): JsonResponse
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $item = Item::with('images')->find($request->id);
            return response()->json([
                'success' => true, // This is a success indicator
                'message' => 'Item fetched successfully',
                'item' => $item,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false, // This is a success indicator
                'message' => 'Item could not be fetched',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
