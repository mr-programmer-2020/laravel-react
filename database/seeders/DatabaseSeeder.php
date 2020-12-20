<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $artists = array();

        $name=array('The Kingston Trio','Led Zeppelin','Miles Davis','Muddy Waters');
        $gen = array('Folk','Rock','Jazz','Blues',);
        for($i = 0;$i < 100; $i++)
        {
            array_push($artists,(array)[
                'artistName' => $name[$i % 4],
                'musicName' => Str::random(10),//This is random string
                'duration' => rand(10,12),
                'genre' => $gen[$i % 4],
                'year' => rand(2018,2020)
            ]);
        }


        DB::table('artist')->insert($artists);
    }
}