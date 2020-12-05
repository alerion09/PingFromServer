<?php
header("Access-Control-Allow-Origin: *");
$address = $_POST ['p_address'];
exec('ping '.$address, $output, $status);

if ($status == 0)
{
  echo json_encode($output);
}else{
  echo "ping failed";
}
?>