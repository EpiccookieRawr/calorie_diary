<?php

class nutritionix_api {
  var $app_id,
      $app_key,
      $remote_user_id,
      $api_url;

  function __construct() {
    $this->app_id = '6e98d1e1';
    $this->app_key = '7b82616788e8bf3ea2fe38aa3ff0afbb';
    $this->remote_user_id = '0';
    $this->api_url = 'https://trackapi.nutritionix.com/v2';
  }

  public function instant($keyword) {
    if($keyword == '') return false;
    $params = array(
      'query' => $keyword
    );
    $response = $this->curl_request('/search/instant', $params);

    return $this->return_response($response);
  }

  private function return_response($response) {
    if($response != false) {
      return array(
        'status' => 'success',
        'response' => $response
      );
    } else {
      return array(
        'status' => 'failure',
        'response' => 'API failure, please try again'
      );
    }
  }

  private function curl_request($request, $query_params = array(), $method = 'GET') {
    $headers = array();
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'x-app-id:' . $this->app_id;
    $headers[] = 'x-app-key:' . $this->app_key;
    $headers[] = 'x-remote-user-id:' . $this->remote_user_id;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    if($method == 'POST') {
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($query_params));
      curl_setopt($ch, CURLOPT_URL, $this->api_url . $request);
    } else if($method == 'GET') {
      curl_setopt($ch, CURLOPT_URL, $this->api_url . $request . '?' . http_build_query($query_params));
    }

    $response = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch) || $httpcode != 200) {
        // $params = array(
        //   'curl_request' => $url_request,
        //   'type' => $request_type,
        //   'request_data' => $request_data,
        // );
        //$this->error_log('request', $params, $response);
        return false;
    } else {
      $response = json_decode($response,true);
    }

    curl_close($ch);

    return $response;
  }
}

$nutritionix_api = new nutritionix_api();
$response = $nutritionix_api->instant("chicken");

echo json_encode($response);