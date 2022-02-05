<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(7);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone_no' => ['required', 'string', 'max:8', 'min:8'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'phone_no' => $request['phone_no'],
            'password' => Hash::make($request['password']),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function updateProfile(Request $request) {
        $user = auth('api')->user();

        $request->validate([
            'name' => 'required|String|max:191',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'phone_no' => 'sometimes|String|max:8',
            'password' => 'sometimes|String|min:8',
        ]);

        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }

        $user->update($request->all());

        return ['msg' => 'updated successfully'];
    }

    public function profile()
    {
        return auth('api')->user();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $admin = User::findOrFail($id);


        $request->validate([
            'name' => 'required|String|max:191',
            'email' => 'required|email|unique:users,email,'.$admin->id,
            'phone_no' => 'sometimes|String|max:8',
            'password' => 'sometimes|String|min:8',
        ]);
        // $validated = $request->validate([
        //     'name' => ['required', 'string', 'max:191'],
        //     'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        //     'phone_no' => ['sometimes', 'string', 'max:8', 'min:8'],
        //     'password' => ['sometimes', 'string', 'min:8'],
        // ]);

        $admin->update($request->all());

        return ['msg' => 'admin updated!'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return ['msg' => 'admin deleted'];
    }
}
