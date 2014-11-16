<?php
if( isset($_POST['name']) )
{
$to = 'jm-cqj@163.com';
$subject = $_POST['subject'];
$subject = "=?UTF-8?B?".base64_encode($subject)."?=";//中文主题处理

if(!preg_match('/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/',$_POST['email']))
die('哎呀，邮箱地址可能不合法啦!');

/**
 * 中文header处理
 */
$headers = 'MIME-Version: 1.0' . "\r\n";  
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: ' . $_POST['email'] . "\r\n" . 'Reply-To: ' . $_POST['email'];

$message = 'Name: ' . $_POST['name'] . "<br />" .
 'E-mail: ' . $_POST['email'] . "<br />" .
 'Subject: ' . $_POST['subject'] . "<br />" .
 'Message: ' . $_POST['message']."<br />";

mail($to, $subject, $message, $headers);

}
header("Location: http://mediawikibootstrapskin.9ong.com/index.php?title=Thankyou_Message");
?>
