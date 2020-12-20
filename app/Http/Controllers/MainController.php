<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artist;

class MainController extends Controller
{
    //
    public function fetchData(Request $request){
        $sorts = $request->sort;
        $filters = $request->filter;

        $artist = Artist::whereRaw('1 = 1');

        foreach($filters as $filterString){
           $filter = json_decode($filterString);
           if($filter->value != 'all')
                $artist = $artist->where($filter->name,'=',$filter->value);
        }
        // $artist = $artist->where('genre','=','M');


        foreach($sorts as $sortString)
        {
           $sort = json_decode($sortString);
            if($sort->value == 1)
                $artist = $artist->orderBy($sort->name,'asc');
            if($sort->value == 2)
                $artist = $artist->orderBy($sort->name,'desc');
        }
        $artist = $artist->paginate($request->pgCnt);

        return response()->json([
            'artist'=>$artist
        ]);
    }
}
