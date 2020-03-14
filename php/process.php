<?php

$errors = $_FILES['file']['error'];
if (empty($errors)) {
  // do stuff
  $fileName = strtolower($_FILES['file']['name']);
  $fileLoc = $_FILES['file']['tmp_name'];
  $fileSplit = explode('.',$fileName);
  $fileExt = array_search('csv',$fileSplit);
  $dir = "/home/margotbi/www/rsvp-bernie/docs/";

  if ($fileSplit[$fileExt] == 'csv') {
    if(!move_uploaded_file($fileLoc, $dir.$fileName)) {
      // TODO: create a group to add php/www and chmod back to 644 or something like that
      http_response_code(400);
      echo json_encode(array('error' => 'File upload failed.'));
      exit();
    }

    // process file
    $row = 1;
    $cfN = -1;
    $clN = -1;
    $cp = -1;
    $ce = -1;
    $cs = -1;
    $fNames = [];
    $lNames = [];
    $phoneNums = [];
    $emails = [];
    $rsvp = [];
    if (($handle = fopen($dir.$fileName,'r')) !== FALSE) {
      while(($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if ($row == 1) {
          $num = count($data);
          for ($c=0; $c < $num; $c++) {
            switch($data[$c]) {
              case 'first name':
                $cfN = $c;
                break;
              case 'last name':
                $clN = $c;
                break;
              case 'phone':
                $cp = $c;
                break;
              case 'email':
                $ce = $c;
                break;
              case 'status':
                $cs = $c;
                break;
            } // switch to find columns of interest
          } // for each column in row
          $row = $row + 1;
        } else {
          if ($cfN == -1 || $clN == -1 || $cp == -1 || $ce == -1 || $cs == -1) {
            http_response_code(400);
            echo json_encode(array('error' => 'Unable to process file, missing some columns.'));
            exit();
          } else {
            $fNames[] = $data[$cfN];
            $lNames[] = $data[$clN];
            $phoneNums[] = $data[$cp];
            $emails[] = $data[$ce];
            $rsvp[] = $data[$cs];
          }
        } // if first row
      } // while there is data
    } else {
      // doesn't exist for some reason
      http_response_code(400);
      echo json_encode(array('error' => 'Problem finding file on server.'));
      exit();
      //echo json_encode(array('error' => 'Unable to process file, missing some columns.'));
    } // if handle exists
  } else {
    http_response_code(400);
    echo json_encode(array('error' => 'The file is not a CSV.'));
    exit();
  }
  fclose($handle);
  unlink($dir.$fileName);
  if (count($fNames) == 0 || count($lNames) == 0 || count($phoneNums) == 0 || count($emails) == 0 || count($rsvp) == 0) {
    http_response_code(400);
    echo json_encode(array('error' => 'CSV is missing data.'));
    exit();
  } else {
    http_response_code(200);
    echo json_encode(array('firstName' => $fNames, 'lastName' => $lNames, 'phone' => $phoneNums, 'email' => $emails, 'rsvp' => $rsvp));
    exit();
  } // check that the columns were found and array populated
} // if there are errors
?>
