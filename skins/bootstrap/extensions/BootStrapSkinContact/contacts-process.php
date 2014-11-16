<?php
if( isset($_POST['name']) )
{
$to = 'jm-cqj@163.com';
$subject = '来自mediawikibootstrapskin.9ong.com的信息';

if(!preg_match('/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/',$_POST['email']))
die('哎呀，邮箱地址可能不合法啦!');

$headers = 'From: ' . $_POST['email'] . "\n" . 'Reply-To: ' . $_POST['email'];

$message = 'Name: ' . $_POST['name'] . "\n" .
 'E-mail: ' . $_POST['email'] . "\n" .
 'Subject: ' . $_POST['subject'] . "\n" .
 'Message: ' . $_POST['message'];
file_put_contents("/tmp/bs.mail.log", $headers."\n".$message,FILE_APPEND);
mail($to, $subject, $message, $headers);

}
header("Location: http://mediawikibootstrapskin.9ong.com/index.php?title=Thankyou_Message");
?>
