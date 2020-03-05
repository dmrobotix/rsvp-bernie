<?php

$errors = $_FILES['file']['error'];
if (empty($errors)) {
  // do stuff
  $fileName = $_FILES['file']['name'];
  $fileExt = explode('.',$fileName)[1];

  if (strtolower($filExt) == 'csv') {
    $fileLoc = $_FILES['file']['tmp_name'];
    // process file
    $row = 1;
    $cfN = -1;
    $clN = -1;
    $cp = -1;
    $cs = -1;
    $fNames = [];
    $lNames = [];
    $phoneNums = [];
    $status = [];
    if (($handle = fopen($fileExt . '/' . $fileName)) !== FALSE) {
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
              case 'status':
                $cs = $c;
                break;
            } // switch to find columns of interest
          } // for each column in row
        } else {
          if ($cfN == -1 || $clN == -1 || $cp == -1 || $cs == -1) {
            return json_encode(['error' => 'Unable to process file, missing some columns.']);
          } else {
            $fNames[] = $data[$cfN];
            $lNames[] = $data[$clN];
            $phoneNums[] = $data[$cp];
            $status[] = $data[$cs];
          }
        } // if first row
      } // while there is data
    } // if handle exists
  } else {
    return json_encode(['error' => 'The file is not a CSV.']);
  }
  fclose($handle);
  if (count($fNames) == 0 || count($lNames) == 0 || count($phoneNums) == 0 || count($status) == 0) {
    return json_encode(['error' => 'CSV is missing data.']);
  } else {
    return json_encode(['firstName' => $fNames, 'lastName' => $lNames, 'phone' => $phoneNums, 'status' => $status]);  
  } // check that the columns were found and array populated
} // if there are errors
print_r($_FILES);
?>
